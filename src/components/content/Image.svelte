<script
	lang="ts"
	module
>
	import type { Picture } from "@sveltejs/enhanced-img"

	export type ContentImage = {
		src: string | Picture
		alt?: string
		description?: string
		url?: string
	}
</script>

<script lang="ts">
	let { images }: { images: ContentImage[] } = $props()

	function altText(image: ContentImage): string {
		return image.alt ?? image.description ?? ""
	}
</script>

<div class="grid grid-cols-1 gap-2 md:grid-cols-2">
	{#each images as image, i (i)}
		<figure class="flex flex-col gap-1">
			{#if typeof image.src === "string"}
				<img
					src={image.src}
					alt={altText(image)}
					class="max-h-96 w-auto rounded-2xl"
				/>
			{:else}
				<enhanced:img
					src={image.src}
					alt={altText(image)}
					class="max-h-96 w-auto rounded-2xl"
					sizes="(min-width: 1024px) 320px, (min-width: 768px) 50vw, 100vw"
				/>
			{/if}
			{#if image.description || image.url}
				<figcaption class="text-sm">
					{#if image.url}
						<a
							href={image.url}
							target="_blank"
							rel="external noopener noreferrer"
						>
							{image.description ?? "Source"}
						</a>
					{:else if image.description}
						{image.description}
					{/if}
				</figcaption>
			{/if}
		</figure>
	{/each}
</div>
