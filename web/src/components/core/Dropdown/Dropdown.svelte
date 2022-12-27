<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { createPopperActions } from "../utils/popper"
	import { portal } from "svelte-portal"
	import { MenuList, MenuItem } from "../Menu/"
	import Icon from "../Icon/Icon.svelte"

	const dispatch = createEventDispatcher()
	const [popperRef, popperContent] = createPopperActions({
		placement: "bottom",
		strategy: "fixed",
	})
	type IDropdownOption = {
		name: string
		value: string
		icon?: string
		type?: string
		onClick?: Function
	}

	const isBrowser = !import.meta.env.SSR
	export let options: IDropdownOption[] = []
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

	function handleClickOption(option: IDropdownOption) {
		toggleOpen(false)
		if (option.onClick) {
			option.onClick()
		}
		dispatch("click-item", option)
	}
</script>

<div use:popperRef on:click={() => toggleOpen(true)} bind:this={triggerEle}>
	<slot name="trigger" />
</div>
{#if showTooltip}
	<div
		bind:this={contentEle}
		id="tooltip"
		class="dark:bg-slate-800 dark:text-white rounded-sm overflow-hidden shadow p-1.5 max-w-xs"
		use:portal={target}
		use:popperContent={extraOpts}
	>
		<MenuList>
			{#each options as option}
				{#if option.type === "text"}
					<div class="text-xs px-2 py-1">{option.name}</div>
				{:else}
					<MenuItem class="font-medium flex items-center truncate" on:click={() => handleClickOption(option)}>
						{#if option.icon}
							<Icon class="dark:fill-white mr-1.5" name={option.icon} />
						{/if}
						<span>{option.name}</span>
					</MenuItem>
				{/if}
			{/each}
		</MenuList>
	</div>
{/if}

<style>
	#tooltip {
		z-index: 999;
	}
</style>
