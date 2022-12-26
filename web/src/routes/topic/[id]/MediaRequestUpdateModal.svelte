<script lang="ts">
	import { Button, Form, FormItem, ModalWrapper, Input, Upload } from "@components"
	import { _ } from "svelte-i18n"
	import { isUrlImage } from "@/utils"
	import * as yup from "yup"
	export let isOpen: boolean = false
	export let topicId: number

	type MediaRequestForm = {
		name: string
		description: string
		featuredImage: string
	}
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

	let submitted = false
	let isValid

	function formSubmit() {
		submitted = true
		isValid = schema.isValidSync(dataForm)
		if (isValid) {
			alert(JSON.stringify(dataForm))
		}
		// setTimeout(() => {
		// 	console.log(values)
		// 	setSubmitting(false)
		// 	resetForm({
		// 		user: { email: "test@user.com" }, // optional
		// 	})
		// }, 2000)
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
			<Form {schema} fields={dataForm} submitHandler={formSubmit} {submitted} class="mt-8">
				<FormItem label={$_("itemName")} name="name">
					<Input bind:value={dataForm.name} placeholder="Please enter name of item" />
				</FormItem>
				<FormItem class="mt-4" label={$_("itemDescription")} name="description">
					<Input type="textarea" bind:value={dataForm.description} placeholder="Please enter description of item" />
				</FormItem>
				<FormItem class="mt-4" label={$_("itemFeaturedImage")}>
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
					{#if dataForm.featuredImage}
						<div class="mt-2">
							<img class="max-w-[150px]" alt={dataForm.featuredImage} src={dataForm.featuredImage} />
						</div>
					{/if}
				</FormItem>
				<button type="submit" on:click|preventDefault={formSubmit}>Sign in</button>
			</Form>
		</div>
		<div slot="bottom" class="flex items-center">
			<Button class="mr-2">{$_("cancel")}</Button>
			<Button type="primary" icon="check" on:click={formSubmit}>{$_("requestItem")}</Button>
		</div>
	</ModalWrapper>
{/if}
