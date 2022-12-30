export interface IPagination {
	currentPage: number
	limit?: number
	total: number
	nextPage?: number
	prevPage?: number
}
