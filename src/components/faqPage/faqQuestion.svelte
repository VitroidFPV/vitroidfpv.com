<script>
	let open = false;
	export let title;
	export let content;
	export let category;
	export let id = "";
	import { onMount } from "svelte";
	import { slide, fade, fly } from "svelte/transition";
	import { page } from "$app/stores";
	// import SvelteMarkdown from 'svelte-markdown'
	import IntersectionObserver from "svelte-intersection-observer";
	let element;
	let intersecting;

	let source = content;

	onMount(() => {
		linkOpen();
	});

	function linkOpen() {
		let hash = $page.url.hash.replace("#", "");
		if (hash != "") {
			if (hash == id) {
				open = true;
			}
			location.href = "#" + hash;
			// document.querySelector("#" + hash).scrollIntoView({behavior: 'smooth'});
		}
	}

	function copyID() {
		let id = this.nextElementSibling.id;
		console.log(id);
		navigator.clipboard.writeText($page.url.origin + $page.url.pathname + "#" + id);
	}

	// 	function handleParsed(event) {
	// 	//access tokens via event.detail.tokens
	// 	console.log(event.detail.tokens);
	// }
</script>

<IntersectionObserver {element} bind:intersecting>
		<div class:intersecting={intersecting}
			class="tracking-normal not-intersecting text-main-200 dark:text-contrast-100 border-none flex flex-col mt-2 intersecting"
			bind:this={element}
			transition:fly={{ y: 10, duration: 300 }}>
			<div class="flex align-start">
				<div
					on:click={copyID}
					class="text-3xl text-black dark:text-white opacity-20 hover:opacity-40 duration-300
						cursor-pointer copy-id mr-2">#
				</div>
				<button
					type="button"
					on:click={() => (open = !open)}
					class:faq-active={open}
					class="collapsible duration-300
							after:ml-1 text-[20px] md:text-xl hover:translate-x-1 duartion-150 {category} text-left"
					{id}>{title}</button>
			</div>
			{#if open}
				<div
					transition:slide
					class="content text-xl bg-contrast-100 dark:bg-main-300 rounded-2xl
							mb-2 h-full min-w-fit max-w-[70vw]"
				>
					<!-- <div class="md:p-8 p-6 text-base md:text-lg leading-relaxed md"><SvelteMarkdown {source} on:parsed={handleParsed}/></div> -->
					<div class="md:p-8 p-6 text-base md:text-lg leading-relaxed md">{@html content}</div>
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
