<script lang="ts">
	export let type: "note" | "caution" | "danger" | "info" | "tip" = "note";
	export let title: string = "";

	import { Icon } from "@steeze-ui/svelte-icon";
	import { InformationCircle, ExclamationTriangle, Fire, ExclamationCircle, LightBulb } from "@steeze-ui/heroicons";

	const icons = {
		note: InformationCircle,
		caution: ExclamationTriangle,
		danger: Fire,
		info: ExclamationCircle,
		tip: LightBulb
	}

	const colors = {
		note: {
			bg: "bg-yellow",
			"bg-transparent": "bg-yellow/10",
			outline: "outline-yellow"
		},
		caution: {
			bg: "bg-orange",
			"bg-transparent": "bg-orange/10",
			outline: "outline-orange"
		},
		danger: {
			bg: "bg-red",
			"bg-transparent": "bg-red/10",
			outline: "outline-red"
		},
		info: {
			bg: "bg-cyan",
			"bg-transparent": "bg-cyan/10",
			outline: "outline-cyan"
		},
		tip: {
			bg: "bg-green",
			"bg-transparent": "bg-green/10",
			outline: "outline-green"
		}
	}

	const titles = {
		note: "Note",
		caution: "Caution",
		danger: "Danger",
		info: "Info",
		tip: "Tip"
	}

	// if no title is provided, use the title responding to the type
	if (!title && titles.hasOwnProperty(type)) {
		title = titles[type]
	}

	let color = colors[type]
	// console.log(color)

	let icon = icons[type]

</script>

<div class="admonition type-{type} {color["bg-transparent"]} {color.outline} outline outline-2  rounded-2xl overflow-clip my-2">
	<div class="{color.bg} w-fit p-2 pr-4 rounded-br-2xl flex items-center text-main-300">
		<Icon class="w-8 h-8 mr-2" src={icon} />
		{title}
	</div>
	<div class="flex flex-col p-4">
		<slot />
	</div>
</div>