<script lang="ts">
	import Button from "../Button.svelte"
	import Icon from "../Icon/Icon.svelte"
	import { closeModal } from "./store"
	import { _ } from "svelte-i18n"

	export let title: string = "Confirm"
	export let message: string
	export let size: string = "default"
	export let onConfirm: Function = () => {}
	let className: string = ""
	export { className as class }

	const mappingModalSizes = {
		default: "w-[520px]",
		"full-screen": "w-screen h-screen",
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

	function handleConfirm() {
		onConfirm().then((res) => {
			if (res.ok) {
				closeModal()
			}
		})
	}
</script>

<div role="dialog" class="modal overflow-y-auto">
	<div class={classList}>
		<i
			class="cursor-pointer absolute right-4 top-4 hover:dark:bg-gray-800 transition-colors rounded-full p-1"
			on:click={closeModal}
		>
			<Icon class="dark:fill-white" name="close" />
		</i>
		{#if title}
			<div class="text-center px-6">
				<h3 class="text-xl font-semibold">{title}</h3>
			</div>
		{/if}
		<div class="text-center py-4">
			{message}
		</div>
		<div class="flex items-center justify-center mt-4">
			<Button type="primary" class="mr-4" on:click={handleConfirm}>{$_("confirm")}</Button>
			<Button on:click={closeModal}>{$_("cancel")}</Button>
		</div>
	</div>
</div>
