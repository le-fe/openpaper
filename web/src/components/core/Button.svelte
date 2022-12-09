<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Icon from "./Icon/Icon.svelte"

	export let type: string = "default"
	export let size: string = "default"
	export let icon: string = ""
	export let circle: boolean = false
	export let loading: boolean = false

	const mappingTypeClass = {
		default:
			"text-white fill-white bg-gray-700 hover:bg-gray-800 focus:ring-4 font-medium text-sm dark:bg-gray-600 dark:hover:bg-gray-800 dark:focus:ring-gray-800 border dark:border-slate-500",
		primary:
			"text-black fill-black bg-primary hover:bg-primary-dark focus:ring-4 font-medium text-sm dark:bg-primary-dark dark:hover:bg-primary",
	}

	const paddingHeightSize = {
		xl: 1.5,
		lg: 1.25,
		default: 2,
		sm: 1,
		xs: 0.5,
	}

	const mappingSizeClass = {
		default: `px-4 py-${paddingHeightSize.default}`,
		sm: `px-2 py-${paddingHeightSize.sm}`,
	}

	const dispatch = createEventDispatcher()
	/**
	 * Button click handler
	 */
	function onClick(event) {
		dispatch("click", event)
	}

	$: className = generateClassName()

	function generateClassName() {
		let cls = ["inline-flex items-center transition-colors", mappingTypeClass[type] || mappingTypeClass.default, $$props.class]
		if (circle) {
			cls.push("rounded-full")
		} else {
			cls.push("rounded-lg")
		}
		if (icon && !$$slots.default) {
			cls.push(`p-${paddingHeightSize[size] || paddingHeightSize.default}`)
		} else {
			cls.push(mappingSizeClass[size] || mappingSizeClass.default)
		}
		return cls.join(" ")
	}
</script>

<button
	type="button"
	class={["c-button focus:outline-none", className, loading ? "opacity-50 pointer-events-none" : ""].filter(Boolean).join(" ")}
	on:click={onClick}
>
	{#if icon && !loading}
		<Icon class="c-icon" name={icon} />
	{/if}
	{#if loading}
		<Icon class="c-icon animate-spin-slow" name="loading" />
	{/if}
	{#if $$slots.default}
		<span class={icon ? "ml-1.5" : ""}><slot /></span>
	{/if}
</button>
