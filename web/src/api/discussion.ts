import Api from "./service"

const create = async (payload) => await Api.post("/discussion", payload)

const list = async (queries) => Api.get(`/discussion?${new URLSearchParams(queries || {}).toString()}`, queries)

const get = async (id: string) => {
	try {
		const response = await Api.get(`/discussion/${id}`)
		return response
	} catch (error) {
		console.error(error)
	}
}

const DiscussionRepository = {
	create,
	list,
	get,
}

export default DiscussionRepository
