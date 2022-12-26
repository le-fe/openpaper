<script lang="ts">
	import * as yup from "yup"
	import { _ } from "svelte-i18n"
	import { isUrlImage } from "@/utils"
	import { Button, Form, FormItem, ModalWrapper, Input, Upload, ToastUtil } from "@components"
	import { createTopicRequestChange, REQUEST_TOPIC_TYPE } from "@/api/topic-request-change"

	export let isOpen: boolean = false
	export let topicId: number

	type MediaRequestForm = {
		name: string
		description: string
		featuredImage: string
	}

	let formElement: Form
	let isShowLink: boolean = false
	let linkValue: string = ""
	let isLoadingImage: boolean = false
	let dataForm: MediaRequestForm = {
		name: "",
		description: "",
		featuredImage: "",
	}

	let schema = yup.object().shape({
		name: yup.string().required().max(30).label("Name"),
		description: yup.string().required().max(255).label("Description"),
		featuredImage: yup.string().required().label("Featured Image"),
	})

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

	async function formSubmit() {
		const isValid = schema.isValidSync(dataForm)
		if (isValid) {
			const res = await createTopicRequestChange({
				requestType: REQUEST_TOPIC_TYPE.ADD,
				key: "medias",
				topicId,
				requestUserId: 1,
				content: JSON.stringify(dataForm),
			})
			if (res.ok) {
				ToastUtil.toastSuccess($_("requestHasSubmitted"))
				isOpen = false
			} else {
				ToastUtil.toastError(res.error || $_("somethingWentWrong"))
			}
		}
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
			<Form class="mt-8" {schema} fields={dataForm} submitHandler={formSubmit} bind:this={formElement}>
				<FormItem label={$_("itemName")} name="name">
					<Input bind:value={dataForm.name} placeholder="Please enter name of item" />
				</FormItem>
				<FormItem class="mt-4" label={$_("itemDescription")} name="description">
					<Input type="textarea" bind:value={dataForm.description} placeholder="Please enter description of item" />
				</FormItem>
				<FormItem class="mt-4" label={$_("itemFeaturedImage")} name="featuredImage">
					<div>
						{#if isShowLink}
							<div class="inline-flex items-center">
								<Form>
									<FormItem type="text">
										<Input autofocus class="" placeholder="Enter url" bind:value={linkValue} />
									</FormItem>
								</Form>
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
					</div>
					{#if dataForm.featuredImage}
						<div class="mt-2">
							<img class="max-w-[150px]" alt={dataForm.featuredImage} src={dataForm.featuredImage} />
						</div>
					{/if}
				</FormItem>
			</Form>
		</div>
		<div slot="bottom" class="flex items-center">
			<Button class="mr-2">{$_("cancel")}</Button>
			<Button type="primary" icon="check" on:click={() => formElement.submit()}>{$_("requestItem")}</Button>
		</div>
	</ModalWrapper>
{/if}
