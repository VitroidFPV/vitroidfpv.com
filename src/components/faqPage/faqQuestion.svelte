<script lang="ts">
	let open = $state(false);
	import { onMount } from "svelte";
	import { slide, fade, fly } from "svelte/transition";
	import { page } from "$app/state";
	import toast, { Toaster } from 'svelte-french-toast';

	// import SvelteMarkdown from 'svelte-markdown'
	import IntersectionObserver from "svelte-intersection-observer";
	import { copyText } from "$lib/copy";
	interface Props {
		title: string;
		content: string;
		category: string;
		id?: string;
	}

	let {
		title,
		content,
		category,
		id = ""
	}: Props = $props();
	let element: HTMLElement = $state();
	let intersecting: boolean = $state();

	let source = content;

	onMount(() => {
		linkOpen();
	});

	function linkOpen() {
		let hash = page.url.hash.replace("#", "");
		if (hash != "") {
			if (hash == id) {
				open = true;
			}
			location.href = "#" + hash;
			// document.querySelector("#" + hash).scrollIntoView({behavior: 'smooth'});
		}
	}

	function copyID(this: {nextElementSibling: any; "on:click": () => void; class: string; }) {
		let id = this.nextElementSibling.id;
		copyText(page.url.origin + page.url.pathname + "/" + id);
		// console.log(id);
	}

	// 	function handleParsed(event) {
	// 	//access tokens via event.detail.tokens
	// 	console.log(event.detail.tokens);
	// }
</script>

<IntersectionObserver {element} bind:intersecting>
		<div class="relative">
			<div class:intersecting={intersecting}
				class="tracking-normal not-intersecting text-main-200 dark:text-contrast-100 border-none flex flex-col mt-2 intersecting relative"
				bind:this={element}
				transition:fly={{ y: 10, duration: 300 }}
			>
				<div class="flex align-start">
					<button onclick={copyID}>
						<div
							class="text-3xl text-black dark:text-white opacity-20 hover:opacity-40 duration-300 cursor-pointer copy-id mr-2"
						>
							#
						</div>
					</button>
					<button
						type="button"
						onclick={() => (open = !open)}
						class:faq-active={open}
						class="collapsible duration-300
								after:ml-1 text-[20px] md:text-xl hover:translate-x-1 duartion-150 {category} text-left"
						{id}>{title}</button>
				</div>
			</div>
			{#if open}
				<div
					transition:slide
					class="top-11 z-10 left-2 absolute content text-xl bg-neutral-500/10 border-2 border-neutral-500/20 backdrop-blur-lg rounded-2xl mb-2 w-full"
				>
					<!-- <div class="md:p-8 p-6 text-base md:text-lg leading-relaxed md"><SvelteMarkdown {source} on:parsed={handleParsed}/></div> -->
					<div class="md:p-8 p-4 text-base md:text-lg leading-relaxed md">{@html content}</div>
				</div>
			{/if}
		</div>
</IntersectionObserver>

<style>
	.img-closed {
		width: 75%;
	}
	.img-open {
		width: 100%;
	}
	.not-intersecting {
		opacity: 0;
		transform: translateX(-3%);
		/* filter: blur(2px); */
		transition: all 150ms;
	}
	.intersecting {
		opacity: 1;
		transform: translateX(0%);
		/* filter: blur(0px); */
	}
</style>
