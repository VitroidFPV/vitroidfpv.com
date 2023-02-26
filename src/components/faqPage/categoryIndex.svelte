<script lang="ts">
	export let icon: string;
	export let color: string;
	export let text: string;
	export let link: string;
</script>

<div class="flex flex-row items-center cursor-pointer">
	<div class="{icon} relative mr-1 w-6 h-6 bg-contain bg-center" />
	<a class="{color} hover:translate-x-1.5 duration-300 w-fit" href="/faq#{link}">{text}</a>
</div>
