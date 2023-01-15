<script lang="ts">
	import Popper from "../Popper/Popper.svelte"
	export let size: string = "12"
	import { ClassBuilder } from "../utils"
	import { _ } from "svelte-i18n"

	const classesDefault = "rounded-full overflow-hidden bg-gray-700 cursor-pointer"
	const cb = new ClassBuilder("", classesDefault)
	$: className = cb.flush().add(`w-${size} h-${size}`, true).add($$props.class, true).get()
</script>

<div class={className}>
	<Popper popperClass="w-full h-full">
		<div slot="trigger" class="cursor-pointer" />
		<div slot="content">
			<div class="px-4">
				<h3>{$_("selectAnAvatar")}</h3>
			</div>
		</div>
	</Popper>
</div>
