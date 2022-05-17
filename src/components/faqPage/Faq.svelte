<div class="w-full">
  <div class="md:w-[48rem] tracking-normal text-main-200 dark:text-contrast-100 border-none">
      <div on:click={copyID} class="inline-flex text-3xl translate-y-0.5 text-black dark:text-white opacity-10 hover:opacity-30 duration-300 cursor-pointer copy-id">#</div>
      <button type="button" class="collapsible duration-300 after:ml-1 text-[22px] max-w-fit hover:translate-x-1 duartion-150 {category}" id="{id}">{title}</button>
      <div class="content text-xl bg-contrast-200 dark:bg-main-300 rounded-2xl shadow-xl dark:shadow-black mb-2">
          <p class="m-8 text-lg leading-relaxed">{@html content}</p>
      </div>
  </div>
</div>

<style>
    .content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
    }
</style>

<script>
    export let title;
    export let content;
    export let category;
    export let id = "";
    import { onMount } from 'svelte';

    function open() {
      // give a class "open" to an element with the class content with the id of the variable hash
      let hash = window.location.hash
      console.log(hash)

    }

    function copyID() {
      // on call, get the id of its first following sibling and put it in the clipboard
      let id = this.nextElementSibling.id;
      console.log(id)
      navigator.clipboard.writeText("localhost:3000/faq/#" + id);
    }
</script>