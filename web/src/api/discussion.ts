import Api from "./service"

const create = async (payload) => await Api.post("/discussion", payload)
const list = async (queries) => Api.get(`/discussion?${new URLSearchParams(queries || {}).toString()}`, queries)
const get = async (id: string) => Api.get(`/discussion/${id}`)

const listMessage = async (discussionId: string, queries: object) => Api.get(`/discussion/${discussionId}/message/`)
const createMessage = async (discussionId: string, payload: object) => Api.post(`/discussion/${discussionId}/message/`, payload)

const DiscussionRepository = {
	create,
	list,
	get,
	listMessage,
	createMessage,
}

export default DiscussionRepository
