import dayjs from "dayjs"

function formatDateTime(value: string) {
	if (!value) return ""
	return dayjs(value).format("DD/MM/YYYY hh:mm:ss")
}

export { formatDateTime }
