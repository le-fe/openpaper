import type { IMedia } from "./IMedia"

export interface ITopic {
	name: string
	types: string
	description: string
	featuredImage: string
	isPrivate: boolean
	isAdultRestricted: boolean
	creatorId: number
	createdAt: Date
	updatedAt: Date
	medias: IMedia[]
}
