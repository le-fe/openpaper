<script>
	import { ModalWrapper, closeModal, Icon } from "@components"
	import { _ } from "svelte-i18n"
	import { getTopicRequestChanges } from "@/api/topic-request-change"

	// provided by Modals
	export let isOpen
	export let topicId

	function fetchTopicRequestChanges() {
		return getTopicRequestChanges(topicId)
	}
</script>

{#if isOpen}
	<ModalWrapper size="default" title={$_("requestTopicUpdates")}>
		<div>
			{#await fetchTopicRequestChanges()}
				<div class="w-full flex items-center justify-center py-24">
					<Icon class="animate-spin" width="40px" height="40px" name="loading" />
				</div>
			{:then data}
				{#if data.length > 0}
					<div class="text-center">
						<h2 class="text-xs mb-4 text-gray-300">{$_("someRequestsToChangeTopic")}</h2>
					</div>
					{#each data as item}
						{JSON.stringify(item)}
					{/each}
				{/if}
			{:catch error}
				<h3>Error while loading the data</h3>
			{/await}
		</div>
		<div class="actions">
			<button on:click={closeModal}>OK</button>
		</div>
	</ModalWrapper>
{/if}
