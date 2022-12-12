export interface IRequestTopicItem {
	topicId: number
	requestType: string
	key: string
	oldContent: string
	content: string
	requestUserId: string
	isApproved: boolean
	isRejected: boolean
	createdAt: Date
	updatedAt: Date
}
