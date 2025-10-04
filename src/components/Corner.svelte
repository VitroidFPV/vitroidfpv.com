<script lang="ts">
	interface Props {
		rotation?: number;
		scale?: number;
		fill?: string;
		invisible?: boolean;
	}

	let {
		rotation = 0,
		scale = 1,
		fill = "white",
		invisible = false
	}: Props = $props();

	const style = `transform: rotate(${rotation}deg) scale(${scale})`;
	let fillClass: string = $state("");

	switch (fill) {
		case "red":
			fillClass = "fill-red";
			break;
		case "blue":
			fillClass = "fill-blue";
			break;
		case "green":
			fillClass = "fill-green";
			break;
		case "yellow":
			fillClass = "fill-yellow";
			break;
		case "orange":
			fillClass = "fill-orange";
			break;
		case "purple":
			fillClass = "fill-purple";
			break;
		case "cyan":
			fillClass = "fill-cyan";
			break;
		case "highlight":
			fillClass = "fill-highlight dark:fill-highlight-dark";
			break;
		case "transparent":
			fillClass = "fill-transparent";
			break;
	}
</script>


<svg 
	width="16" 
	height="16" 
	viewBox="0 0 16 16" 
	fill="none" 
	{style} 
	xmlns="http://www.w3.org/2000/svg" 
	class:hidden={invisible}
	class={fillClass + " shrink-0 h-6 w-6 md:visible" + (invisible ? " md:block hidden" : "")}
>
	<path d="M16 0C15.695 8.69847 8.69847 15.695 0 16H16V0Z"/>
</svg>
