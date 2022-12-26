<script lang="ts">
	import { ClassBuilder } from "../utils"
	import Message from "./Message.svelte"

	export let name: string = ""
	export let label: string = ""
	export let type: string = "text"

	const classesDefault = ""
	const cb = new ClassBuilder("", classesDefault)
	$: className = cb.flush().add($$props.class).get()
</script>

<div class={className}>
	{#if label}
		<label for={name}>{label}</label>
	{/if}
	<slot />
	{#if name}
		<Message {name} />
	{/if}
</div>
