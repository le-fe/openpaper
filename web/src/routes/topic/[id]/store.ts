import { writable } from "svelte/store"
import type { Writable } from "svelte/store"
import type { ITopic, IRequestTopicChange } from "@/interfaces"

export let topicDetail: Writable<ITopic> = writable({})
export let topicRequestChange: Writable<IRequestTopicChange> = writable({})
