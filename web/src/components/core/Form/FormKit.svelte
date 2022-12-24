<!-- Inspired by https://formkit.com/ -->
<script lang="ts">
	import { ClassBuilder } from "../utils"

	type FormKitType = "form" | "text" | "password" | "email"
	export let type: FormKitType = "text"
	export let label: string = ""
	export let validation: string = ""
	let collectedValidations = []

	const classesDefault = ""
	const cb = new ClassBuilder("", classesDefault)
	$: className = cb.flush().add($$props.class).get()

	export function touch() {
		console.log("Touch")
		console.log(validation)
	}
</script>

<div class={className}>
	{#if label}
		<div class="pr-2 mt-1 mb-1 text-sm" style="width: 165px">{label}</div>
	{/if}
	<slot />
</div>
