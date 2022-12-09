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
		},
	},

	plugins: [],
	darkMode: "class",
}

module.exports = config
