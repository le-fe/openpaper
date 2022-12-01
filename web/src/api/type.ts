import Api from "./index"

export const getTrendingTypes = async () => {
	try {
		return await Api.get("/type")
	} catch (error) {
		console.error(error)
	}
}
