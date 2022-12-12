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
import { Media } from '../media/media.model';
import { TopicRequestItem } from '../topic-request-item/topic-request-item.model';

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

  @HasMany(() => Media)
  medias: Media[];

  @HasMany(() => TopicRequestItem)
  requestChanges: TopicRequestItem[];
}
