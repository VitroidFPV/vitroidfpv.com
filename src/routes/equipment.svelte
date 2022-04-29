<div class="w-full p-4 px-18 flex flex-col">
    <MainHeader text="Equipment"/>
    <Header text="All the things you'll need to get in the air!"/>

    <Paragraph text="Everything that you will need to get building and flying. <br>From goggles, cams, antennas, to radio transmitters and receivers, tools and soldering equipment, and some other minor things that could still make or break a new build" />
    <div class="flex flex-row flex-wrap justify-around">
        {#each Object.entries(grouped_modules) as [,contents]}
            {#each contents as build}
                <BuildCard title="{build.metadata.title}" color="{build.metadata.color}" link="{build.metadata.link}" short="{build.metadata.short}"
                text1="{build.metadata.text1}" text2="{build.metadata.text2}" text3="{build.metadata.text3}" text4="{build.metadata.text4}" text5="{build.metadata.text5}"></BuildCard>
            {/each}
        {/each}
    </div>

</div>

<script>
    import BuildCard from "../components/buildsPage/buildCard.svelte";
    import Header from "../components/Header.svelte";
    import MainHeader from "../components/mainHeader.svelte";
    import Paragraph from "../components/Paragraph.svelte";

    const modules = import.meta.globEager("/modules/equipmentLists/*.md");
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