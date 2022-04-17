<div class="m-8">

    {#each Object.entries(grouped_modules) as [,contents]}
        {#each contents as build}
            <BuildCard title="{build.metadata.title}" color="{build.metadata.difficulty}" link="{build.metadata.link}" 
            text1="{build.metadata.text1}" text2="{build.metadata.text2}" text3="{build.metadata.text3}" text4="{build.metadata.text4}" text5="{build.metadata.text5}"></BuildCard>
        {/each}
    {/each}

</div>

<script>
    import BuildCard from "../components/buildsPage/buildCard.svelte";

    const modules = import.meta.globEager("/buildCards/*.md");
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