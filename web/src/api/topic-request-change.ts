import Api from "./index"
import type { IRequestTopicItem } from "../interfaces/IRequestTopicItem"

export const REQUEST_TOPIC_TYPE = {
	ADD: "add",
	UPDATE: "update",
	REMOVE: "remove",
	ADD_ITEM: "add-item",
	UPDATE_ITEM: "update-item",
	REMOVE_ITEM: "remove-item",
}

export const createTopicRequestChange = async (payload: IRequestTopicItem) => {
	return await Api.post("/topic-request-item", payload)
}

export const getTopicRequestChanges = async (topicId: string) => {
	try {
		return await Api.get(`/topic-request-item/t/${topicId}`)
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export const confirmTopicRequestChange = async (payload) => {
	try {
		return await Api.post("/topic-request-item/confirm", payload)
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}
