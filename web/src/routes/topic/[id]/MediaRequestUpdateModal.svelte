<script lang="ts">
	import { Button, Form, FormItem, ModalWrapper, Input, Upload } from "@components"
	import { _ } from "svelte-i18n"
	export let isOpen: boolean = false
	export let topicId: number
</script>

{#if isOpen}
	<ModalWrapper size="default" title={$_("requestNewItemTopic")}>
		<div class="text-sm text-center">{$_("addItemWillCreateAnDiscussion")}</div>
		<div class="px-6 pb-8">
			<Form class="mt-8">
				<FormItem label={$_("itemName")}>
					<Input placeholder="Please enter name of item" />
				</FormItem>
				<FormItem class="mt-4" label={$_("itemDescription")}>
					<Input type="textarea" placeholder="Please enter description of item" />
				</FormItem>
				<FormItem class="mt-4" label={$_("itemFeaturedImage")}>
					<Upload multiple={false}>
						<Button icon="add">{$_("clickToUpload")}</Button>
						<div slot="tip" class="">jpg/png files with a size less than 500KB.</div>
					</Upload>
				</FormItem>
			</Form>
		</div>
	</ModalWrapper>
{/if}
