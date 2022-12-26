<script lang="ts">
	import { onMount, createEventDispatcher, getContext } from "svelte"
	import { filterProps } from "../utils"
	import { getEventsAction } from "../utils"
	import { current_component } from "svelte/internal"
	const events = getEventsAction(current_component)
	import { ClassBuilder } from "../utils"

	let elm
	const dispatch = createEventDispatcher()
	export let value: any = null
	export let disabled: boolean = false
	export let placeholder: string = "Please input"
	export let type: string = "text"
	export let size: string = "default"
	export let focused: boolean = false
	export let escBlur: boolean = false
	let className: string = ""
	export { className as class }

	const props = filterProps(
		[
			"focused",
			"outlined",
			"label",
			"placeholder",
			"hint",
			"error",
			"append",
			"prepend",
			"persistentHint",
			"textarea",
			"select",
			"autocomplete",
			"noUnderline",
			"appendReverse",
			"prependReverse",
			"color",
			"bgColor",
			"disabled",
			"replace",
			"remove",
			"size",
		],
		$$props
	)

	const mappingSizeClass = {
		default: "py-1 px-2 text-base",
		sm: "py-0.25 px-1.5 text-sm",
	}

	const classesDefault =
		"block w-full px-3 py-1.5 font-normal text-gray-700 bg-white dark:text-white dark:bg-gray-800 bg-clip-padding border border-solid border-gray-300 dark:border-gray-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-dark dark:focus:bg-slate-900 focus:outline-none"
	const cb = new ClassBuilder("", classesDefault)
	$: classList = cb
		.flush()
		.add(mappingSizeClass[size] || mappingSizeClass.default.default, true)
		.add(className, true)
		.add("opacity-25 pointer-events-none", disabled)
		.get()

	const onInput = (e) => (value = e.target.value)

	function toggleFocus(e) {
		focused = true
		document.addEventListener("keydown", onKeyDown)
		dispatch("focus", e)
	}

	function toggleBlur(e) {
		focused = false
		document.removeEventListener("keydown", onKeyDown)
		dispatch("blur", e)
	}

	function handleKeypress(e) {
		if (e.key == "Enter") {
			// Enter pressed
			dispatch("enter-pressed")
			return false
		}
	}

	onMount(() => {
		if ($$props.focused) {
			focused = true
			elm?.focus()
		}
	})

	function onKeyDown(e) {
		if (escBlur) {
			if (e.key == "Escape") {
				elm?.blur()
				dispatch("esc-pressed")
			}
		}
	}
</script>

{#if type === "textarea"}
	<textarea
		use:events
		bind:this={elm}
		{...props}
		on:focus={toggleFocus}
		on:blur={toggleBlur}
		on:blur
		on:keypress={handleKeypress}
		{value}
		class={classList}
		{placeholder}
		on:input={onInput}
		spellcheck="false"
	/>
{:else}
	<input
		use:events
		bind:this={elm}
		{...props}
		on:focus={toggleFocus}
		on:blur={toggleBlur}
		on:blur
		on:keypress={handleKeypress}
		{value}
		class={classList}
		{type}
		{placeholder}
		on:input={onInput}
		spellcheck="false"
	/>
{/if}
