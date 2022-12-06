<script lang="ts">
	import Icon from "../Icon/Icon.svelte"
	export let placeholder: string = "Please input"
	export let type: string = "text"
	let className: string = ""
	export { className as class }
	let focused: boolean = false

	function toggleFocused() {
		focused = !focused
	}
</script>

<span
	class="c-input-search w-full px-4 inline-flex text-base font-normal text-gray-700 bg-white dark:text-white dark:bg-gray-700 bg-clip-padding border border-solid rounded transition ease-in-out m-0
	{className} 
	{focused ? ' border-gray-500 dark:border-gray-500' : ' border-gray-300 dark:border-gray-600'}"
>
	<input
		spellcheck="false"
		class="
			inline-flex
			w-full
			p-0
			outline-none
			border-none
			bg-transparent
		"
		{type}
		{placeholder}
		on:focus={toggleFocused}
		on:blur={toggleFocused}
	/>
	<span class="inline-flex items-center justify-center">
		<Icon name="search" />
	</span>
</span>

<style lang="scss">
	.c-input-search {
		input:focus {
			box-shadow: none;
			outline: none;
		}
	}
</style>
