<script>
	import { setContext } from "svelte"
	import { schemaKey, fieldsKey, submittedKey, colorKey } from "./key"
	import { writable } from "svelte/store"
	// import { ClassBuilder } from "../utils"
	export let submitHandler
	export let schema
	export let fields
	export let submitted
	export let color = "red"
	let formSchema = writable(schema)
	let formFields = writable(fields)
	let formSubmitted = writable(submitted)
	let messageColor = writable(color)
	setContext(schemaKey, formSchema)
	setContext(fieldsKey, formFields)
	setContext(submittedKey, formSubmitted)
	setContext(colorKey, messageColor)
	$: $formFields = fields
	$: $formSchema = schema
	$: $formSubmitted = submitted
	$: $messageColor = color

	// const classesDefault = ""
	// const cb = new ClassBuilder("", classesDefault)
	// $: className = cb.flush().add($$props.class).get()
</script>

<form on:submit|preventDefault={submitHandler} {...$$props}>
	<slot />
</form>
