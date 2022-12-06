<script lang="ts">
	let className: string = ""
	export { className as class }
</script>

<div
	class="bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 dark:text-white {className}"
>
	<slot />
</div>
