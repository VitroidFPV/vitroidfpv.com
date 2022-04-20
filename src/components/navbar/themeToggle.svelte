<script>
  import { writable } from 'svelte/store';
  import { persist, localStorage } from '@macfja/svelte-persistent-store';
  import { onMount } from 'svelte';

  const theme = persist(writable('light'), localStorage(), 'app-theme');

  onMount(() => {
    let unsubscribe = theme.subscribe((value) => {
      if (value === "dark") { window.document.body.classList.add("dark"); }
      else { window.document.body.classList.remove("dark"); }
    });

    return () => {
      unsubscribe()
    }
  });
</script>

<button on:click={() => $theme = ($theme == 'dark' ? 'light' : 'dark')} class="absolute right-[5px] top-[8px] md:relative m-0 md:mt-auto bg-contain bg-no-repeat justify-self-end mb-4 h-16 w-16 bg-[url('https://img.icons8.com/material-outlined/64/a1a1a1/sun--v1.png')] md:scale-75 scale-50 dark:bg-[url('https://img.icons8.com/material-outlined/64/a1a1a1/moon--v1.png')]">
</button>