<script>
  import "../app.css";
  import Nav from "../components/navbar/Nav.svelte";
</script>

<div class="max-w-full min-h-screen flex md:flex-row flex-col-reverse dark:bg-main-400 bg-contrast-100 text-main-200 dark:text-contrast-100 text-lg scroll-smooth">
  <Nav />
  <slot />
</div>
