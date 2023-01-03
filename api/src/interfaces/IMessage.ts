export interface IMessage {
  content: string;
  discussionId: number;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IMessageQueries {
  discussionId?: number;
}
