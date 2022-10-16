<script>
	// @ts-ignore
	import Link from "/src/components/Link.svelte";

	export let color;
	export let title;
	export let price;
	export let point1 = "";
	export let point2 = "";
	export let point3 = "";
	export let point4 = "";
	export let point5 = "";
	export let text;
	export let link;
</script>

<div class="{color} h-fit max-w-sm min-w-[18rem] border-l-4 product pl-2 my-4 md:mr-8">
	<Link {color} color1={color} size="2" {link} external=true>{title}</Link>
	<div class="flex justify-between mt-3 mb-3 flex-wrap tracking-[0.01em]">
		<div class="text-base text-main-100 dark:text-contrast-300 mr-2">{price}</div>
		<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point1}</div>
		<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point2}</div>
		<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point3}</div>
		<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point4}</div>
		<div class="text-base text-main-50 dark:text-contrast-500 mr-2">{point5}</div>
	</div>
	<div>{text}</div>
</div>
