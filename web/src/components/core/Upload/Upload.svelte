<script lang="ts">
	import { createEventDispatcher } from "svelte"
	import { ClassBuilder } from "../utils"
	import { uploadFile } from "@/api/upload"
	import { buildImageUrl } from "@/utils"
	import Icon from "../Icon/Icon.svelte"

	type IFile = {
		path: string
		name: string
	}

	const dispatch = createEventDispatcher()
	let fileinput: HTMLElement
	let fileList: IFile[] = []
	export let multiple: boolean = false

	const onFileSelected = async (e) => {
		let file = e.target.files[0]
		let data = await uploadFile({ file })
		if (data) {
			data.url = buildImageUrl(data.filename)
			dispatch("upload", data)
		}
	}

	const classesDefault = "inline-flex flex-col items-start"
	const cb = new ClassBuilder("", classesDefault)
	$: uploadDisabled = () => {
		if (!multiple) {
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
