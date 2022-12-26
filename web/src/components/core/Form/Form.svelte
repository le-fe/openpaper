<script lang="ts">
	import { setContext } from "svelte"
	import { schemaKey, fieldsKey, submittedKey, colorKey } from "./key"
	import { writable } from "svelte/store"
	import { ClassBuilder } from "../utils"
	export let submitHandler: Function = () => {}
	export let schema = {}
	export let fields = {}
	let submitted: boolean = false
	export let color = "red"
	let formSchema = writable(schema)
	let formFields = writable(fields)
	let formSubmitted = writable(false)
	let messageColor = writable(color)
	setContext(schemaKey, formSchema)
	setContext(fieldsKey, formFields)
	setContext(submittedKey, formSubmitted)
	setContext(colorKey, messageColor)
	$: $formFields = fields
	$: $formSchema = schema
	$: $formSubmitted = submitted
	$: $messageColor = color

	const classesDefault = ""
	const cb = new ClassBuilder("", classesDefault)
	$: className = cb.flush().add($$props.class).get()

	export function submit() {
		submitted = true
		submitHandler()
	}
</script>

<form on:submit|preventDefault={submit} {...$$props} class={className}>
	<slot />
</form>
