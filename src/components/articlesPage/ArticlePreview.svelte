<script lang="ts">
	import Link from "$components/Link.svelte";

	export let title: string
	export let description: string
	export let img: string
	export let href = ""
	export let category: string
	export let date: string
	// export let author: string

	let categoryColor: string
	switch (category) {
		case "Guides":
			categoryColor = "green"
			break
		case "Tutorials":
			categoryColor = "cyan"
			break
		case "News":
			categoryColor = "red"
			break
		case "Reviews":
			categoryColor = "yellow"
			break
		case "Misc":
			categoryColor = "violet"
			break
		default:
			categoryColor = "violet"
	}
</script>

<svelte:head>
	<link rel="preload" href={img} as="image" />
</svelte:head>

<div class="article-card flex flex-col xl:aspect-[3.5/2] aspect-[1.5/1] {category} rounded-2xl duration-300 w-full h-full shadow-lg">
	<a href={href} class="flex flex-col w-full h-full">
	<div class="relative flex items-end h-full w-full group overflow-hidden rounded-2xl">
			<div class="flex flex-col z-20 pb-4 pl-4 text-contrast-50 origin-bottom-left">
				<div>
					<div class="flex items-center w-fit mb-2 h-5">
						<div class="w-0 group-hover:w-1 group-hover:mr-1 bg-{categoryColor} h-0 group-hover:h-full duration-300 rounded-full"></div>
						<div class="group-hover:text-{categoryColor} duration-300">{category}</div>
					</div>
					<Link {href} size="1" color={categoryColor} color1="">{title}</Link>
				</div>
				<div class="xl:text-lg text-base">{description}</div>
				<div class="md:opacity-0 md:h-0 mt-0 group-hover:opacity-100 md:group-hover:h-6 md:group-hover:mt-2 duration-300 text-base">{date}</div>
			</div>
			<div class="card-gradient {category} w-full h-full absolute z-10 duration-300 rounded-2xl"></div>
			<div style="background-image: url({img});"
				class="article-card-img bg-center bg-cover scale-[103%] group-hover:scale-[108%] blur-[4px] group-hover:blur-[0.5px] duration-300 h-full w-full saturate-0 absolute brightness-75 rounded-2xl">
			</div>
		</div>
	</a>
</div>