import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { ITopic, IRequestTopicChange } from "@/interfaces"
import { getTopicById } from "@/api/topic"

export let topicDetail: Writable<ITopic> = writable({})
export let topicRequestChange: Writable<IRequestTopicChange> = writable({})

export async function fetchTopicDetail(topicId: number) {
	const { data } = await getTopicById(topicId)
	if (data) {
		if (data.types) {
			data.types = data.types.split(",")
		}
		topicDetail.set(data)
		return data
	} else {
		throw new Error("Error")
	}
}
