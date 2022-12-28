<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import Icon from "./Icon/Icon.svelte"
	import { ClassBuilder } from "./utils"

	const dispatch = createEventDispatcher()
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

	const classesDefault = "flex items-center justify-center rounded"
	const cb = new ClassBuilder("", classesDefault)
	$: className = cb
		.flush()
		.add(mappingTypeClass[type]?.wrapper || mappingTypeClass.default, true)
		.add($$props.class, true)
		.add(mappingSizeClass[size] || mappingSizeClass.default, true)
		.get()

	function handleCloseTag() {}
</script>

<span class={className}>
	<span class="text-xs font-semibold inline-block uppercase last:mr-0 mr-1">
		<slot />
	</span>
	{#if closable}
		<i
			class="p-0.5 rounded-full {mappingTypeClass[type]?.icon || mappingTypeClass.default.icon}"
			on:click={() => dispatch("close-tag")}
		>
			<Icon width="12px" height="12px" name="close" />
		</i>
	{/if}
</span>
