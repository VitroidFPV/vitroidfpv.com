<script>
    import Header from "../components/Header.svelte";
    import { onMount } from 'svelte';
    import MainHeader from "../components/mainHeader.svelte";
    import CategoryIndex from "../components/faqPage/categoryIndex.svelte";

    console.log("===========");
    const modules = import.meta.globEager("/faqs/*.md");
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
        
    console.log(grouped_modules)

    onMount(() =>{
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("faq-active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
        }
    })
</script>

<svelte:head>
    <title>VitroidFPV - FAQ</title>
</svelte:head>

<div class="w-full min-h-screen m-8 flex flex-col">

    <MainHeader text="FAQ"/>
    <Header text="If you need a quick answer, there's a good chance you'll find it here!"></Header>
    <p class="leading-normal text-xl md:w-1/2">There's a lot of questions in FPV, doesn't matter if you're just starting or not<br>
    You will find most of the common and easy to answer ones here. For more specific ones, there are tutorials planned<br>
    The questions are sorted into individual categories, and next to each one there is a button that will copy a link to the specific one if you want to send it to someone</p>

    <ul class="mt-8 text-2xl w-fit">
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/9550ba/plus--v1.png')]" color="hover:text-violet" text="Starting out"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/d6395b/plus--v1.png')]" color="hover:text-red" text="Building"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/ffcc00/plus--v1.png')]" color="hover:text-yellow" text="Betaflight"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/5ae65a/plus--v1.png')]" color="hover:text-green" text="Video"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/5ad8e6/plus--v1.png')]" color="hover:text-cyan" text="Radio"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/5a6fe6/plus--v1.png')]" color="hover:text-blue" text="Hardware"></CategoryIndex>
    </ul>

    {#each Object.entries(grouped_modules) as [cat, contents]}
    <div class="{cat} my-8 w-full h-fit">
        {#each contents as question}
        <div class="w-full">
            <div class="text-3xl tracking-tight border-b-2 w-fit px-1 cat {cat} pb-1">{cat}</div>
            <div class="w-[38rem] tracking-normal text-main-200 dark:text-contrast-100 border-none">
                <button type="button" class="collapsible duration-300 after:ml-1 text-[22px] hover:translate-x-1 duartion-150 {cat}">{question.metadata.title}</button>
                <div class="content text-xl">
                    <p>{question.metadata.answer}</p>
                </div>
            </div>
        </div>
        {/each}
    </div>
    {/each}
</div>

<style>
    .content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
    }
</style>