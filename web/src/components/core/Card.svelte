<script lang="ts">
	let className: string = ""
	export { className as class }
	export let type: string = "default"
	const mappingClass = {
		default: "bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white",
		stroke: "dark:bg-gray-700 border border-gray-900 dark:border-gray-500",
	}
	$: defaultClassName = mappingClass[type] || mappingClass.default
</script>

<div class="rounded-lg shadow-md {defaultClassName} {className}">
	<slot />
</div>
