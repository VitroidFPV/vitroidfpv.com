<script lang="ts">
	export let rotation: number = 0;
	export let scale = 1;
	export let fill = "white";
	export let invisible = false;

	const style = `transform: rotate(${rotation}deg) scale(${scale})`;
	let fillClass: string = "";

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
	class={fillClass + " flex-shrink-0 h-6 w-6 md:visible" + (invisible ? " md:block hidden" : "")}
>
	<path d="M16 0C15.695 8.69847 8.69847 15.695 0 16H16V0Z"/>
</svg>
