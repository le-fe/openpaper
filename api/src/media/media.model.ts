import {
    Column,
    Model,
    Table,
    ForeignKey,
    CreatedAt,
    UpdatedAt,
  } from 'sequelize-typescript';
import { Topic } from '../topic/topic.model';
import { User } from '../user/user.model';
  
  @Table
  export class Media extends Model<Media> {
    @Column
    name: string;
  
    @Column
    types: string;

    @Column
    content: string;
  
    @Column
    description: string;
  
    @Column
    featuredImage: string;
  
    @Column({ defaultValue: true })
    isPrivate: boolean;
  
    @Column({ defaultValue: false })
    isAdultRestricted: boolean;

    @ForeignKey(() => Topic)
    @Column({ field: 'topicId' })
    topicId: number;
  
    @ForeignKey(() => User)
    @Column({ field: 'creatorId' })
    creatorId: number;
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  }
  