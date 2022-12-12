const config = {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {
			colors: {
				primary: "#ffe000",
				"primary-dark": "#ffc800",
			},
			animation: {
				"spin-slow": "spin 3s linear infinite",
			},
			minWidth: {
				"25vw": "25vw",
				"50vw": "50vw",
			},
		},
	},

	plugins: [],
	darkMode: "class",
}

module.exports = config
