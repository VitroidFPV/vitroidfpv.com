import type { SiteSearchOptions } from "./engine"
import type { SearchHit } from "./types"

type SearchApi = typeof import("./index")

export type SearchStatus = "idle" | "loading" | "ready" | "error"

type SearchControllerOptions = {
	minimumQueryLength?: number
	debounceMs?: number
	searchOptions?: SiteSearchOptions
	clearResultsWhileLoading?: boolean
	onBeforeSearch?: (query: string) => void
	onReset?: (query: string) => void
	onResults?: (results: SearchHit[]) => void
}

export class SearchController {
	query = $state("")
	results = $state.raw<SearchHit[]>([])
	status = $state<SearchStatus>("idle")

	readonly minimumQueryLength: number

	private readonly debounceMs: number
	private readonly options: SearchControllerOptions
	private timer: ReturnType<typeof setTimeout> | undefined
	private requestId = 0
	private searchApi: SearchApi | null = null
	private searchApiPromise: Promise<SearchApi> | null = null

	constructor(options: SearchControllerOptions = {}) {
		this.options = options
		this.minimumQueryLength = options.minimumQueryLength ?? 2
		this.debounceMs = options.debounceMs ?? 120
	}

	get normalizedQuery(): string {
		return this.query.trim()
	}

	async prepare(): Promise<void> {
		if (this.searchApi) return

		try {
			this.searchApiPromise ??= import("./index")
			this.searchApi = await this.searchApiPromise
			this.searchApi.prepareSiteSearch()
		} catch {
			this.status = "error"
		}
	}

	queue(value: string, delay = this.debounceMs): void {
		this.query = value
		clearTimeout(this.timer)
		this.requestId += 1

		if (value.trim().length < this.minimumQueryLength) {
			this.results = []
			this.status = "idle"
			this.options.onReset?.(value)
			return
		}

		if (this.options.clearResultsWhileLoading) this.results = []
		this.status = "loading"
		this.timer = setTimeout(() => {
			this.options.onBeforeSearch?.(value)
			void this.run(value)
		}, delay)
	}

	reset(): void {
		this.queue("")
	}

	destroy(): void {
		clearTimeout(this.timer)
		this.requestId += 1
	}

	private async run(value: string): Promise<void> {
		const trimmedValue = value.trim()
		if (trimmedValue.length < this.minimumQueryLength) return

		const currentRequest = ++this.requestId
		this.status = "loading"

		try {
			await this.prepare()
			if (!this.searchApi || currentRequest !== this.requestId) return

			const results = this.searchApi.searchSite(
				trimmedValue,
				this.options.searchOptions
			)
			if (currentRequest !== this.requestId) return

			this.results = results
			this.options.onResults?.(results)
			this.status = "ready"
		} catch {
			if (currentRequest === this.requestId) {
				this.results = []
				this.status = "error"
			}
		}
	}
}
