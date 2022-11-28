import {
  Column,
  Model,
  Table,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../user/user.model';

@Table
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
}
