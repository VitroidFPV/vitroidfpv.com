{#each Object.entries(grouped_modules) as [cat, contents]}
    <div class={cat}>
        {#each contents as question}
        <details>
            <summary class="{cat}">{question.metadata.title}</summary>
            <div>{question.metadata.answer}</div>
        </details>
        {/each}
    </div>
{/each}

<script>
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
</script>