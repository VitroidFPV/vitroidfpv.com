<script lang="ts">
	export let title: string = "";

	function removeSpecial(string: string) {
		// spaces should be replaced with dashes
		// special characters should be removed
		// all letters should be lowercase
		return string.replaceAll(" ", "-").replaceAll(/[^a-zA-Z0-9-]/g, "").toLowerCase()
	}
</script>

<div class="bg-contrast-100 dark:bg-main-200/30 outline-2 outline outline-neutral-500/20 rounded-2xl p-4 shadow-lg">
	<div id={removeSpecial(title)} class="text-xl colored mb-2">{title}</div>
	<div class="text-base grid-item">
		<slot />
	</div>
</div>