<script>
    let open = false
    export let title;
    export let content;
    export let category;
    export let id = "";
    import { onMount } from 'svelte';
    import { slide } from 'svelte/transition';
    import { page } from "$app/stores"

    onMount(() => {
        linkOpen()
      }
    )
    
    function linkOpen() {
      let hash = $page.url.hash.replace("#", "");
      if (hash != "") {
        if (hash == id) {
          open = true
        }
        location.href = "#" + hash;
        // document.querySelector("#" + hash).scrollIntoView({behavior: 'smooth'});
      }
    }

    function copyID() {
      let id = this.nextElementSibling.id;
      console.log(id)
      navigator.clipboard.writeText($page.url.origin + $page.url.pathname + "#" + id);
    }
    console.log()
</script>

<div class="tracking-normal text-main-200 dark:text-contrast-100 border-none flex flex-col mt-2">
    <div class="flex align-start">
      <div on:click={copyID} class="text-3xl text-black dark:text-white opacity-10 hover:opacity-30 duration-300 
      cursor-pointer copy-id mr-2">#</div>
      <button type="button" on:click={() => open = !open} class:faq-active={open} class="collapsible duration-300 
        after:ml-1 text-[20px] hover:translate-x-1 duartion-150 {category} text-left" id="{id}">{title}</button>
    </div>
    {#if open}
      <div transition:slide class="content text-xl bg-contrast-100 dark:bg-main-300 rounded-2xl shadow-2xl
        dark:shadow-black mb-2 h-full min-w-fit max-w-[70vw]">
          <p class="md:p-8 p-6 text-base leading-relaxed md">{@html content}</p>
      </div>
    {/if}
</div>