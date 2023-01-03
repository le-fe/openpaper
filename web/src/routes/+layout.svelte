<script>
	import Header from "../components/AppHeader.svelte"
	import Sidebar from "../components/AppSidebar.svelte"
	import { browser } from "$app/environment"
	import "$lib/i18n"
	import { locale, waitLocale } from "svelte-i18n"
	import { onMount } from "svelte"
	import { SvelteToast } from "../components/core/Toast"
	import { Modals, closeModal } from "@components"
	import { fade } from "svelte/transition"

	import "../app.postcss"
	import "./styles.css"
	import "../static/tiny-slider.css"
	import "../static/editor.scss"

	let isLoaded = false

	onMount(async () => {
		if (browser) {
			locale.set(window.navigator.language)
		}
		await waitLocale()
		isLoaded = true
	})
</script>

<div class="app">
	{#if isLoaded}
		<div class="main-header bg-white dark:bg-gray-800 dark:text-white">
			<Header />
		</div>
		<div class="sidebar bg-white dark:bg-gray-800 dark:text-white">
			<Sidebar />
		</div>

		<main class="app-main bg-white dark:bg-gray-600 dark:text-white">
			<slot />
		</main>
		<SvelteToast
			options={{
				theme: {
					"--toastBarHeight": 0,
				},
			}}
		/>
		<Modals>
			<div slot="backdrop" class="backdrop" transition:fade on:click={closeModal} />
		</Modals>
	{/if}
	<div class="hidden">
		<span class="p-2" />
		<span class="p-3" />
		<span class="p-4" />
		<span class="p-5" />
	</div>
</div>

<style lang="scss">
	$sidebar-width: 75px;
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
		.main-header {
			height: var(--header-height);
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 99;
		}
		.sidebar {
			width: $sidebar-width;
			margin-top: var(--header-height);
			-webkit-transition: all 300ms 0s ease-in-out;
			transition: all 300ms 0s ease-in-out;
			position: fixed;
			top: 0;
			left: 0;
			height: 100%;
			z-index: 11;
			padding-bottom: 30px;
			overflow: hidden;
		}
	}

	.backdrop {
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		background: rgba(0, 0, 0, 0.5);
	}

	@media (min-width: 1200px) {
		main {
			margin-top: var(--header-height);
			margin-left: $sidebar-width;
			min-height: calc(100vh - var(--header-height));
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
