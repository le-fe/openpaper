import Api from "./index"
import type { IRequestTopicItem } from "../interfaces/IRequestTopicItem"

export const createTopicRequestChange = async (payload: IRequestTopicItem) => {
	try {
		return await Api.post("/topic-request-item", payload)
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
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
