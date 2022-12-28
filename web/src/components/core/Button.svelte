<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Icon from "./Icon/Icon.svelte"
	import { ClassBuilder } from "./utils"

	const classesDefault = "inline-flex items-center justify-center transition-colors"
	const cb = new ClassBuilder("", classesDefault)
	export let type: string = "default"
	export let size: string = "default"
	export let icon: string = ""
	export let circle: boolean = false
	export let loading: boolean = false
	export let disabled: boolean = false

	const mappingTypeClass = {
		default:
			"text-white fill-white bg-gray-700 hover:bg-gray-800 font-medium text-sm dark:bg-gray-600 dark:hover:bg-gray-800 border dark:border-slate-500",
		primary:
			"text-black fill-black bg-primary hover:bg-primary-dark font-medium text-sm dark:bg-primary-dark dark:hover:bg-primary",
		success: "text-white fill-white bg-green hover:bg-green-700 font-medium text-sm dark:bg-green-700 dark:hover:bg-green-600",
		danger: "text-white fill-white bg-red hover:bg-red-700 font-medium text-sm dark:bg-red-700 dark:hover:bg-red-600",
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

	$: className = cb
		.flush()
		.add(mappingTypeClass[type] || mappingTypeClass.default, true)
		.add($$props.class, true)
		.add("rounded-full", circle)
		.add("rounded-lg", !circle)
		.add(`p-${paddingHeightSize[size] || paddingHeightSize.default}`, icon && !$$slots.default)
		.add(mappingSizeClass[size] || mappingSizeClass.default, !(icon && !$$slots.default))
		.add("opacity-25 pointer-events-none", disabled, "")
		.get()
</script>

<button
	type="button"
	{disabled}
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
