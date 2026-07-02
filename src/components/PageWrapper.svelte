<script lang="ts">
	import swirl from "$lib/assets/swirl-bg.svg"
	import type { Snippet } from "svelte"
	let { h1, h2, description, children, ghostTitleClass = " md:text-[24rem] text-[12rem]"}: { h1?: string, h2?: string, description?: Snippet, children?: Snippet, ghostTitleClass?: string } = $props()
</script>

<div class="relative flex min-h-screen flex-col gap-16 pb-16">
	<div
		aria-hidden="true"
		class="pointer-events-none absolute inset-x-0 top-0 -z-10 h-screen overflow-hidden mask-[linear-gradient(to_bottom,transparent,black_20%,black_50%,transparent)]"
	>
		<img
			src={swirl}
			alt=""
			class="md:size-[350%] size-[200%] aspect-square object-cover dark:opacity-20 opacity-50 -translate-y-1/3"
		/>
		<h1 class="absolute top-0 right-0 md:-mr-28 -mr-20 {ghostTitleClass} font-bold font-josefin-sans pointer-events-none text-surface-50-950 [writing-mode:sideways-lr] text-outline">{h1}</h1>
	</div>
	<div class="relative z-0 pt-32 md:pl-8 pl-2 flex flex-col gap-4">
		<h1 class="md:text-[12rem] text-6xl font-bold font-josefin-sans text-primary-500 -ml-4">{h1}</h1>
		<h2 class="text-2xl font-bold text-primary-500">{h2}</h2>
		<div class="flex flex-col max-w-3xl md:text-lg prose">
			{@render description?.()}
		</div>
	</div>
	{@render children?.()}
</div>

<style>
	.text-outline {
		/* -webkit-text-stroke: 2px red; */
		text-shadow: 
			-1px -1px 0 var(--color-surface-100-900),  
			1px -1px 0 var(--color-surface-100-900),
			-1px 1px 0 var(--color-surface-100-900),
			1px 1px 0 var(--color-surface-100-900);
	}
</style>