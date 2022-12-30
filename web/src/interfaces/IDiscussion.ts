export interface IDiscussion {
	title: string
	description?: string
	topicId?: number
	featuredImage?: string
	isPrivate?: boolean
	isAdultRestricted?: boolean
	creatorId?: number
	createdAt?: Date
	updatedAt?: Date
}
