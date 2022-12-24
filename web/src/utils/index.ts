import dayjs from "dayjs"

const { VITE_APP_ROOT_MEDIA } = import.meta.env

function isUrlImage(url: string) {
	return new Promise(function (resolve, reject) {
		var timer: any,
			img = new Image()
		img.onerror = img.onabort = function () {
			clearTimeout(timer)
			reject(false)
		}
		img.onload = function () {
			clearTimeout(timer)
			resolve(url)
		}
		img.src = url
	})
}

function formatDateTime(value: string) {
	if (!value) return ""
	return dayjs(value).format("DD/MM/YYYY hh:mm:ss")
}

function buildImageUrl(fileUrl: string) {
	return `${VITE_APP_ROOT_MEDIA}${fileUrl}`
}

export { isUrlImage, formatDateTime, buildImageUrl }
