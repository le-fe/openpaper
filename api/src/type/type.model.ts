import {
  Column,
  Model,
  Table,
  CreatedAt,
  UpdatedAt,
  PrimaryKey,
} from 'sequelize-typescript';

@Table({
  tableName: 'Types',
})
export class Type extends Model<Type> {
  @PrimaryKey
  @Column
  name: string;

  @Column
  featuredImage: string;

  @Column({ defaultValue: false })
  isTrending: boolean;

  @Column
  numberOfTopics: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
