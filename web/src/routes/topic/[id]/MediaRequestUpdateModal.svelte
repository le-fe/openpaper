<script lang="ts">
	import { Button, FormKit, ModalWrapper, Input, Upload } from "@components"
	import { _ } from "svelte-i18n"
	import { isUrlImage } from "@/utils"

	export let isOpen: boolean = false
	export let topicId: number

	type MediaRequestForm = {
		name: string
		description: string
		featuredImage: string
	}

	let formKitElement: FormKit
	let isShowLink: boolean = false
	let linkValue: string = ""
	let isLoadingImage: boolean = false
	let dataForm: MediaRequestForm = {
		name: "",
		description: "",
		featuredImage: "",
	}

	async function loadImageByUrl(url: string) {
		try {
			isLoadingImage = true
			const isImage = await isUrlImage(url)
			if (isImage) {
				dataForm.featuredImage = url
			}
		} catch (error) {
			console.log(error)
		} finally {
			isLoadingImage = false
		}
	}

	function handleCloseImageByUrl() {
		linkValue = ""
		dataForm.featuredImage = ""
		isShowLink = false
	}

	function handleRequestItem() {
		formKitElement.touch()
	}

	function handleUploadImage(evt: any) {
		const data = evt.detail
		if (data?.filename && data?.url) {
			// Success
			loadImageByUrl(data.url)
		}
	}
</script>

{#if isOpen}
	<ModalWrapper size="default" title={$_("requestNewItemTopic")}>
		<div class="text-sm text-center">{$_("addItemWillCreateAnDiscussion")}</div>
		<div class="px-6 pb-2">
			<FormKit class="mt-8" type="form" bind:this={formKitElement}>
				<FormKit type="text" label={$_("itemName")} validation="required">
					<Input bind:value={dataForm.name} placeholder="Please enter name of item" />
				</FormKit>
				<FormKit type="text" class="mt-4" label={$_("itemDescription")} validation="required">
					<Input type="textarea" bind:value={dataForm.description} placeholder="Please enter description of item" />
				</FormKit>
				<FormKit class="mt-4" label={$_("itemFeaturedImage")}>
					{#if isShowLink}
						<div class="inline-flex items-center">
							<FormKit type="form">
								<FormKit type="text">
									<Input autofocus class="" placeholder="Enter url" bind:value={linkValue} />
								</FormKit>
							</FormKit>
							<Button class="mx-2" icon="check" loading={isLoadingImage} on:click={() => loadImageByUrl(linkValue)} />
							<Button icon="close" on:click={handleCloseImageByUrl} />
						</div>
					{/if}
					{#if !isShowLink}
						<Button icon="link" on:click={() => (isShowLink = true)} />
						<Upload multiple={false} on:upload={handleUploadImage}>
							<Button icon="add">{$_("clickToUpload")}</Button>
							<div slot="tip" class="">jpg/png files with a size less than 500KB.</div>
						</Upload>
					{/if}
					{#if dataForm.featuredImage}
						<div class="mt-2">
							<img class="max-w-[150px]" alt={dataForm.featuredImage} src={dataForm.featuredImage} />
						</div>
					{/if}
				</FormKit>
			</FormKit>
		</div>
		<div slot="bottom" class="flex items-center">
			<Button class="mr-2">{$_("cancel")}</Button>
			<Button type="primary" icon="check" on:click={handleRequestItem}>{$_("requestItem")}</Button>
		</div>
	</ModalWrapper>
{/if}
