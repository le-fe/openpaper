<script lang="ts">
	import { getContext } from "svelte"
	import { schemaKey, fieldsKey, submittedKey, colorKey } from "./key"
	export let name: string = ""
	let schema = getContext(schemaKey)
	let fields = getContext(fieldsKey)
	let submitted = getContext(submittedKey)
	let color = getContext(colorKey)
</script>

{#if $submitted}
	{#await $schema.validateAt(name, $fields) then result}
		<p class="valid" />
	{:catch error}
		<p class="text-sm" style="color:{$color}">{error.errors[0]}</p>
	{/await}
{/if}
