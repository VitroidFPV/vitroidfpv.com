<script>
	import { fade } from "svelte/transition";
</script>

<div in:fade class="bg-neutral-400/20 border-white/20 border-2 h-8 rounded-full w-fit ml-4 text-xl items-center justify-between place-self-end px-1 py-4 flex my-2 dark:text-contrast-100">
    +<slot/>
    <span class="w-6 h-6 rounded-full bg-neutral-400/50 select-none duration-300 pl-2 ml-2 hover:bg-neutral-400/30
        text-base relative group">?
        <div class="absolute -right-[9.66rem] dark:bg-black/50 bg-black/20 backdrop-blur-md scale-0 
		group-hover:scale-100 duration-300 md:rounded-r-2xl md:rounded-bl-2xl rounded-2xl w-96 text-white 
		text-lg p-4 select-auto shadow-2xl border-2 border-white/10 shadow-black/50"><slot /> people have found this page useful! <br> Give a rating at the bottom of the page</div>
    </span>
</div>