<script lang="ts">
	import { ClassBuilder } from "../utils"

	const classesDefault = "dark:hover:bg-slate-700 cursor-pointer px-2 py-1 rounded-md select-none"
	const cb = new ClassBuilder("", classesDefault)
	$: classList = cb.flush().add($$props.class).get()
</script>

<div role="menuitem" class={classList} on:click>
	<slot />
</div>
