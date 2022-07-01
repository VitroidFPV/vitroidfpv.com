<script>
  import "../app.css";
  import { page } from "$app/stores"
  import Nav from "../components/navbar/Nav.svelte";
  import Footer from "../components/navbar/Footer.svelte";
  // @ts-ignore
  import Transition from "/src/components/Transition.svelte";
  import { onMount } from 'svelte';

  let ready = false;
  onMount(() => ready = true);
</script>

<!-- {#if ready} -->
  <div class:hidden={!ready} class="dark:bg-main-400 bg-contrast-100 text-main-200 dark:text-contrast-100 text-lg scroll-smooth">
    <div class="flex md:flex-row flex-col-reverse h-fit overflow-visible">
      <Nav segment={$page.url.pathname}/>
      <Transition refresh={$page.url.pathname}>
        <slot />
      </Transition>
    </div>
    <Footer />
  </div>
<!-- {/if} -->