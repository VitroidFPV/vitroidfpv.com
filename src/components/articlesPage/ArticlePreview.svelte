<script>
	import Link from "$components/Link.svelte";

	export let title
	export let description
	export let img
	export let link = ""
	export let category
	export let date
	export let author

	let categoryColor
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

<div class="article-card flex flex-col h-56 w-96 {category} rounded-[18px] mr-12 my-6 duration-300">
	<a href={link} class="flex flex-col w-full h-full">
	<div class="relative flex items-end h-full w-full group overflow-hidden rounded-2xl">
			<div class="flex flex-col z-20 pb-4 pl-4 text-contrast-50">
				<div>
					<div>{category}</div>
					<Link {link} size="2" color={categoryColor} color1="">{title}</Link>
				</div>
				<div class="">{description}</div>
				<div class="opacity-0 h-0 mt-0 group-hover:opacity-100 group-hover:h-6 group-hover:mt-2 duration-300 text-base">{date}</div>
			</div>
			<div class="card-gradient {category} w-full h-full absolute z-10 backdrop-blur-[3px] group-hover:backdrop-blur-[1px] duration-300 rounded-2xl"></div>
			<div style="background-image: url({img});"
				class="article-card-img bg-center bg-cover group-hover:scale-105 duration-300 h-full w-full saturate-0 absolute brightness-75 rounded-2xl">
			</div>
		</div>
	</a>
</div>