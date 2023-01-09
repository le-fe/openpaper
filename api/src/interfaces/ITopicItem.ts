export interface ITopicItem {
  name: string;
  types: string;
  description: string;
  featuredImage: string;
  isPrivate: boolean;
  isAdultRestricted: boolean;
  creatorId: string;
  createdAt: Date;
  updatedAt: Date;
  additionalFields: string;
}
