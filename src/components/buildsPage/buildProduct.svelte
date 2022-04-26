<div class="h-fit w-96 border-l-4 border-red pl-2">
    <Link color={color} title={title} color1={color} size=2 link={link}/>
    <div class="flex justify-between mt-2 flex-wrap">
        <div class="text-base text-main-100">{price}</div>
        <div class="text-base text-main-50">{point1}</div>
        <div class="text-base text-main-50">{point2}</div>
        <div class="text-base text-main-50">{point3}</div>
    </div>
    <div>{text}</div>
</div>

<script>
    // @ts-ignore
    import Link from "/src/components/Link.svelte";

    export let color
    export let title
    export let price
    export let point1 = ""
    export let point2 = ""
    export let point3 = ""
    export let text
    export let link
</script>