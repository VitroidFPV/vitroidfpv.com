{#each Object.entries(grouped_modules) as [cat, contents]}
<div class="{cat} bg-emerald-200 my-8">
    {#each contents as question}
    <div class="w-1/3">
        <button type="button" class="collapsible duration-300 after:ml-1 {cat}">{question.metadata.title}</button>
        <div class="content">
            <p>{question.metadata.answer}</p>
        </div>
    </div>
    {/each}
</div>
{/each}

<style>
    .content {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.2s ease-out;
    }
</style>

<script>
    import { onMount } from 'svelte';

    console.log("===========");
    const modules = import.meta.globEager("/faq/*.md");
    // console.log(modules)
    let grouped_modules = {};

    for (const k in modules) {
        const cat = modules[k].metadata.Category;
        if (grouped_modules[cat]) {
        grouped_modules[cat].push(modules[k]);
        } else {
        grouped_modules[cat] = [modules[k]]
        }
    }
        
    console.log(grouped_modules)

    onMount(() =>{
        var coll = document.getElementsByClassName("collapsible");
        var i;

        for (i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function() {
            this.classList.toggle("faq-active");
            var content = this.nextElementSibling;
            if (content.style.maxHeight){
            content.style.maxHeight = null;
            } else {
            content.style.maxHeight = content.scrollHeight + "px";
            } 
        });
        }
    })
</script>