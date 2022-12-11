import {
  Column,
  Model,
  Table,
  HasMany,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Topic } from '../topic/topic.model';
import { Media } from '../media/media.model';

@Table({
  tableName: 'Users',
})
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column
  avatar: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @Column
  permission: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;

  @HasMany(() => Topic)
  topics: Topic[];

  @HasMany(() => Topic)
  medias: Media[];
}
