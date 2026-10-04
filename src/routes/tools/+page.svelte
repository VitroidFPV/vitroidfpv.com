<script lang="ts">
	import ContentPage from "$components/content/ContentPage.svelte"
	import PageContent, { metadata } from "$content/pages/tools.svx"

	import MotorSize from "$components/tools/MotorSize/MotorSize.svelte"
	import PowerConversion from "$components/tools/PowerConversion/PowerConversion.svelte"
	import BatteryWh from "$components/tools/BatteryWh/BatteryWh.svelte"
</script>

<ContentPage
	{metadata}
	source="src/content/pages/tools.svx"
	Content={PageContent}
>
	<div
		class="grid grid-cols-1 gap-4 px-2 pb-8 lg:grid-cols-2 lg:px-4 xl:grid-cols-3 xl:px-8"
	>
		<MotorSize />
		<PowerConversion />
		<BatteryWh />
	</div>
</ContentPage>
