
<div class="w-1/3">
    <button type="button" class="collapsible duration-300 after:ml-1 {category}">{title}</button>
    <div class="content">
      <p>{content}</p>
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