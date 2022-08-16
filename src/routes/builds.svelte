<div class="content-box">
    <MainHeader text="Builds"/>
    <Header text="Parts lists and build guides for any quad you'd want!"/>

    <Paragraph text="If you're just a beginner wanting to get their first build, or a long-time pilot that just wants some build inspiration, this is the place for you!<br><br>
        The builds here are sorted by difficulty, so you can quickly decide if something is for you as a beginner, or to recommend to someone else. When you hover on a specifc build, it will pop up with some short info, and you can get to the build by clicking on the name" />
    <ul class="mt-2">
        <li>
            <div class="flex items-center mb-4">
                <div class="dark:bg-main-300 bg-contrast-300 w-32 h-20 rounded-2xl flex items-center justify-around text-2xl shadow-[0px_-10px_0px_#87cc52] mr-2">Easy</div>
                <div class="w-[28rem] mb-4"> - You should be able to put this together as a complete beginner. Parts are easy to source, and you'll have enough space to assemble and solder everything</div>
            </div>
        </li>
        <li>
            <div class="flex items-center mb-4">
                <div class="dark:bg-main-300 bg-contrast-300 w-32 h-20 rounded-2xl flex items-center justify-around text-2xl shadow-[0px_-10px_0px_#ff9742] mr-2">Medium</div>
                <div class="w-[28rem] mb-4"> - More for intermediate pilots, or if you have more experience with electronics and soldering. Parts usually more expensive and sometimes hard to come across</div>
            </div>
        </li>
        <li>
            <div class="flex items-center mb-4">
                <div class="dark:bg-main-300 bg-contrast-300 w-32 h-20 rounded-2xl flex items-center justify-around text-2xl shadow-[0px_-10px_0px_#d6395b] mr-2">Hard</div>
                <div class="w-[28rem] mb-4"> - For experienced pilots that know what they're doing, this shouldn't be your first build. Exotic and pricy parts, tight space to build in, and other various build constraints</div>
            </div>
        </li>
    </ul>
    <div class="flex flex-row flex-wrap justify-around">
        {#each Object.entries(grouped_modules) as [,contents]}
            {#each contents as build}
                <BuildCard 
                title="{build.metadata.title}" 
                color="{build.metadata.difficulty}" 
                link="{build.metadata.link}"
                text1="{build.metadata.text1}" 
                text2="{build.metadata.text2}" 
                text3="{build.metadata.text3}" 
                text4="{build.metadata.text4}" 
                text5="{build.metadata.text5}"
                img="{build.metadata.img}"></BuildCard>
            {/each}
        {/each}
    </div>

</div>

<svelte:head>
    <title>VitroidFPV - Builds</title>
</svelte:head>

<script>
    import BuildCard from "../components/buildsPage/buildCard.svelte";
    import Header from "../components/Header.svelte";
    import MainHeader from "../components/mainHeader.svelte";
    import Paragraph from "../components/Paragraph.svelte";

    const modules = import.meta.globEager("/modules/buildLists/*.md");
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

    let prefix = "VitroidFPV"
    let title = " - Builds"
    let color = "#1cd167"
    let description = "If you're just a beginner wanting to get their first build, or a long-time pilot that just wants some build inspiration, this is the place for you!"

</script>