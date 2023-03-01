<script context="module" lang="ts">
  import { writable, type Writable } from "svelte/store";

  export interface TabCtxType {
    selected: Writable<HTMLElement>;
  }
</script>

<script lang="ts">
  import { setContext } from "svelte";

  const ctx: TabCtxType = {
    selected: writable<HTMLElement>()
  };

  setContext("ctx", ctx);

  function init(node: HTMLElement) {
    const destroy = ctx.selected.subscribe((x: HTMLElement) => {
      if (x) node.replaceChildren(x);
    });

    return { destroy };
  }
</script>

<ul class="flex !list-none">
  <slot />
</ul>
<div role="tabpanel" aria-labelledby="id-tab" use:init />