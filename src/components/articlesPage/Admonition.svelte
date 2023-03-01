<script lang="ts">
	export let type: "note" | "caution" | "danger" | "info" | "tip" = "note";
	export let title: string = ""

	const icons = {
		note: 
		`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
			<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
		</svg>`,
		caution:
		`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
 			<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
		</svg>`,
		danger:
		`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
			<path stroke-linecap="round" stroke-linejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
		</svg>`,
		info:
		`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
		</svg>`,
		tip:
		`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-8 h-8">
			<path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
		</svg>`
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

<div class="{color["bg-transparent"]} {color.outline} outline outline-2  rounded-2xl overflow-clip my-2">
	<div class="{color.bg} w-fit p-2 pr-4 rounded-br-2xl flex items-center text-main-300">
		<div class="mr-2">{@html icon}</div>
		{title}
	</div>
	<div class="flex flex-col p-4">
		<slot />
	</div>
</div>