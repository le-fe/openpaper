<script lang="ts">
	import Icon from "./Icon/Icon.svelte"

	export let closable: boolean = false
	export let type: string = "default"
	export let size: string = "default"

	const mappingTypeClass = {
		default: {
			wrapper: "text-slate-900 text-black bg-orange-200 fill-yellow-900",
			icon: "hover:bg-orange-300",
		},
	}

	const mappingSizeClass = {
		default: "py-1 px-2",
		sm: "py-0.5 px-1.5",
	}

	$: wrapperClass = generateClassName()

	function generateClassName() {
		let cls = [
			mappingTypeClass[type]?.wrapper || mappingTypeClass.default.wrapper,
			mappingSizeClass[size] || mappingSizeClass.default.default,
		]
		return cls.join(" ")
	}
</script>

<span class="flex items-center justify-center rounded {wrapperClass}">
	<span class="text-xs font-semibold inline-block uppercase last:mr-0 mr-1">
		<slot />
	</span>
	{#if closable}
		<i class="p-0.5 rounded-full {mappingTypeClass[type]?.icon || mappingTypeClass.default.icon}">
			<Icon width="12px" height="12px" name="close" />
		</i>
	{/if}
</span>
