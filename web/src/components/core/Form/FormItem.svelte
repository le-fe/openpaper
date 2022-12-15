<script lang="ts">
	import { ClassBuilder } from "../utils"

	export let label: string = ""

	const classesDefault = "flex items-start"
	const cb = new ClassBuilder("", classesDefault)
	$: className = cb.flush().add($$props.class).get()
</script>

<div class={className}>
	{#if label}
		<div class="pr-2 mt-1" style="width: 165px">{label}</div>
	{/if}
	<div class="flex-1">
		<slot />
	</div>
</div>
