<div class="h-fit w-96 border-l-4 border-red pl-2">
    <a href=" " class="text-2xl bg-gradient-to-r title product {color} bg-no-repeat bg-left-bottom bg-0w hover:bg-100w duration-300 w-fit -pb-4 leading-tight">{title}</a>
    <div class="flex justify-between mt-2 flex-wrap">
        <div class="text-base text-main-100">{price}</div>
        <div class="text-base text-main-50">{point1}</div>
        <div class="text-base text-main-50">{point2}</div>
        <div class="text-base text-main-50">{point3}</div>
    </div>
    <div>{text}</div>
</div>

<script>
    export let color
    export let title
    export let price
    export let point1
    export let point2
    export let point3
    export let text
</script>