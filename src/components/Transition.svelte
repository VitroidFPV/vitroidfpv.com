<script>
    import { fly } from 'svelte/transition';
    export let refresh = '';
  </script>
  
  {#key refresh}
    <div
        in:fly="{{ x: -10, duration: 500}}"
      >
      <slot/>
    </div>
  {/key}