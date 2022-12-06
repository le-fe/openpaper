<script lang="ts">
	export let placeholder: string = "Please input"
	export let type: string = "text"
	let className: string = ""
	export { className as class }
</script>

<input
	class="
		form-control
		block
		w-full
		px-3
		py-1.5
		text-base
		font-normal
		text-gray-700
		bg-white
		dark:text-white
		dark:bg-gray-800
		bg-clip-padding
		border
		border-solid
		border-gray-300
		rounded
		transition
		ease-in-out
		m-0
		focus:text-gray-700
		focus:bg-white
		focus:border-blue-600
		focus:outline-none
		{className}
	"
	{type}
	{placeholder}
/>
