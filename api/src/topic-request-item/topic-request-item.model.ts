import {
  Column,
  Model,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Topic } from '../topic/topic.model';

@Table({
  tableName: 'TopicRequestItems',
})
export class TopicRequestItem extends Model<TopicRequestItem> {
  @ForeignKey(() => Topic)
  @Column({ field: 'topicId' })
  topicId: number;

  @Column
  requestType: string;

  @Column
  key: string;

  @Column
  oldContent: string;

  @Column
  content: string;

  @Column
  requestUserId: string;

  @Column
  isApproved: boolean;

  @Column
  isRejected: boolean;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
