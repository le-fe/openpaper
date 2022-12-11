import Api from "./index"
import type { IRequestTopicChange } from "../interfaces/IRequestTopicChange"

export const createTopicRequestChange = async (payload: IRequestTopicChange) => {
	try {
		return await Api.post("/topic-request-change", payload)
	} catch (error) {
		throw new Error(error?.response?.data?.message)
	}
}
