<script>
    import ThemeToggle from "./themeToggle.svelte";
    import { page } from "$app/stores"
</script>

<nav class="md:w-fit bottom-0 md:h-screen w-screen h-24 test-nav flex items-center border-highlight dark:border-highlight-dark md:border-r-8 md:border-t-0 border-t-[14px] fixed z-50 bg-contrast-100 dark:bg-main-400 md:shadow-2xl shadow-[0px_-25px_50px_-12px] shadow-black/30 dark:shadow-black/60">
    <ul class="md:mt-8 md:pl-4 flex md:flex-col flex-row md:justify-start justify-between h-full md:px-0 px-20 w-full">
        <!-- svelte-ignore a11y-missing-content -->
        <li class="nav" class:nav-active={$page.url.pathname === "/"}><a href="/" class="bg-[url('https://img.icons8.com/metro/36/292e33/home.png')] md:bg-none md:dark:bg-none bg-no-repeat bg-center text-lg md:after:content-['Home'] h-full w-full md:h-fit md:w-fit"> </a></li>
        <li class="nav" class:nav-active={$page.url.pathname === "/faq"}><a href="/faq" class="bg-[url('https://img.icons8.com/material-rounded/36/292e33/question-mark.png')] md:bg-none md:dark:bg-none bg-no-repeat bg-center text-lg md:after:content-['FAQ'] h-full w-full md:h-fit md:w-fit"> </a></li>
        <li class="nav" class:nav-active={$page.url.pathname === "/builds"}><a href="/builds" class="bg-[url('https://i.imgur.com/rbaaSaJ.png')] md:bg-none md:dark:bg-none bg-no-repeat bg-center text-lg md:after:content-['Builds'] h-full w-full md:h-fit md:w-fit"> </a></li>
    </ul>
    <ThemeToggle />
</nav>
<div class="md:h-full md:w-[165px] w-full h-[126px]"></div>