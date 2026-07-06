<script lang="ts">
	import { Sun, Moon } from "@lucide/svelte"

	function toggleMode() {
		const current = document.documentElement.getAttribute("data-mode")
		const next = current === "dark" ? "light" : "dark"
		document.documentElement.setAttribute("data-mode", next)
		localStorage.setItem("mode", next)
	}
</script>

<button
	type="button"
	aria-label="Toggle theme"
	onclick={toggleMode}
	class="transition-colors duration-200 hover:text-primary-500"
>
	<Sun class="hidden size-8 dark:block" />
	<Moon class="size-8 dark:hidden" />
</button>
