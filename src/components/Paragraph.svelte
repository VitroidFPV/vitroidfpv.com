<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<div class="border-b border-gray-700 flex flex-col md:items-start items-center w-fit">
	<p class="md:w-[50vw] w-full leading-relaxed mb-4 text-justify text-lg">{@render children?.()}</p>
</div>