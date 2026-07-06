<script lang="ts">
	import Corner from "$components/graphics/Corner.svelte"
	import { resolve } from "$app/paths"
	import {
		SiGithub,
		SiYoutube,
		SiInstagram
	} from "@icons-pack/svelte-simple-icons"
</script>

{#snippet footerLink(
	href: string,
	label: string,
	description: string,
	external: boolean = false
)}
	<li class="flex flex-col">
		{#if external}
			<a
				{href}
				class="external w-fit font-semibold hover:underline"
				target="_blank"
				rel="external noopener noreferrer">{label}</a
			>
		{:else}
			<a
				href={resolve(href as "/")}
				class="w-fit font-semibold hover:underline">{label}</a
			>
		{/if}
		<p class="text-xs">{description}</p>
	</li>
{/snippet}

<footer
	class="relative z-20 grid w-full grid-cols-1 gap-8 bg-primary-500 p-4 py-8 text-primary-contrast-dark md:grid-cols-2 xl:grid-cols-[1fr_auto_auto_auto]"
>
	<Corner
		class="absolute bottom-full left-0 size-16 rotate-90 text-primary-500"
	/>
	<Corner class="absolute right-0 bottom-full size-16 text-primary-500" />
	<div class="col-span-full flex flex-col gap-2 xl:col-span-1">
		<div
			class="bold-text-effect -ml-2 font-caveat text-6xl font-bold whitespace-nowrap select-none"
		>
			Vitroid FPV
		</div>
		<div class="flex items-center gap-4">
			<a
				href="https://github.com/vitroidfpv"
				target="_blank"
				rel="noopener noreferrer"
			>
				<SiGithub class="size-8 hover:opacity-75" />
			</a>
			<a
				href="https://www.youtube.com/@vitroid"
				target="_blank"
				rel="noopener noreferrer"
			>
				<SiYoutube class="size-8 hover:opacity-75" />
			</a>
			<a
				href="https://www.instagram.com/vitroid.fpv"
				target="_blank"
				rel="noopener noreferrer"
			>
				<SiInstagram class="size-8 hover:opacity-75" />
			</a>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="font-josefin-sans text-2xl font-bold">Resources</div>
		<ul class="flex flex-col gap-2">
			{@render footerLink(
				"https://www.youtube.com/@JoshuaBardwell",
				"Joshua Bardwell",
				"Excellent videos about everything FPV",
				true
			)}
			{@render footerLink(
				"https://oscarliang.com/",
				"Oscar Liang",
				"Excellent articles about everything FPV",
				true
			)}
			{@render footerLink(
				"https://fpvmarket.eu/",
				"FPV Market EU",
				"A collection of FPV stores in Europe",
				true
			)}
		</ul>
	</div>
	<div class="flex flex-col gap-2">
		<div class="font-josefin-sans text-2xl font-bold">Discord Servers</div>
		<ul class="flex flex-col gap-2">
			{@render footerLink(
				"https://discord.gg/drones",
				"Drone Community",
				"FPV, camera drones and fixed wings",
				true
			)}
			{@render footerLink(
				"https://discord.betaflight.com/invite",
				"Betaflight",
				"Betaflight support, bug reports, testing and more",
				true
			)}
			{@render footerLink(
				"https://discord.gg/dS6ReFY",
				"ELRS",
				"ELRS support, bug reports, testing and more",
				true
			)}
		</ul>
	</div>
	<div class="flex flex-col gap-2">
		<div class="font-josefin-sans text-2xl font-bold">Misc</div>
		<ul class="flex flex-col gap-2">
			{@render footerLink(
				"/projects",
				"Projects",
				"All the projects I made or contributed to"
			)}
			{@render footerLink(
				"/ai",
				"LLMs/AI",
				"Read about how I (don't) use LLMs for my projects"
			)}
		</ul>
	</div>
</footer>

<style>
	footer :global(::selection) {
		background-color: var(--color-primary-600);
	}

	.bold-text-effect {
		-webkit-text-stroke: 1.25px var(--color-primary-contrast-dark);
	}

	.external:after {
		content: "↗";
	}
</style>
