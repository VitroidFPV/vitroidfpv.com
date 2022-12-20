<script>
	import { fade } from "svelte/transition";
</script>

<div in:fade class="bg-green/30 h-8 rounded-full w-16 ml-4 text-xl flex items-center justify-between px-1">
    +<slot/>
    <span class="w-6 h-6 rounded-full bg-green/80 hover:bg-green select-none duration-300 
        text-black pl-2 text-base relative group">?
        <div class="absolute -right-40 top-8 dark:bg-black/50 bg-black/20 backdrop-blur-md scale-0 
		group-hover:scale-100 duration-300 md:rounded-r-2xl md:rounded-bl-2xl rounded-2xl w-96 text-white 
		text-lg p-4 select-auto shadow-2xl border-2 border-white/10 shadow-black/50"><slot /> people have found this page useful! <br> Give a rating at the bottom of the page</div>
    </span>
</div>