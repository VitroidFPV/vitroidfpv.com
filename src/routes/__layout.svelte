<script>
  import "../app.css";
  import Nav from "../components/navbar/Nav.svelte";
  import Footer from "../components/navbar/Footer.svelte";
</script>

<div class="flex flex-col dark:bg-main-400 bg-contrast-100 text-main-200 dark:text-contrast-100 text-lg scroll-smooth ">
  <div class="flex md:flex-row flex-col-reverse h-fit overflow-visible">
    <Nav />
    <slot />
  </div>
  <Footer />
</div>
