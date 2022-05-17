<script>
        // @ts-ignore
    import BuildProduct from "/src/components/buildsPage/buildProduct.svelte";
        // @ts-ignore
    import MainHeader from "/src/components/mainHeader.svelte";
        // @ts-ignore
    import Header from "/src/components/Header.svelte";
        // @ts-ignore
    import Paragraph from "/src/components/Paragraph.svelte";

    const modules = import.meta.globEager("/modules/buildLists/5inchBeginner/*.md");
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

<svelte:head>
    <title>VitroidFPV - 5" Beginner Build</title>
</svelte:head>

<div class="w-full p-4 px-8 flex flex-col">
    <MainHeader text="5'' Beginner"/>
    <Header text="Cheap, durable, and easy to put together and repair"/>
    <Paragraph text="Specced out to be easy to assemble, with affordable and accessible parts, and electronics that should be easy to solder, 
    this build should be perfect to get you started in the world of FPV<br>
    This list includes everything to build a full quad, except parts such as cameras, goggles, receiver and radio systems as those vary depending on prefference and you'll find recommendations"/>

    {#each Object.entries(grouped_modules) as [cat, contents]}
    <div class="{cat} my-8 w-full h-fit">
    <div class="text-4xl tracking-tight md:w-fit f-full px-1 md:ml-1 ml-2 cat {cat} mb-2 text-center" id="{cat}">{cat}</div>
        <div class="flex flex-col md:flex-row flex-wrap w-full md:justify-between items-center">
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
    </div>
    {/each}
</div>
