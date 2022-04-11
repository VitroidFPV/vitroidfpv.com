<script>
    import Faq from "../components/faqPage/Faq.svelte";
    import Header from "../components/Header.svelte";
    import { onMount } from 'svelte';
    import MainHeader from "../components/mainHeader.svelte";
    import CategoryIndex from "../components/faqPage/categoryIndex.svelte";

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

<div class="w-full min-h-screen m-8 flex flex-col">
    <MainHeader text="FAQ"/>
    <Header text="If you need a quick answer, there's a good chance you'll find it here!"></Header>
    <p class="leading-normal">There's a lot of questions in FPV, doesn't matter if you're just starting or not<br>
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
    <Faq category="violet" title="aaa" content="Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."/>
    <Faq category="red" title="aaa" content="bbb"/>
</div>