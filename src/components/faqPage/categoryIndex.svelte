<script lang="ts">
	interface Props {
		icon: string;
		color: string;
		text: string;
		href: string;
	}

	let {
		icon,
		color,
		text,
		href
	}: Props = $props();
</script>

<div class="flex flex-row items-center cursor-pointer">
	<div class="{icon} relative mr-1 w-6 h-6 bg-contain bg-center"></div>
	<a class="{color} hover:translate-x-1.5 duration-300 w-fit" href="/faq#{href}">{text}</a>
</div>
