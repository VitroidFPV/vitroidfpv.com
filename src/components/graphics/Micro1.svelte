<script lang="ts">
	import VitroidFPVQR from "$components/graphics/VitroidFPVQR.svelte"
	import { formatElapsedTime } from "$lib/format-elapsed-time"
	import { onMount } from "svelte"
	import {
		GitCommitHorizontal,
		Hash,
		Code,
		Star,
		ClockFading,
		MessageSquareText,
		Gauge,
		Flame
	} from "@lucide/svelte"

	interface RepositoryStats {
		commitCount: number
		createdYear: number
		latestCommit: {
			absoluteDate: string
			committedAt: string
			message: string
			relativeDate: string
			sha: string
		}
		latestYear: number
		name: string
		stars: number
	}

	interface Props {
		stats: RepositoryStats | null
	}

	let { stats }: Props = $props()
	let currentTime = $state<number | null>(null)

	let relativeDate = $derived.by(() => {
		if (!stats) return "—"
		if (currentTime === null) return stats.latestCommit.relativeDate

		return formatElapsedTime(stats.latestCommit.committedAt, currentTime)
	})

	onMount(() => {
		const updateCurrentTime = () => {
			currentTime = Date.now()
		}

		updateCurrentTime()
		const interval = window.setInterval(updateCurrentTime, 1000)

		return () => window.clearInterval(interval)
	})
</script>

<div
	class="pointer-events-none absolute top-0 left-0 grid w-fit grid-cols-[auto_1fr] items-stretch gap-2 p-2 font-geist-mono text-primary-500 md:pt-12 md:pl-12"
>
	<div class="relative hidden aspect-square h-full md:block">
		<VitroidFPVQR class="absolute inset-0 size-full" />
	</div>
	<div class="text flex flex-col justify-between gap-1 text-xs font-medium">
		<div
			class="-my-1 flex justify-between font-semibold uppercase md:gap-4 md:text-lg"
		>
			<span>vitroidfpv.com</span>
			<span>-</span>
			<span>
				{stats
					? `${stats.createdYear}-${stats.latestYear}`
					: "GitHub unavailable"}
			</span>
		</div>
		<div class="h-px w-full bg-primary-500"></div>
		<div class="flex flex-col">
			<div class="flex justify-between text-xs">
				<div class="flex items-center gap-1">
					<GitCommitHorizontal class="size-4" />
					<Hash class="size-4" />
					{stats?.commitCount.toLocaleString("en-US") ?? "—"}
				</div>
				<div class="flex items-center gap-1">
					<GitCommitHorizontal class="size-4" />
					<Code class="size-4" />
					{stats?.latestCommit.sha ?? "—"}
				</div>
				<div class="flex items-center gap-1">
					<GitCommitHorizontal class="size-4" />
					<Star class="size-4" />
					{stats?.stars.toLocaleString("en-US") ?? "—"}
				</div>
			</div>
			<div
				class="flex items-center justify-between gap-1 whitespace-nowrap uppercase"
			>
				<div class="flex items-center gap-1">
					<GitCommitHorizontal class="size-4" />
					<MessageSquareText class="size-4" />
				</div>
				<span class="max-w-80 truncate">
					{stats?.latestCommit.message ?? "Repository data could not be loaded"}
				</span>
			</div>
			<div
				class="flex items-center justify-between gap-1 whitespace-nowrap uppercase"
			>
				<div class="flex items-center gap-1">
					<GitCommitHorizontal class="size-4" />
					<ClockFading class="size-4" />
					{relativeDate}
				</div>
				{stats ? `(${stats.latestCommit.absoluteDate})` : ""}
			</div>
		</div>
		<div class="h-px w-full bg-primary-500"></div>
		<div class="flex justify-between text-xs uppercase">
			<div class="flex items-center gap-1">
				<Gauge class="size-4" />
				Fly Fast
			</div>
			<div class="flex items-center gap-1">
				<Flame class="size-4" />
				Crash Hard
			</div>
		</div>
	</div>
</div>
