<script>
    export let formId
</script>

<div class="bg-green/30 h-8 rounded-full w-16 ml-4 text-xl flex items-center justify-between px-1">
    +<slot/>
    <span class="w-6 h-6 rounded-full bg-green/80 hover:bg-green select-none duration-300 
        text-black pl-2 text-base relative group">?
        <div class="absolute dark:bg-black/50 bg-black/20 backdrop-blur-sm invisible group-hover:visible duration-300 rounded-r-2xl rounded-bl-2xl w-64 text-white text-xl p-4 select-auto shadow-2xl">4 people have found this page useful</div>
    </span>
</div>