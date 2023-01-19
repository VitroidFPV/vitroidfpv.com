<script>
	import { fly, fade } from "svelte/transition";
	export let refresh = "";
</script>

{#key refresh}
	<div in:fade={{duration: 500 }} class="w-full">
		<slot />
	</div>
{/key}
