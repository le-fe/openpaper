<script lang="ts">
	import * as yup from "yup"
	import { _ } from "svelte-i18n"
	import { Button, Form, FormItem, ModalWrapper, Input, ToastUtil, closeModal } from "@components"
	import { DiscussionRepository } from "@/api"

	export let title: string = ""
	export let description: string = ""
	export let isOpen: boolean = false
	export let topicId: number

	type DiscussionRequestForm = {
		title: string
		description: string
		topicId: number
		creatorId: number
	}

	let formElement: Form
	let dataForm: DiscussionRequestForm = {
		title: title,
		description: description,
		topicId,
		creatorId: 1,
	}

	let schema = yup.object().shape({
		title: yup.string().required().max(30).label("Title"),
		description: yup.string().required().max(255).label("Description"),
	})

	async function formSubmit() {
		const isValid = schema.isValidSync(dataForm)
		if (isValid) {
			const res = DiscussionRepository.create(dataForm)
			console.clear()
			console.log(res)
			if (res.ok) {
				ToastUtil.toastSuccess($_("requestHasSubmitted"))
				closeModal()
			} else {
				ToastUtil.toastError(res.error || $_("somethingWentWrong"))
			}
		}
	}
</script>

{#if isOpen}
	<ModalWrapper size="default" title={$_("createNewDiscussion")}>
		<div class="text-sm text-center">{$_("createNewDiscussionForUserToJoin")}</div>
		<div class="px-6 pb-2">
			<Form class="mt-8" {schema} fields={dataForm} submitHandler={formSubmit} bind:this={formElement}>
				<FormItem label={$_("title")} name="title">
					<Input bind:value={dataForm.title} placeholder="Please enter title of item" />
				</FormItem>
				<FormItem class="mt-4" label={$_("description")} name="description">
					<Input type="textarea" rows="4" bind:value={dataForm.description} placeholder="Please enter description of item" />
				</FormItem>
			</Form>
		</div>
		<div slot="bottom" class="flex items-center">
			<Button class="mr-2" on:click={closeModal}>{$_("cancel")}</Button>
			<Button type="primary" icon="check" on:click={() => formElement.submit()}>{$_("submitDiscussion")}</Button>
		</div>
	</ModalWrapper>
{/if}
