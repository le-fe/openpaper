<script lang="ts">
	import Icon from "../Icon/Icon.svelte"
	import { closeModal } from "./store"

	export let title: string
	export let size: string = "default"
	let className: string = ""
	export { className as class }

	const mappingModalSizes = {
		default: "md:w-[50vw]",
	}

	$: classList = generateClass()
	function generateClass() {
		let cls = [
			"relative dark:bg-gray-900 dark:text-white rounded-lg p-4 z-50 pointer-events-auto",
			mappingModalSizes[size] || mappingModalSizes.default,
			className,
		]
		return cls.filter(Boolean).join(" ")
	}
</script>

<div role="dialog" class="modal">
	<div class={classList}>
		<i
			class="cursor-pointer absolute right-4 top-4 hover:dark:bg-gray-800 transition-colors rounded-full p-1"
			on:click={closeModal}
		>
			<Icon class="dark:fill-white" name="close" />
		</i>
		{#if title}
			<div class="text-center">
				<h3 class="text-xl font-medium">{title}</h3>
			</div>
		{/if}
		<slot />
	</div>
</div>
