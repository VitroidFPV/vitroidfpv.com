<div class="w-full p-4 px-8 flex flex-col">
    <MainHeader text="Radio equipment"/>
    <Header text="Everything you need to control your quad"/>
    <Paragraph text="Radios, TX modules, receivers, antennas, and any other misc accessories for radios, all you need to get control over your craft.<br>
    If you're trying to decide, or don't even have any prior experience, this list will hopefully help you!<br><br>
    Prices may depend on where and when you source the parts, (prices and specs are sourced from the manufacturers website at the time of the writing when possible)"/>

    {#each Object.entries(grouped_modules) as [cat, contents]}
    <div class="{cat} my-8 w-full h-fit">
    <div class="text-4xl tracking-tight w-fit px-1 cat {cat} mb-2" id="{cat}">{cat}</div>
        {#each contents as info}
            <BuildProduct 
            color="{info.metadata.color}" 
            title="{info.metadata.title}" 
            price="{info.metadata.price}" 
            point1="{info.metadata.point1}" 
            point2="{info.metadata.point2}" 
            point3="{info.metadata.point3}" 
            point4="{info.metadata.point4}"
            point5="{info.metadata.point5}"
            text="{info.metadata.text}"
            link="{info.metadata.link}"/>
        {/each}
    </div>
    {/each}
</div>

<script>
    // @ts-ignore
    import BuildProduct from "/src/components/buildsPage/buildProduct.svelte";
    // @ts-ignore
    import MainHeader from "/src/components/mainHeader.svelte";
    // @ts-ignore
    import Header from "/src/components/header.svelte";
    // @ts-ignore
    import Paragraph from "/src/components/Paragraph.svelte";

    const modules = import.meta.globEager("/modules/equipmentLists/radioList/*.md");
    // console.log(modules)
    let grouped_modules = {};

    for (const k in modules) {
        const cat = modules[k].metadata.Category;
        if (grouped_modules[cat]) {
        grouped_modules[cat].push(modules[k]);
        } else {
        grouped_modules[cat] = [modules[k]]
        }
    }
</script>