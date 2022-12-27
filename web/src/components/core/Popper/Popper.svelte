<script lang="ts">
	import { createPopperActions } from "./popper"
	import { portal } from "svelte-portal"

	const [popperRef, popperContent] = createPopperActions({
		placement: "bottom",
		strategy: "fixed",
	})

	const isBrowser = !import.meta.env.SSR
	export let target: string | HTMLElement = isBrowser ? (document.scrollingElement as HTMLElement) : "body"
	let triggerEle: HTMLElement, contentEle: HTMLElement
	let showTooltip = false

	const extraOpts = {
		modifiers: [
			{ name: "offset", options: { offset: [0, 8] } },
			{
				name: "preventOverflow",
				options: {
					padding: 8,
				},
			},
		],
	}

	function watchOpened(value: boolean) {
		if (value) {
			document.addEventListener("click", listenClickDocument)
		} else {
			document.removeEventListener("click", listenClickDocument)
		}
	}
	$: watchOpened(showTooltip)

	function listenClickDocument(e) {
		e = e || window.event
		var target = e.target || e.srcElement
		if (triggerEle && contentEle) {
			if (!triggerEle.contains(target) && !contentEle.contains(target)) {
				toggleOpen(false)
			}
		}
	}

	function toggleOpen(value: boolean) {
		showTooltip = value
	}
</script>

<div use:popperRef on:click={() => toggleOpen(true)} bind:this={triggerEle}>
	<slot name="trigger" />
</div>
{#if showTooltip}
	<div
		bind:this={contentEle}
		id="tooltip"
		class="dark:bg-slate-800 dark:text-white rounded-sm overflow-hidden shadow p-1.5"
		use:portal={target}
		use:popperContent={extraOpts}
	>
		<slot name="content" />
	</div>
{/if}

<style>
	#tooltip {
		z-index: 999;
	}
</style>
