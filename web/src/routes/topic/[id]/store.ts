import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { ITopic, IRequestTopicChange } from "@/interfaces"
import { getTopicById } from "@/api/topic"

export let topicDetail: Writable<ITopic> = writable({})
export let topicRequestChange: Writable<IRequestTopicChange> = writable({})

export async function fetchTopicDetail(topicId: number) {
	const res = await getTopicById(topicId)
	if (res) {
		if (res.types) {
			res.types = res.types.split(",")
		}
		topicDetail.set(res)
		return res
	} else {
		throw new Error(res)
	}
}
