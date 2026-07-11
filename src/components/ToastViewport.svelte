<script lang="ts">
	import { Toast } from "@skeletonlabs/skeleton-svelte"
	import type { Props as ToastProps } from "@zag-js/toast"
	import { CheckCircle2, CircleAlert, Info, X } from "@lucide/svelte"
	import { restoreToasts, toaster } from "$lib/toaster"
	import { onMount } from "svelte"

	type ToastItem = ToastProps & { index: number }

	onMount(() => {
		const frame = requestAnimationFrame(restoreToasts)
		return () => cancelAnimationFrame(frame)
	})
</script>

<Toast.Group
	{toaster}
	class="z-60 flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3 outline-none"
>
	{#snippet children(toast: ToastItem)}
		<Toast
			{toast}
			class="flex items-start gap-3 rounded-xl border border-surface-500/20 bg-surface-50-950 p-4 text-surface-950-50! shadow-xl transition data-[state=closed]:opacity-0 data-[type=error]:border-error-500/50 data-[type=success]:border-success-500/50 data-[type=warning]:border-warning-500/50"
		>
			{#if toast.type === "success"}
				<CheckCircle2 class="mt-0.5 size-5 shrink-0 text-success-500" />
			{:else if toast.type === "error"}
				<CircleAlert class="mt-0.5 size-5 shrink-0 text-error-500" />
			{:else if toast.type === "warning"}
				<CircleAlert class="mt-0.5 size-5 shrink-0 text-warning-500" />
			{:else}
				<Info class="mt-0.5 size-5 shrink-0 text-primary-500" />
			{/if}

			<Toast.Message class="min-w-0 flex-1 text-sm">
				{#if toast.title}
					<Toast.Title class="font-medium">{toast.title}</Toast.Title>
				{/if}
				{#if toast.description}
					<Toast.Description class="mt-1 text-surface-500">
						{toast.description}
					</Toast.Description>
				{/if}
			</Toast.Message>

			<Toast.CloseTrigger
				class="-m-1 shrink-0 rounded p-1 text-surface-500 transition-colors hover:bg-surface-500/10 hover:text-current"
				aria-label="Dismiss notification"
			>
				<X class="size-4" />
			</Toast.CloseTrigger>
		</Toast>
	{/snippet}
</Toast.Group>
