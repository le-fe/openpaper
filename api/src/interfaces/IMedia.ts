export interface IMedia {
  name: string;
  types: string;
  description: string;
  featuredImage: string;
  isPrivate: boolean;
  isAdultRestricted: boolean;
  creatorId: number;
  createdAt: Date;
  updatedAt: Date;
  additionalFields: string;
}
