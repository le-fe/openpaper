import {
  Column,
  Model,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Discussion } from '../discussion/discussion.model';

@Table({
  tableName: 'Messages',
})
export class Message extends Model<Message> {
  @Column
  content: string;

  @ForeignKey(() => Discussion)
  @Column({ field: 'discussionId' })
  discussionId: number;

  @Column
  creatorId: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @BelongsTo(() => Discussion)
  discussion: Discussion;
}
