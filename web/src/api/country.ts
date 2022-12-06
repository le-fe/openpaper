import Api from "./index"

export const getCountries = async () => {
	try {
		return await Api.get("/country")
	} catch (error) {
		console.error(error)
	}
}
