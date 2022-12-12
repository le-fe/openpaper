import Api from "./index"
import type { IRequestTopicChange } from "../interfaces/IRequestTopicChange"

export const createTopicRequestChange = async (payload: IRequestTopicChange) => {
	try {
		return await Api.post("/topic-request-change", payload)
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}

export const getTopicRequestChanges = async (topicId: string) => {
	try {
		return await Api.get(`/topic-request-change/t/${topicId}`)
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}
