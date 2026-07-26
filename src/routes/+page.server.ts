import type { PageServerLoad } from "./$types"

const repositoryApiUrl =
	"https://api.github.com/repos/VitroidFPV/vitroidfpv.com"
const commitsApiUrl = `${repositoryApiUrl}/commits?sha=next&per_page=1`
const cacheDuration = 15 * 60 * 1000
const dateFormatter = new Intl.DateTimeFormat("en-GB", {
	day: "2-digit",
	hour: "2-digit",
	hour12: false,
	minute: "2-digit",
	month: "2-digit",
	timeZone: "Europe/Prague",
	timeZoneName: "short",
	year: "numeric"
})

interface GitHubRepository {
	created_at: string
	full_name: string
	html_url: string
	stargazers_count: number
}

interface GitHubCommit {
	commit: {
		author: {
			date: string
		} | null
		committer: {
			date: string
		} | null
		message: string
	}
	html_url: string
	sha: string
}

interface RepositoryStats {
	commitCount: number
	createdYear: number
	latestCommit: {
		committedAt: string
		message: string
		sha: string
	}
	name: string
	stars: number
}

let cachedStats:
	| {
			expiresAt: number
			value: RepositoryStats
	  }
	| undefined
let pendingStats: Promise<RepositoryStats> | undefined

function getCommitCount(linkHeader: string | null, fallback: number) {
	if (!linkHeader) return fallback

	for (const link of linkHeader.split(",")) {
		if (!link.includes('rel="last"')) continue

		const url = link.match(/<([^>]+)>/)?.[1]
		const page = url ? Number(new URL(url).searchParams.get("page")) : NaN

		if (Number.isInteger(page) && page > 0) return page
	}

	return fallback
}

function formatRelativeDate(value: string) {
	const elapsedSeconds = Math.max(
		0,
		Math.floor((Date.now() - new Date(value).getTime()) / 1000)
	)

	if (elapsedSeconds < 60) return `${elapsedSeconds}s ago`
	if (elapsedSeconds < 3600) return `${Math.floor(elapsedSeconds / 60)}m ago`
	if (elapsedSeconds < 86400) return `${Math.floor(elapsedSeconds / 3600)}h ago`
	return `${Math.floor(elapsedSeconds / 86400)}d ago`
}

function formatAbsoluteDate(value: string) {
	const parts = Object.fromEntries(
		dateFormatter
			.formatToParts(new Date(value))
			.map(({ type, value: partValue }) => [type, partValue])
	)

	return `${parts.hour}:${parts.minute} ${parts.day}.${parts.month}.${parts.year} ${parts.timeZoneName}`
}

function formatStats(stats: RepositoryStats) {
	return {
		...stats,
		latestCommit: {
			...stats.latestCommit,
			absoluteDate: formatAbsoluteDate(stats.latestCommit.committedAt),
			relativeDate: formatRelativeDate(stats.latestCommit.committedAt)
		},
		latestYear: new Date(stats.latestCommit.committedAt).getUTCFullYear()
	}
}

async function fetchRepositoryStats(
	fetch: Parameters<PageServerLoad>[0]["fetch"]
): Promise<RepositoryStats> {
	const headers = {
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28"
	}
	const [repositoryResponse, commitsResponse] = await Promise.all([
		fetch(repositoryApiUrl, { headers }),
		fetch(commitsApiUrl, { headers })
	])

	if (!repositoryResponse.ok || !commitsResponse.ok) {
		throw new Error(
			`GitHub API returned ${repositoryResponse.status}/${commitsResponse.status}`
		)
	}

	const repository = (await repositoryResponse.json()) as GitHubRepository
	const commits = (await commitsResponse.json()) as GitHubCommit[]
	const latestCommit = commits[0]
	const committedAt =
		latestCommit?.commit.committer?.date ?? latestCommit?.commit.author?.date

	if (!latestCommit) throw new Error("The next branch has no commits")
	if (!committedAt) throw new Error("The latest commit has no date")

	return {
		commitCount: getCommitCount(
			commitsResponse.headers.get("link"),
			commits.length
		),
		createdYear: new Date(repository.created_at).getUTCFullYear(),
		latestCommit: {
			committedAt,
			message: latestCommit.commit.message.split(/\r?\n/, 1)[0],
			sha: latestCommit.sha.slice(0, 7)
		},
		name: repository.full_name,
		stars: repository.stargazers_count
	}
}

async function getRepositoryStats(
	fetch: Parameters<PageServerLoad>[0]["fetch"]
): Promise<RepositoryStats> {
	if (cachedStats && cachedStats.expiresAt > Date.now()) {
		return cachedStats.value
	}

	if (!pendingStats) {
		pendingStats = fetchRepositoryStats(fetch)
			.then((value) => {
				cachedStats = {
					expiresAt: Date.now() + cacheDuration,
					value
				}
				return value
			})
			.finally(() => {
				pendingStats = undefined
			})
	}

	return pendingStats
}

export const load: PageServerLoad = async ({ fetch }) => {
	try {
		return { repositoryStats: formatStats(await getRepositoryStats(fetch)) }
	} catch {
		return {
			repositoryStats: cachedStats ? formatStats(cachedStats.value) : null
		}
	}
}
