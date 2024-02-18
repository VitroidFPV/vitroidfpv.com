<script lang="ts">
	import { Bar } from "svelte-chartjs";
	import ChartDataLabels from "chartjs-plugin-datalabels";
	import { theme } from "$lib/stores/themeStore"

	// {label: data, label: data, label: data,...}
	export let incomingData: { [x: string]: number; };

	let labels = Object.keys(incomingData);
	let values = Object.values(incomingData);	

	let textColor = $theme === "dark" ? "rgba(247, 247, 247, 1)" : "rgba(41, 41, 41, 1)";
	$: textColor = $theme === "dark" ? "rgba(247, 247, 247, 1)" : "rgba(41, 41, 41, 1)";

	let lineColor = $theme === "dark" ? "rgba(247, 247, 247, 0.05)" : "rgba(41, 41, 41, 0.05)";
	$: lineColor = $theme === "dark" ? "rgba(247, 247, 247, 0.05)" : "rgba(41, 41, 41, 0.05)";

	import {
		Chart,
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale,
	} from "chart.js";

	Chart.register(
		Title,
		Tooltip,
		Legend,
		BarElement,
		CategoryScale,
		LinearScale
	);

    Chart.register(ChartDataLabels);

	const data = {
		labels: labels,
		datasets: [
			{
				axis: "y",
				label: "CoreMark Score",
				data: values,
				backgroundColor: [
					"rgba(214, 57, 91, 0.2)",
					"rgba(255, 151, 66, 0.2)",
					"rgba(255, 204, 0, 0.2)",
					"rgba(135, 204, 82, 0.2)",
					"rgba(90, 216, 230, 0.2)",
					"rgba(90, 116, 230, 0.2)",
					"rgba(145, 80, 186, 0.2)"
				],
				borderColor: [
					"rgba(214, 57, 91, 1)",
					"rgba(255, 151, 66, 1)",
					"rgba(255, 204, 0, 1)",
					"rgba(135, 204, 82, 1)",
					"rgba(90, 216, 230, 1)",
					"rgba(90, 116, 230, 1)",
					"rgba(145, 80, 186, 1)"
				],
				borderWidth: 1.5,
				borderRadius: 8,
				borderSkipped: false,
				barThickness: "flex",
			}
		]
	}

	let options = {
		responsive: true,
		maintainAspectRatio: false,
		indexAxis: "y",
		plugins: {
			datalabels: {
                color: textColor,
                display: function(context: { dataset: { data: { [x: string]: number; }; }; dataIndex: string | number; }) {
                    return context.dataset.data[context.dataIndex] > 15;
                },
                formatter: Math.round,
				align: "end",
				anchor: "end",
				font: {
					family: "Reem Kufi",
					size: 14,
					weight: 500
				}
            },
			legend: {
				display: false,
			},
			title: {
				display: true,
				text: "CoreMark Score",
				color: textColor,
				font: {
					family: "Reem Kufi",
					size: 20,
					weight: 500
				}
			},
		},
		scales: {
			x: {
				ticks: {
					color: textColor,
					font: {
						family: "Reem Kufi",
						size: 14
					}
				},
				grid: {
					color: lineColor,
					lineWidth: 2
				}
			},
			y: {
				ticks: {
					color: textColor,
					font: {
						family: "Reem Kufi",
						size: 14
					}
				},
				grid: {
					color: "transparent"
				}
			}
		},
	}

	// I don't think this should be necessary, but it is...?
	$: options.plugins.title.color = textColor;
	$: options.scales.x.ticks.color = textColor;
	$: options.scales.y.ticks.color = textColor;
	$: options.plugins.datalabels.color = textColor;

	$: options.scales.x.grid.color = lineColor;

</script>

<div class="h-96 w-full">
	<Bar {data} {options} />
</div>
