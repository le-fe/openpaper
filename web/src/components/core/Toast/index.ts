// https://zerodevx.github.io/svelte-toast/
import { toast } from "./stores"
export { default as SvelteToast } from "./SvelteToast.svelte"

const toastSuccess = (message: string) => {
	toast.push(message, {
		theme: {
			"--toastWidth": "400px",
			"--toastBackground": "rgba(72,187,120,0.9)",
		},
	})
}

const toastError = (message: string) => {
	toast.push(message, {
		theme: {
			"--toastWidth": "400px",
			"--toastBackground": "#ff1515",
		},
	})
}

const ToastUtil = {
	toast,
	toastSuccess,
	toastError,
}

export { toast, toastSuccess, toastError }
export default ToastUtil
