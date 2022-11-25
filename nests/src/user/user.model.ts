import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Topic } from '../topic/topic.model';

@Table
export class User extends Model<User> {
  @Column
  username: string;

  @Column
  password: string;

  @Column
  firstName: string;

  @Column
  lastName: string;

  @Column({ defaultValue: true })
  isActive: boolean;

  @HasMany(() => Topic)
  topics: Topic[];
}
