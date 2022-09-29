<script>
    import Header from "../components/Header.svelte";
    import MainHeader from "../components/mainHeader.svelte";
    import CategoryIndex from "../components/faqPage/categoryIndex.svelte";
    // @ts-ignore
    import FaqQuestion from "../components/faqPage/faqQuestion.svelte";
	import { onMount } from "svelte";
	import { page } from "$app/stores";
    import { bind } from "svelte/internal";
	import { marked } from "marked";
    // @ts-ignore
    import Paragraph from "/src/components/Paragraph.svelte";
    
    // const renderer = {
    //     image(href, title, text) {
    //         if (href === null) {
    //             return text;
    //         }
        
    //         // let out = `<img src="${href}" alt="${text}" on:click={() => open = !open} class:img-closed={!open} class:img-open={open} class="h-auto duration-300"`;
    //         let out = `<img src="a" alt="${text}" onclick="enlargeImg()" id="img1"`;
    //         if (title) {
    //             out += ` title="${title}"`;
    //         }
    //         out += this.options.xhtml ? '/>' : '>';
    //         console.log(out)
    //         return out;
    //     }
    // }
    // marked.use({ renderer })

    // doesn't even work

    // img = document.getElementById("img1");
    // function enlargeImg() {
    //     Image.style.tran
    // }   
    // danovo prace
    marked.setOptions({
    gfm: true,
    breaks: true,
    sanitize: false,
    smartLists: false,
    smartypants: false,
    xhtml: false
    });
    
    // svelte template <img src="/uploads/axisflying-1-.png" alt="" on:click={() => open = !open} class:img-closed={!open} class:img-open={open} class="h-auto duration-300">
    
    const modules = import.meta.globEager("/modules/faqs/*.md");
    // console.log(modules)
    let grouped_modules = {};

    for (const k in modules) {
        const cat = modules[k].metadata.Category;
        if (grouped_modules[cat]) {
        grouped_modules[cat].push(modules[k]);
        } else {
			grouped_modules[cat] = [modules[k]];
        }
    }
    
	let prefix = "VitroidFPV";
	let title = " - FAQ";
	let color = "#1cd167";
	let description =
		"There's a lot of questions in FPV, doesn't matter if you're just starting or not. You will find most of the common and easy to answer ones here. For more specific ones, there are tutorials planned";
</script>

<svelte:head>
    <title>VitroidFPV{title}</title>
	<meta name="author" content="VitroidFPV" />
    <!-- <meta property="og:image" content="https://www.vitroidfpv.com/sources/cinewhoop_512.png"> -->
	<meta property="og:image:width" content="512" />
	<meta property="og:image:height" content="512" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="VitroidFPV" />
    <meta property="article:author" content="VitroidFPV" />
	<meta property="og:title" content="{prefix}{title}" />
	<meta name="description" content={description} />
	<meta property="og:description" content={description} />
    <meta content="https://vitroidfpv.com/" property="og:url" />
	<meta name="theme-color" content={color} />
</svelte:head>

<div class="content-box">
	<MainHeader text="FAQ" />
	<Header text="If you need a quick answer, you might find it here!" />

	<Paragraph
		text="There's a lot of questions in FPV, doesn't matter if you're just starting or not<br>
        You will find most of the common and easy to answer ones here. For more specific ones, there are tutorials planned<br>
        The questions are sorted into individual categories, and next to each one there is a button that will copy a link to the specific one if you want to send it to someone.<br>
        Keep in mind that this site is still in the works. Info here should be mostly reliable, but some may be unfinished and/or buggy"
	/>

    <ul class="mt-8 text-2xl w-fit">
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/9550ba/plus--v1.png')]"
			color="hover:text-violet"
			text="Starting out"
			link="Starting"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/d6395b/plus--v1.png')]"
			color="hover:text-red"
			text="Building"
			link="Building"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/ffcc00/plus--v1.png')]"
			color="hover:text-yellow"
			text="Betaflight"
			link="Betaflight"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/87cc52/plus--v1.png')]"
			color="hover:text-green"
			text="Video"
			link="Video"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/5ad8e6/plus--v1.png')]"
			color="hover:text-cyan"
			text="Radio"
			link="Radio"
		/>
		<CategoryIndex
			icon="bg-[url('https://img.icons8.com/material-outlined/32/5a6fe6/plus--v1.png')]"
			color="hover:text-blue"
			text="Hardware"
			link="Hardware"
		/>
    </ul>

    {#each Object.entries(grouped_modules) as [cat, contents]}
    <div class="{cat} my-8 w-full h-fit text-justify">
			<div class="text-3xl tracking-tight border-b-2 w-fit px-1 cat {cat} pb-1" id={cat}>{cat}</div>
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

        <FaqQuestion 
					category={cat}
					title={question.metadata.title}
					content={marked.parse(question.metadata.answer)}
					id={question.metadata.id}
				/>
        {/each}
    </div>
    {/each}
</div>

<style>
    .img-closed { width: 50%}
    .img-open { width: 100%}
</style>
