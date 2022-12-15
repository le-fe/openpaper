<script lang="ts">
	import { Button, ModalWrapper, Icon, ToastUtil, Tag } from "@components"
	import { _ } from "svelte-i18n"
	import { getTopicRequestChanges, confirmTopicRequestChange } from "@/api/topic-request-change"
	import { formatDateTime } from "@/utils"
	import type { IRequestTopicItem } from "@/interfaces"
	import { fetchTopicDetail } from "./store"

	export let isOpen: boolean = false
	export let topicId: string = ""
	export let requestItems: IRequestTopicItem[] = []

	let isLoadingConfirm: boolean = false

	async function fetchTopicRequestChanges() {
		let items = await getTopicRequestChanges(topicId)
		if (Array.isArray(items)) {
			requestItems = items
			return items
		}
		return []
	}

	async function handleConfirmRequest(id: number, value: string, index: number) {
		if (value === "accept") {
			const result = await confirmTopicRequestChange({ id, isApproved: true })
			if (result.success) {
				ToastUtil.toastSuccess($_("thisRequestHasBeenApproved"))
				requestItems[index].isApproved = true
				requestItems[index].isRejected = false
				fetchTopicDetail(Number(topicId))
			} else {
				ToastUtil.toastError(result?.message || $_("somethingWentWrong"))
			}
		} else if (value === "reject") {
			const result = await confirmTopicRequestChange({ id, isRejected: true })
			if (result.success) {
				ToastUtil.toastSuccess($_("thisRequestHasBeenRejected"))
				requestItems[index].isApproved = false
				requestItems[index].isRejected = true
			} else {
				ToastUtil.toastError(result?.message || $_("somethingWentWrong"))
			}
		}
	}
</script>

{#if isOpen}
	<ModalWrapper size="default" title={$_("requestTopicUpdates")}>
		<div>
			{#await fetchTopicRequestChanges()}
				<div class="w-full flex items-center justify-center py-24">
					<Icon class="animate-spin" width="40px" height="40px" name="loading" />
				</div>
			{:then}
				{#if requestItems.length > 0}
					<div class="text-center">
						<h2 class="text-xs mb-4 text-gray-300">{$_("someRequestsToChangeTopic")}</h2>
					</div>
					<div class="container">
						<div class="px-4">
							<table class="w-full">
								<thead class="dark:bg-gray-800">
									<th class="px-2 py-2" />
									<th class="px-2 py-2">Field</th>
									<th class="px-2 py-2">Request Type</th>
									<th class="px-2 py-2">Current</th>
									<th class="px-2 py-2">Request change</th>
									<th class="px-2 py-2">Request date</th>
									<th class="px-2 py-2">Actions</th>
								</thead>
								<tbody>
									{#each requestItems as item, index}
										<tr class={item.isApproved === true || item.isRejected === true ? "opacity-20" : ""}>
											<td class="text-center px-2 py-2 border border-gray-800 text-sm">{index + 1}</td>
											<td class="text-center px-2 py-2 border border-gray-800 text-primary">{item.key}</td>
											<td class="text-center px-2 py-2 border border-gray-800 text-primary">
												<Tag>{item.requestType || "update"}</Tag>
											</td>
											<td
												class="text-center px-2 py-2 border border-gray-800 {item.requestType === 'update' ? 'line-through' : ''}"
											>
												{item.oldContent || ""}
											</td>
											<td class="text-center px-2 py-2 border border-gray-800">{item.content}</td>
											<td class="text-center px-2 py-2 border border-gray-800">{formatDateTime(item.createdAt)}</td>
											<td class="px-2 py-2 border border-gray-800">
												<div class="flex items-center justify-center">
													{#if item.isApproved}
														<span class="dark:text-green-500 text-green-700">Approved</span>
													{:else if item.isRejected}
														<span class="dark:text-red-500 text-red-700">Rejected</span>
													{:else}
														<Button
															loading={isLoadingConfirm}
															size="sm"
															type="success"
															icon="check"
															on:click={() => handleConfirmRequest(item.id, "accept", index)}>Accept</Button
														>
														<Button
															loading={isLoadingConfirm}
															size="sm"
															type="danger"
															icon="close"
															class="ml-2"
															on:click={() => handleConfirmRequest(item.id, "reject", index)}
														>
															Reject
														</Button>
													{/if}
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				{:else}
					<div class="flex items-center justify-center min-h-[120px]">
						<span>{$_("noTopicRequestChangeNow")}</span>
					</div>
				{/if}
			{:catch error}
				<h3>Error while loading the data</h3>
			{/await}
		</div>
	</ModalWrapper>
{/if}
