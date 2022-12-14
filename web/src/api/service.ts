import axios from "axios"

const { VITE_APP_ROOT_API } = import.meta.env

// Create a instance of axios to use the same base url.
const axiosAPI = axios.create({
	baseURL: VITE_APP_ROOT_API, // it's not recommended to have this info here.
})

// implement a method to execute all the request from here.
const apiRequest = (method: string, url: string, request?: string) => {
	const headers = {
		authorization: "",
	}
	//using the axios instance to perform the request that received from each http method
	return axiosAPI({
		method,
		url,
		data: request,
		headers,
	})
		.then((res) => {
			return Promise.resolve({ ok: true, data: res.data })
		})
		.catch((err) => {
			return Promise.resolve({ ok: false, error: err?.response?.data?.message })
			// return Promise.reject(err);
		})
}

// function to execute the http get request
const get = (url: string, request?: string) => apiRequest("get", url, request)

// function to execute the http delete request
const deleteRequest = (url: string, request?: string) => apiRequest("delete", url, request)

// function to execute the http post request
const post = (url: string, request?: string) => apiRequest("post", url, request)

// function to execute the http put request
const put = (url: string, request?: string) => apiRequest("put", url, request)

// function to execute the http path request
const patch = (url: string, request?: string) => apiRequest("patch", url, request)

// expose your method to other services or actions
const API = {
	get,
	delete: deleteRequest,
	post,
	put,
	patch,
}
export default API
