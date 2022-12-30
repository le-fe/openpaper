import Api from "./service"

export const uploadFile = async ({ file }: { file: File }) => {
	try {
		let formData = new FormData()
		formData.append("file", file)
		return await Api.post(`/file`, formData)
	} catch (error) {
		console.error(error)
	}
}
