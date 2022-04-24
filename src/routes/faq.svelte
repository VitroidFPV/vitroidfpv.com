<script>
    import Header from "../components/Header.svelte";
    import MainHeader from "../components/mainHeader.svelte";
    import CategoryIndex from "../components/faqPage/categoryIndex.svelte";
    import Faq from "../components/faqPage/faq.svelte";
    import { onMount } from 'svelte';

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

<div class="w-full min-h-screen p-4 flex flex-col">

    <MainHeader text="FAQ"/>
    <Header text="If you need a quick answer, you might find it here!"></Header>
    <p class="text-xl md:w-[33vw] w-[90%] leading-relaxed mb-4 border-gray-500 border-b-[1px]">There's a lot of questions in FPV, doesn't matter if you're just starting or not<br>
    You will find most of the common and easy to answer ones here. For more specific ones, there are tutorials planned<br>
    The questions are sorted into individual categories, and next to each one there is a button that will copy a link to the specific one if you want to send it to someone</p>

    <ul class="mt-8 text-2xl w-fit">
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/9550ba/plus--v1.png')]" color="hover:text-violet" text="Starting out" link="Starting"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/d6395b/plus--v1.png')]" color="hover:text-red" text="Building" link="Building"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/ffcc00/plus--v1.png')]" color="hover:text-yellow" text="Betaflight" link="Betaflight"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/5ae65a/plus--v1.png')]" color="hover:text-green" text="Video" link="Video"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/5ad8e6/plus--v1.png')]" color="hover:text-cyan" text="Radio" link="Radio"></CategoryIndex>
        <CategoryIndex icon="bg-[url('https://img.icons8.com/material-outlined/32/5a6fe6/plus--v1.png')]" color="hover:text-blue" text="Hardware" link="Hardware"></CategoryIndex>
    </ul>

    {#each Object.entries(grouped_modules) as [cat, contents]}
    <div class="{cat} my-8 w-full h-fit text-justify">
    <div class="text-3xl tracking-tight border-b-2 w-fit px-1 cat {cat} pb-1" id="{cat}">{cat}</div>
        {#each contents as question}
        <!-- <div class="w-full">
            <div class="w-[38rem] tracking-normal text-main-200 dark:text-contrast-100 border-none">
                <div class="inline-flex text-3xl translate-y-0.5 text-black dark:text-white opacity-10 hover:opacity-30 duration-300 cursor-pointer copy-id">#</div>
                <button type="button" class="collapsible duration-300 after:ml-1 text-[22px] hover:translate-x-1 duartion-150 {cat}">{question.metadata.title}</button>
                <div class="content text-xl bg-contrast-200 dark:bg-main-300 rounded-2xl shadow-xl dark:shadow-black mb-2">
                    <p class="m-4">{@html question.metadata.answer}</p>
                </div>
            </div>
        </div> -->

        <Faq category="{cat}" title="{question.metadata.title}" content="{question.metadata.answer}"/>
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