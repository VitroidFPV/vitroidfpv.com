<script>
	import "../app.css";
	import "../form.css"
	import { page } from "$app/stores";
	import Nav from "../components/navbar/Nav.svelte";
	import Footer from "../components/navbar/Footer.svelte";
	import Analytics from "src/components/Analytics.svelte";
	// @ts-ignore
	import Transition from "/src/components/Transition.svelte";
	import { onMount } from "svelte";

	let ready = false;
	onMount(() => (ready = true));
</script>

<Analytics />
<!-- {#if ready} -->
<div
	class:hidden={!ready}
	class="dark:bg-main-400 bg-contrast-50 text-main-200 dark:text-contrast-50 text-lg scroll-smooth"
>
	<div class="flex md:flex-row flex-col-reverse h-fit overflow-visible">
		<Nav />
		<Transition refresh={$page.url.pathname}>
			<slot />
		</Transition>
	</div>
	<Footer />
</div>
<!-- {/if} -->
