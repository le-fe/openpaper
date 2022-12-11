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

@Table({
  tableName: 'TopicRequestChanges',
})
export class TopicRequestChange extends Model<TopicRequestChange> {
  @ForeignKey(() => Topic)
  @Column({ field: 'topicId' })
  topicId: number;

  @Column
  name: string;

  @Column
  types: string;

  @Column
  description: string;

  @Column
  featuredImage: string;

  @ForeignKey(() => User)
  @Column({ field: 'creatorId' })
  creatorId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  updatedMedias: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
