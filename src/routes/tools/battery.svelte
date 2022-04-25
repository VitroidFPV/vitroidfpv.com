<div class="w-full p-4 flex flex-col">

    <div class="flex justify-around mb-8 batteryShow w-full">

        <div class="battery flex">

            <div class="batteryWires flex flex-col items-end justify-center">
                <div class="xt flex flex-row items-center mt-4" class:hidden={cells == 1}>
                    <div class="xtConnetor h-20 w-12 bg-yellow"></div>
                    <div class="flex xtWires w-fit h-16 flex-col justify-between">
                        <div class="h-4 w-32 bg-red"></div>
                        <div class="h-4 w-32 bg-main-100"></div>
                    </div>
                </div>
                <div class="balance flex flex-row mt-4">
                    <ul class="text-xs flex flex-col justify-around h-full pl-1 pt-5">
                        {#each {length: cells} as _, i}
                            <li class="text-right mr-1">{(voltage * (i + 1)).toFixed(1)}v</li>
                        {/each}
                    </ul>
                    <div class="balConnector min-h-1 w-8 bg-contrast-400"></div>

                    <div class="balWires flex flex-col justify-between h-fit">
                        <div class="h-2 my-1 w-36 bg-red place-center text-xs text-center align-middle"></div>
                        {#each {length: cells} as _, index(index)}
                        <div class="h-2 my-1 w-36 bg-main-100 text-sm -pl-4"></div>
                        {/each}
                    </div>

                </div>
            </div>

            <div class="batteryShell h-64 max-h-fit w-96 p-2 dark:bg-main-300 flex flex-col bg-contrast-200 rounded-3xl border-8 dark:border-main-200 border-contrast-400">
                {#each { 
                // @ts-ignore
                length: cells} as _, i}
                    <div class="bg-contrast-400 w-full h-full my-1 rounded-3xl pl-4 flex items-center">Cell {i+1}</div>
                {/each}
            </div>
        </div>
    </div>
    <div class="flex">
        
        <RangeSlider bind:values={cells} range="min" step={1} min={1} max={6} pips first='label' last='label' suffix="s" id="sliderCell" float/>
        <RangeSlider bind:values={voltage} range="min" step={0.1} min={3} max={4.4} pips first='label' last='label' suffix="v" id="sliderCell" float/>
        <div class="flex flex-col">
            <p>Cells: {cells}</p>
            <p>Voltage: {voltage}</p>
        </div>
    </div>
</div>

<script>
// @ts-nocheck

	let cells = [4];
    let voltage = [4.2]
    import RangeSlider from "svelte-range-slider-pips";
</script>