<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Icon from "./Icon/Icon.svelte"

	export let primary: boolean = false
	export let size: string = "medium"
	export let icon: string = ""
	export let circle: boolean = false

	const dispatch = createEventDispatcher()
	/**
	 * Button click handler
	 */
	function onClick(event) {
		dispatch("click", event)
	}

	$: className = generateClassName()

	function generateClassName() {
		let cls = ["inline-flex items-center", $$props.class]
		if (circle) {
			cls.push("rounded-full")
		} else {
			cls.push("rounded-lg")
		}
		if (icon && !$$slots.default) {
			cls.push("p-2.5")
		} else {
			cls.push("px-5 py-2.5")
		}
		return cls.join(" ")
	}
</script>

<button
	type="button"
	class="c-button text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:ring-blue-300 font-medium text-sm dark:bg-gray-600 dark:hover:bg-gray-800 focus:outline-none dark:focus:ring-gray-800 {className}"
	on:click={onClick}
>
	{#if icon}
		<Icon class="c-icon" name={icon} />
	{/if}
	{#if $$slots.default}
		<span class={icon ? "ml-1" : ""}><slot /></span>
	{/if}
</button>
