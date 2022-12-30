import {
  Column,
  Model,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Topic } from '../topic/topic.model';
import { Message } from '../message/message.model';

@Table({
  tableName: 'Discussions',
})
export class Discussion extends Model<Discussion> {
  @Column
  title: string;

  @Column
  description: string;

  @Column
  featuredImage: string;

  @ForeignKey(() => Topic)
  @Column({ field: 'topicId' })
  topicId: number;

  @Column({ defaultValue: true })
  isPrivate: boolean;

  @Column({ defaultValue: false })
  isAdultRestricted: boolean;

  @ForeignKey(() => User)
  @Column({ field: 'creatorId' })
  creatorId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Message)
  comments: Message[];
}
