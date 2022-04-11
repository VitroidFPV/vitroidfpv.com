<script>
    import ThemeToggle from "./themeToggle.svelte";
</script>

<nav class="w-fit h-screen test-nav flex md:flex-col flex-row items-center border-highlight dark:border-highlight-dark border-r-8 fixed z-50 bg-contrast-100 dark:bg-main-400 shadow-2xl shadow-black/30 dark:shadow-black/60">
    <ul class="mt-8 pl-4">
        <li class="nav-active"><a href="/" class="h-fit text-lg">Home</a></li>
        <li class="nav"><a href="/faq" class="h-fit text-lg">FAQ</a></li>
        <ThemeToggle />
    </ul>
</nav>
<div class="h-full w-[165px]"></div>