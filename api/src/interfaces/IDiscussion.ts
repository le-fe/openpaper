export interface IDiscussion {
  title: string;
  description: string;
  featuredImage: string;
  topicId: number;
  isPrivate: boolean;
  isAdultRestricted: boolean;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
}
