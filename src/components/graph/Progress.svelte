<script lang="ts">
	export let width = 200;
	export let lineWidth = 30;
	export let bgColor = "rgb(163 163 163 / 0.1)";
	export let color = "#2ad162";
	export let responsive = true;
	export let percent = 0;
	export let rounded = true;
	export let animation = true;
	export let text = "";
	export let textStyle = "";
	export let delay = 0;

	let svgWidth: number | string = "";

	$: if (responsive) {
		svgWidth = "100%";
	} else {
		svgWidth = width;
	}

	$: offset = 1100 * (1 - percent / 100);

	console.log(delay);
</script>

<div class="relative">
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={svgWidth}
		height={svgWidth}
		viewBox="-25 -25 400 400"
	>
		<circle stroke={bgColor} cx="175" cy="175" r="175" stroke-width={lineWidth} fill="none" />
		<!-- 			style="transition: {animation ? "stroke-dashoffset 0.5s ease-out" : "none"}" -->
		<circle
			stroke={color}
			transform="rotate(-90 175 175)"
			cx="175"
			cy="175"
			r="175"
			stroke-dasharray="1100"
			stroke-width={lineWidth}
			stroke-dashoffset={offset}
			stroke-linecap={rounded ? "round" : "butt"}
			fill="none"
			style="transition: {animation ? "stroke-dashoffset 0.5s ease-out" : "none"}; transition-delay: {delay}ms"
		/>
	</svg>
	<div class="absolute w-full h-full inset-0 flex justify-center items-center {textStyle}">
		{text}
	</div>
</div>