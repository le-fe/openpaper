<script lang="ts">
	import { ClassBuilder } from "../utils"
	import Icon from "../Icon/Icon.svelte"

	type IFile = {
		path: string
		name: string
	}

	let fileinput: HTMLElement
	let fileList: IFile[] = []
	export let multiple: boolean = false

	const onFileSelected = (e) => {
		let image = e.target.files[0]
		let reader = new FileReader()
		reader.readAsDataURL(image)
		reader.onload = (e) => {
			console.clear()
			console.log(e.target.result)
		}
	}

	const classesDefault = "inline-flex flex-col items-start"
	const cb = new ClassBuilder("", classesDefault)
	$: uploadDisabled = () => {
		if (!multiple) {
			console.clear()
			console.log(fileList.length)
			if (fileList.length > 0) {
				return true
			}
		}
		return false
	}
	$: c = cb.flush().add($$props.class).add("opacity-25 pointer-events-none", uploadDisabled()).get()

	function handleClickUpload() {
		if (!multiple) {
			if (fileList.length === 0) {
				fileinput.click()
			}
		} else {
			fileinput.click()
		}
	}
</script>

<div class={c}>
	<div on:click={handleClickUpload}>
		<slot />
	</div>
	<span class="text-xs mt-1">
		<slot name="tip" />
	</span>
	<input style="display:none" type="file" accept=".jpg, .jpeg, .png" on:change={(e) => onFileSelected(e)} bind:this={fileinput} />
</div>
