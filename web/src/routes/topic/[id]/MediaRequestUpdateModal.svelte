<script lang="ts">
	import { Form, FormItem, ModalWrapper, Input } from "@components"
	import { _ } from "svelte-i18n"
	export let isOpen: boolean = false
	export let topicId: number
</script>

{#if isOpen}
	<ModalWrapper size="default" title={$_("requestNewItemTopic")}>
		<div class="px-6 pb-8">
			<Form class="mt-8">
				<FormItem label={$_("itemName")}>
					<Input placeholder="Please enter name of item" />
				</FormItem>
				<FormItem class="mt-4" label={$_("itemDescription")}>
					<Input type="textarea" placeholder="Please enter description of item" />
				</FormItem>
			</Form>
		</div>
	</ModalWrapper>
{/if}
