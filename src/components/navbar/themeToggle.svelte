<script>
    function toggle() {
        window.document.body.classList.toggle("dark")
    }
</script>

<button on:click={toggle} class="h-16 w-16 bg-[url('https://img.icons8.com/material-outlined/64/a1a1a1/sun--v1.png')] scale-75 dark:bg-[url('https://img.icons8.com/material-outlined/64/a1a1a1/moon--v1.png')]">
        <slot/>
</button>