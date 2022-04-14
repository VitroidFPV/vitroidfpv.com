<div class="flex flex-row items-center cursor-pointer">
    <div class="{icon} relative top-0.5 mr-1 w-6 h-6 bg-contain bg-center"></div>
    <a class="{color} hover:translate-x-1.5 duration-300 w-fit" href="/faq#{link}">{text}</a>
</div>

<script>
    export let icon
    export let color
    export let text
    export let link
</script>