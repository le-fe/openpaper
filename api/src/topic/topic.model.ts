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
import { TopicItem } from '../topic-item/topic-item.model';
import { TopicRequestItem } from '../topic-request-item/topic-request-item.model';
import { Discussion } from '../discussion/discussion.model';

@Table({
  tableName: 'Topics',
})
export class Topic extends Model<Topic> {
  @Column
  name: string;

  @Column
  types: string;

  @Column
  description: string;

  @Column
  featuredImage: string;

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

  @HasMany(() => TopicItem)
  items: TopicItem[];

  @HasMany(() => TopicRequestItem)
  requestChanges: TopicRequestItem[];

  @HasMany(() => Discussion)
  discussions: Discussion[];
}
