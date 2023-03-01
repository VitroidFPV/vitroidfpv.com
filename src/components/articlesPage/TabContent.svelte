<script>
  import { setContext } from 'svelte'
	
  setContext('tabContent', true)	
</script>

<div>
	<slot />
</div>