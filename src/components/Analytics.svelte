<script lang="ts">
	import { browser } from "$app/environment";
	import posthog from "posthog-js"

	if (browser) {
		posthog.init("phc_myPxqS3Z8eKJEP27mRg0w2F8k9VUEIRF60kJyqmM3gj", { api_host: "https://us.posthog.com" })
	}
</script>

<svelte:head>
	<script defer data-domain="vitroidfpv.com" src="https://plausible.newtly.eu/js/script.js"></script>
</svelte:head>