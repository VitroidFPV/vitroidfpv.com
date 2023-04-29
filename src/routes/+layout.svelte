<script>
	import "../app.css";
	import "../form.css"
	import { page } from "$app/stores";
	import Nav from "$components/navbar/Nav.svelte";
	import Footer from "$components/navbar/Footer.svelte";
	import Analytics from "$components/Analytics.svelte";
	// @ts-ignore
	import Transition from "$components/Transition.svelte";
	import { onMount } from "svelte";

	import netlifyIdentity from "netlify-identity-widget";

	let ready = false;
	onMount(() => {
		ready = true;
		netlifyIdentity.init();
	});
</script>

<Analytics />
<!-- {#if ready} -->
<div
	class:hidden={!ready}
	class="dark:bg-main-400 bg-contrast-50 text-main-200 dark:text-contrast-50 text-lg scroll-smooth body-box"
>
	<div class="flex md:flex-row flex-col-reverse h-fit page-box min-w-full">
		<Nav />
		<Transition refresh={$page.url.pathname}>
			<slot />
		</Transition>
	</div>
	<Footer />
</div>

<div class="hidden bg-pink text-pink border-pink"></div>
<div class="hidden bg-red text-red border-red"></div>
<div class="hidden bg-orange text-orange border-orange"></div>
<div class="hidden bg-yellow text-yellow border-yellow"></div>
<div class="hidden bg-green text-green border-green"></div>
<div class="hidden bg-cyan text-cyan border-cyan"></div>
<div class="hidden bg-blue text-blue border-blue"></div>
<div class="hidden bg-violet text-violet border-violet"></div>

<!-- {/if} -->
