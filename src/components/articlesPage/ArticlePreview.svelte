<script lang="ts">
	import Link from "$components/Link.svelte";

	export let title: string
	export let description: string
	export let img: string
	export let link = ""
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

<div class="article-card flex flex-col md:aspect-[3.5/2] aspect-[2/3] {category} rounded-[18px] duration-300 w-full">
	<a href={link} class="flex flex-col w-full h-full">
	<div class="relative flex items-end h-full w-full group overflow-hidden rounded-2xl">
			<div class="flex flex-col z-20 pb-4 pl-4 text-contrast-50 origin-bottom-left">
				<div>
					<div>{category}</div>
					<Link {link} size="2" color={categoryColor} color1="">{title}</Link>
				</div>
				<div class="">{description}</div>
				<div class="md:opacity-0 md:h-0 mt-0 group-hover:opacity-100 md:group-hover:h-6 md:group-hover:mt-2 duration-300 text-base">{date}</div>
			</div>
			<div class="card-gradient {category} w-full h-full absolute z-10 duration-300 rounded-2xl"></div>
			<div style="background-image: url({img});"
				class="article-card-img bg-center bg-cover scale-[103%] group-hover:scale-[108%] blur-[4px] group-hover:blur-[0.5px] duration-300 h-full w-full saturate-0 absolute brightness-75 rounded-2xl">
			</div>
		</div>
	</a>
</div>