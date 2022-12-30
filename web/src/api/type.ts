import Api from "./service"

export const getTrendingTypes = async () => {
	try {
		return await Api.get("/type")
	} catch (error) {
		console.error(error)
	}
}

export const getTopicTags = async () => {
	try {
		return await Api.get("/type")
	} catch (error) {
		console.error(error)
	}
}
