<script lang="ts">
	export let cols: number = 2;

	let classes: string = "";

	switch (cols) {
		case 2:
			classes = "grid-cols-2";
			break;
		case 3:
			classes = "grid-cols-3";
			break;
		case 4:
			classes = "grid-cols-4";
			break;
		default:
			classes = "grid-cols-2";
			break;
	}
</script>

<div class="grid {classes} gap-4 img-grid items-center justify-center">
	<slot />
</div>