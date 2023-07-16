<script lang="ts">
	export let tooltip: string = "";
	export let classes: string = "";
	export let color: string = "";
</script>

<div 
	class="relative group/tooltip w-fit h-fit flex items-center justify-center"
	class:cursor-pointer={tooltip !== ""}
>
	<div class="dark:bg-opacity-20 bg-opacity-70 rounded-full px-1.5 p-1 {classes} flex justify-center min-w-[3rem]
	bg-neutral-400/20 dark:text-contrast-50 text-main-400 chip group-first-of-type/tooltip:bg-{color} 
	dark:group-first-of-type/tooltip:text-{color} dark:group-first-of-type/tooltip:bg-opacity-20 
	group-first-of-type/tooltip:bg-opacity-50 dark:group-first-of-type/tooltip:font-semibold">
		<slot /> {#if tooltip !== ""} <span class="opacity-50 group-hover/tooltip:opacity-100 ml-2">?</span> {/if}
	</div>
	{#if tooltip !== ""}
		<div class="absolute self-center text-sm whitespace-nowrap z-10 bg-opacity-100 bg-neutral-500/20 border-2 
		border-neutral-500/40 shadow-lg backdrop-blur-md rounded-full scale-0 group-hover/tooltip:scale-100 bottom-[105%] 
		duration-300 p-2">
			{tooltip}
		</div>
	{/if}
</div>