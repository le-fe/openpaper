import Api from "./service"

export const getCountries = async () => {
	try {
		return await Api.get("/country")
	} catch (error) {
		console.error(error)
	}
}
