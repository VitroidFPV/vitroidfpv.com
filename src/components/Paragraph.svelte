<div class="border-b-[1px] border-gray-700 flex flex-col md:items-start items-center w-fit">
    <p class="md:w-[50vw] w-full leading-relaxed mb-4 text-justify text-lg">{@html text}</p>
    <slot />
</div>

<script>
    export let text
</script>