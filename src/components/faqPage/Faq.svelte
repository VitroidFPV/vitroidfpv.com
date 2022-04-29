<div class="w-full">
  <div class="md:w-[38rem] tracking-normal text-main-200 dark:text-contrast-100 border-none">
      <div class="inline-flex text-3xl translate-y-0.5 text-black dark:text-white opacity-10 hover:opacity-30 duration-300 cursor-pointer copy-id">#</div>
      <button type="button" class="collapsible duration-300 after:ml-1 text-[22px] max-w-fit hover:translate-x-1 duartion-150 {category}">{title}</button>
      <div class="content text-xl bg-contrast-200 dark:bg-main-300 rounded-2xl shadow-xl dark:shadow-black mb-2">
          <p class="m-4">{@html content}</p>
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
</script>