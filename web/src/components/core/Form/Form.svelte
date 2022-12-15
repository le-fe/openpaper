<script>
	import { ClassBuilder } from "../utils"

	const classesDefault = ""
	const cb = new ClassBuilder("", classesDefault)
	$: className = cb.flush().add($$props.class).get()
</script>

<form class={className}>
	<slot />
</form>
