<script lang="ts">
	import Corner from "$components/graphics/Corner.svelte"
	import { SiGithub, SiYoutube, SiInstagram } from "@icons-pack/svelte-simple-icons"
</script>

{#snippet footerLink(href: string, label: string, description: string, external: boolean = false)}
	<li class="flex flex-col">
		<a href={href} class="font-semibold hover:underline w-fit {external ? 'external' : ''}" target={external ? '_blank' : '_self'} rel="noopener noreferrer">{label}</a>
		<p class="text-xs">{description}</p>
	</li>
{/snippet}

<footer class="relative z-20 bg-primary-500 w-full grid xl:grid-cols-[1fr_auto_auto_auto] md:grid-cols-2 grid-cols-1 text-primary-contrast-dark p-4 py-8 gap-8">
	<Corner class="absolute bottom-full left-0 size-16 text-primary-500 rotate-90" />
	<Corner class="absolute bottom-full right-0 size-16 text-primary-500" />
	<div class="flex flex-col gap-2 col-span-full xl:col-span-1">
		<div class="text-6xl font-bold font-caveat bold-text-effect select-none whitespace-nowrap -ml-2">
			Vitroid FPV
		</div>
		<div class="flex gap-4 items-center">
			<a href="https://github.com/vitroidfpv" target="_blank" rel="noopener noreferrer">
				<SiGithub class="size-8 hover:opacity-75" />
			</a>
			<a href="https://www.youtube.com/@vitroid" target="_blank" rel="noopener noreferrer">
				<SiYoutube class="size-8 hover:opacity-75" />
			</a>
			<a href="https://www.instagram.com/vitroid.fpv" target="_blank" rel="noopener noreferrer">
				<SiInstagram class="size-8 hover:opacity-75" />
			</a>
		</div>
	</div>
	<div class="flex flex-col gap-2">
		<div class="text-2xl font-bold font-josefin-sans">Resources</div>
		<ul class="flex flex-col gap-2">
			{@render footerLink("https://www.youtube.com/@JoshuaBardwell", "Joshua Bardwell", "Excellent videos about everything FPV", true)}
			{@render footerLink("https://oscarliang.com/", "Oscar Liang", "Excellent articles about everything FPV", true)}
			{@render footerLink("https://fpvmarket.eu/", "FPV Market EU", "A collection of FPV stores in Europe", true)}
		</ul>
	</div>
	<div class="flex flex-col gap-2">
		<div class="text-2xl font-bold font-josefin-sans">Discord Servers</div>
		<ul class="flex flex-col gap-2">
			{@render footerLink("https://discord.gg/drones", "Drone Community", "FPV, camera drones and fixed wings", true)}
			{@render footerLink("https://discord.betaflight.com/invite", "Betaflight", "Betaflight support, bug reports, testing and more", true)}
			{@render footerLink("https://discord.gg/dS6ReFY", "ELRS", "ELRS support, bug reports, testing and more", true)}
		</ul>
	</div>
	<div class="flex flex-col gap-2">
		<div class="text-2xl font-bold font-josefin-sans">Misc</div>
		<ul class="flex flex-col gap-2">
			{@render footerLink("/projects", "Projects", "All the projects I made or contributed to")}
			{@render footerLink("/ai", "LLMs/AI", "Read about how I (don't) use LLMs for my projects")}
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