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
	class="hover:text-primary-500 transition-colors duration-200"
>
	<Sun class="size-8 hidden dark:block" />
	<Moon class="size-8 dark:hidden" />
</button>
