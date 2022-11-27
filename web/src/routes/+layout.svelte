<script>
	import "../app.postcss"
	import Header from "./Header.svelte"
	import Sidebar from "./Sidebar.svelte"
	import "./styles.css"
</script>

<div class="app">
	<div class="main-header">
		<Header />
	</div>
	<div class="sidebar">
		<Sidebar />
	</div>

	<main class="app-main">
		<slot />
	</main>
</div>

<style lang="scss">
	$header-height: 108px;
	$sidebar-width: 275px;
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		.main-header {
			height: $header-height;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 99;
		}
		.sidebar {
			width: $sidebar-width;
			margin-top: $header-height;
			background-color: #f9fafb;
			-webkit-transition: all 300ms 0s ease-in-out;
			transition: all 300ms 0s ease-in-out;
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			z-index: 11;
			padding-bottom: 30px;
			overflow: hidden;
			border-right-width: 1px;
		}
	}

	@media (min-width: 1200px) {
		main {
			margin-top: $header-height;
			margin-left: $sidebar-width;
		}
	}
	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 12px;
	}

	footer a {
		font-weight: bold;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
