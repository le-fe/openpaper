import {
  Column,
  Model,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { Topic } from '../topic/topic.model';

@Table({
  freezeTableName: true,
  tableName: 'TopicItems',
})
export class TopicItem extends Model<TopicItem> {
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

  @Column
  additionalFields: string;

  @Column({ defaultValue: true })
  isPrivate: boolean;

  @Column({ defaultValue: false })
  isAdultRestricted: boolean;

  @ForeignKey(() => Topic)
  @Column({ field: 'topicId' })
  topicId: number;

  @Column
  creatorId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Topic)
  topic: Topic;
}
