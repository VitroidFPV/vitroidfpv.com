module.exports = {
	darkMode: "class",
	content: ["./src/**/*.{html,js,svelte,tsx}"],
	safelist: [
		{
			pattern: /(bg|text|stroke)-(highlight|highlight-dark|pink|red|orange|yellow|green|cyan|blue|violet)/,
			variants: ["dark", "group-first-of-type/tooltip", "dark:group-first-of-type/tooltip", "peer-checked", "group-hover"]
		}
	],
	theme: {
		extend: {
			fontFamily: {
				"reem-kufi": ["Reem Kufi", "sans-serif"],
				"caveat": ["Caveat-Bold"],
			},
			colors: {
				highlight: "#90d95b",
				"highlight-dark": "#2ad162",
				pink: "#d1288d",
				red: "#d6395b",
				orange: "#ff9742",
				yellow: "#ffcc00",
				green: "#87cc52",
				cyan: "#5ad8e6",
				blue: "#5a6fe6",
				violet: "#9550ba",
				main: {
					50: "#657280",
					100: "#3d454d",
					200: "#292929",
					300: "#141414",
					400: "#0f0f0f"
				},
				contrast: {
					50: "#f7f7f7",
					100: "#eeeeee",
					200: "#e2e2e2",
					300: "#e0e0e0",
					400: "#cccccc",
					500: "#adadad"
				}
			},
			backgroundSize: {
				"0w": "0% 3px",
				"100w": "100% 3px"
			},
			backgroundImage: {
				"grid-dark": "url(/uploads/grid-dark.svg)",
				"grid-light": "url(/uploads/grid-light.svg)"
			},
			screens: {
				"3xl": "2000px"
			}
		}
	},
	plugins: []
};
