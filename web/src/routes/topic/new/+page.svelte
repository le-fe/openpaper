<script lang="ts">
	import * as yup from "yup"
	import { Button, Form, FormItem, ToastUtil, Input } from "@components"
	import TagSelector from "@/components/TagSelector.svelte"
	import type { IMedia } from "@/interfaces"
	import { _ } from "svelte-i18n"

	let formElement

	let dataForm: IMedia = {
		name: "",
		description: "",
		featuredImage: "",
	}

	let schema = yup.object().shape({
		name: yup.string().required().max(30).label("Name"),
		description: yup.string().required().max(255).label("Description"),
		featuredImage: yup.string().required().label("Featured Image"),
	})

	async function formSubmit() {
		const isValid = schema.isValidSync(dataForm)
		if (isValid) {
			ToastUtil.toastSuccess($_("requestHasSubmitted"))
			ToastUtil.toastError(res.error || $_("somethingWentWrong"))
		}
	}
</script>

<svelte:head>
	<title>SquareMoon | Submit New Topic</title>
	<meta name="description" content="SquareMoon | Submit New Topic" />
</svelte:head>

<div>
	<div class="container-md py-4">
		<div class="text-center mb-4">
			<h1 class="text-2xl font-semibold">{$_("submitNewTopic")}</h1>
		</div>
		<Form {schema} fields={dataForm} submitHandler={formSubmit} bind:this={formElement}>
			<FormItem label={$_("itemName")} name="name">
				<Input bind:value={dataForm.name} placeholder="Please enter name of item" />
			</FormItem>
			<FormItem class="mt-4" label={$_("itemDescription")} name="description">
				<Input type="textarea" rows="7" bind:value={dataForm.description} placeholder="Please enter description of item" />
			</FormItem>
			<FormItem class="mt-4" label={$_("tags")}>
				<TagSelector />
			</FormItem>
			<div class="mt-4">
				<Button type="primary" class="w-full" size="lg" icon="publish">{$_("submitNewTopic")}</Button>
			</div>
		</Form>
	</div>
</div>
