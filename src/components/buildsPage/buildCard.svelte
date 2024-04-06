<script lang="ts">
	import Link from "$components/Link.svelte";

	export let short = false;
	export let color: string;
	export let title: string;
	export let href: string;
	export let img = "";
	export let point1 = "";
	export let point2 = "";
	export let point3 = "";
	export let point4 = "";
	export let point5 = "";
	export let visible = true;

	let info = [point1, point2, point3, point4, point5];
</script>

{#if visible}
	<div
		class="bg-neutral-500/20 dark:bg-main-300/30 backdrop-blur-[2px] outline-2 outline outline-neutral-500/20 mt-6 w-full h-36 hover:h-96 rounded-[1.5rem] card {color} {short} shadow-[0px_-22px_0px,0px_25px_50px_-15px_#181818] duration-500 relative flex flex-col items-center group hover:delay-[0ms] delay-500">
		<div
			class="bulge {color} shadow-lg w-40 h-20 rounded-b-[2rem] absolute origin-bottom scale-y-[102%] before:scale-y-[98%] before:origin-bottom after:scale-y-[98%] after:origin-bottom
				before:content-[''] before:absolute before:bg-transparent before:rounded-full before:w-12 before:h-12 before:-left-12 before:shadow-[22px_-22px_0px]
				after:content-[''] after:absolute after:bg-transparent after:rounded-full after:w-12 after:h-12 after:-right-12 after:shadow-[-22px_-22px_0px]">
			<div class="relative">
				<!-- svelte-ignore a11y-missing-attribute -->
				<img src="{img}" class="absolute h-24 aspect-square left-8 -top-4 group-hover:-translate-y-2 duration-300">
			</div>
		</div>
		<div class="top-20 relative self-start pl-3 pt-2">
			<Link preload {color} color1="inherit" {href} size="3">{title}</Link>
			<div class="text-xl mt-4">
				<ul class="list-disc list-inside h-0 invisible group-hover:visible">
					{#each info as text}
						{#if text}
							<li class="text-transparent group-hover:text-main-200 dark:group-hover:text-contrast-100 duration-300 delay-[{100 + 75 * (info.indexOf(text))}ms]">{text}</li>
						{/if}
					{/each}	
				</ul>
			</div>
		</div>
	</div>
{/if}