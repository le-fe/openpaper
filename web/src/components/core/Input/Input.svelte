<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte"
	import { filterProps } from "../utils"

	let elm
	const dispatch = createEventDispatcher()
	export let value: any = null
	export let placeholder: string = "Please input"
	export let type: string = "text"
	export let size: string = "default"
	export let focused: boolean = false
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
			"rows",
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

	$: classList = generateClass()
	function generateClass() {
		let cls = [
			"form-control block w-full px-3 py-1.5 font-normal text-gray-700 bg-white dark:text-white dark:bg-gray-800 bg-clip-padding border border-solid border-gray-300 dark:border-gray-600 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-primary-dark dark:focus:bg-slate-900 focus:outline-none",
			mappingSizeClass[size] || mappingSizeClass.default.default,
			className,
		]
		return cls.join(" ")
	}

	const onInput = (e) => (value = e.target.value)

	function toggleFocused() {
		focused = !focused
	}

	function handleKeypress(e) {
		var keyCode = e.code || e.key
		if (keyCode == "Enter") {
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
</script>

{#if type === "textarea"}
	<textarea
		bind:this={elm}
		{...props}
		on:focus={toggleFocused}
		on:blur={toggleFocused}
		on:blur
		on:keypress={handleKeypress}
		{value}
		class={classList}
		{type}
		{placeholder}
		on:input={onInput}
		spellcheck="false"
	/>
{:else}
	<input
		bind:this={elm}
		{...props}
		on:focus={toggleFocused}
		on:blur={toggleFocused}
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
