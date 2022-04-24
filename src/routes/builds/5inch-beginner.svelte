<script>
    
    import BuildProduct from "/src/components/buildsPage/buildProduct.svelte";

    const modules = import.meta.globEager("./faq/*.md");
    console.log(modules)
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

<div class="m-8">
    <!-- {#each Object.entries(grouped_modules) as [cat, contents]}
    <div class="{cat} my-8 w-full h-fit">
    <div class="text-3xl tracking-tight border-b-2 w-fit px-1 cat {cat} pb-1" id="{cat}">{cat}</div>
        {#each contents as info}
            <BuildProduct color="{cat}" title="{info.metadata.title}" price="{info.metadata.price}" point1="{info.metadata.point1}" point2="{info.metadata.point2}" point3="{info.metadata.point3}"/>
        {/each}
    </div>
    {/each} -->

    <BuildProduct color="red" title="test" price="$420" point1="point1" point2="point2" point3="point3" text="lorem"></BuildProduct>

    <div class="m-8">
        {#each Object.entries(grouped_modules) as [cat, contents]}
        <div class="{cat} my-8 w-full h-fit">
        <div class="text-3xl tracking-tight border-b-2 w-fit px-1 cat {cat} pb-1" id="{cat}">{cat}</div>
            {#each contents as info}
                <BuildProduct color="{cat}" title="{info.metadata.title}" price="{info.metadata.price}" point1="{info.metadata.point1}" point2="{info.metadata.point2}" point3="{info.metadata.point3}" text="{info.metadata.text}"/>
            {/each}
        </div>
        {/each}
    </div>
</div>
