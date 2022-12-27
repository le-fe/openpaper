<script lang="ts">
	import { ClassBuilder } from "../utils"

	const classesDefault = ""
	const cb = new ClassBuilder("", classesDefault)
	$: classList = cb.flush().add($$props.class).get()
</script>

<div class={classList}>
	<slot />
</div>
