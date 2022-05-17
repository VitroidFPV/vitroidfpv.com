<script>
    import ThemeToggle from "./themeToggle.svelte";
    import { page } from "$app/stores"
</script>

<nav class="md:w-fit bottom-0 md:h-screen w-screen h-24 test-nav md:justify-start flex md:flex-col flex-row md:items-center border-highlight dark:border-highlight-dark md:border-r-8 md:border-t-0 border-t-[15px] fixed z-50 bg-contrast-100 dark:bg-main-400 md:shadow-2xl shadow-[0px_-25px_50px_-12px] shadow-black/30 dark:shadow-black/60">
    <ul class="md:mt-8 md:pl-4 flex md:flex-col flex-row md:justify-start test-li justify-center h-fit md:px-0 w-full -translate-y-[1px] text-main-100 dark:text-contrast-100">
        <!-- svelte-ignore a11y-missing-content -->
        <li class="nav" class:nav-active={$page.url.pathname === "/"}>
            <a 
            href="/" 
            class="bg-[url('https://img.icons8.com/metro/64/292e33/home.png')] translate-y-[-2px] z-50 md:bg-none md:dark:bg-none bg-no-repeat bg-center text-lg md:after:content-['Home'] h-full w-full md:h-fit md:w-fit bg-[length:32px_32px] hover:text-highlight dark:hover:text-highlight-dark duration-200 md:hover:translate-x-1">
            </a>
        </li>
        <li class="nav" class:nav-active={$page.url.pathname === "/faq"}>
            <a 
            href="/faq" 
            class="bg-[url('https://img.icons8.com/material-rounded/64/292e33/question-mark.png')] md:bg-none md:dark:bg-none bg-no-repeat bg-center text-lg md:after:content-['FAQ'] h-full w-full md:h-fit md:w-fit bg-[length:32px_32px] hover:text-highlight dark:hover:text-highlight-dark duration-200 md:hover:translate-x-1"> 
            </a>
        </li>
        <li class="nav" class:nav-active={$page.url.pathname.startsWith("/builds")}>
            <a 
            href="/builds" 
            class="bg-[url('https://i.imgur.com/rbaaSaJ.png')] md:bg-none md:dark:bg-none bg-no-repeat bg-center text-lg md:after:content-['Builds'] h-full w-full md:h-fit md:w-fit bg-[length:32px_32px] hover:text-highlight dark:hover:text-highlight-dark duration-200 md:hover:translate-x-1"> 
            </a>
        </li>
        <!-- <li class="nav" class:nav-active={$page.url.pathname === "/tools/battery"}>
            <a 
            href="/tools/battery" 
            class="bg-[url('https://img.icons8.com/material-rounded/64/292e33/medium-battery.png')] md:bg-none md:dark:bg-none bg-no-repeat bg-center text-lg md:after:content-['Battery'] h-full w-full md:h-fit md:w-fit bg-[length:32px_32px] hover:text-highlight dark:hover:text-highlight-dark duration-200 hover:translate-x-1"> 
            </a>
        </li> -->
        <li class="nav" class:nav-active={$page.url.pathname.startsWith("/equipment")}>
            <a 
            href="/equipment" 
            class="bg-[url('https://img.icons8.com/external-smashingstocks-detailed-outline-smashing-stocks/66/292e33/external-tools-car-repair-smashingstocks-detailed-outline-smashing-stocks.png')] md:bg-none md:dark:bg-none bg-no-repeat bg-center text-lg md:after:content-['Equipment'] h-full w-full md:h-fit md:w-fit bg-[length:32px_32px] hover:text-highlight dark:hover:text-highlight-dark duration-200 md:hover:translate-x-1"> 
            </a>
    </ul>
    <ThemeToggle />
</nav>
<div class="md:h-screen md:min-w-[151px] md:max-w-[152px] w-full h-[64px]"></div>