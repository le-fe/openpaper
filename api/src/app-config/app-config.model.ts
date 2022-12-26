import {
  Column,
  Model,
  Table,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

@Table({
  tableName: 'AppConfigs',
})
export class AppConfig extends Model<AppConfig> {
  @PrimaryKey
  @Column
  name: string;

  @Column
  label: string;

  @Column
  type: string;

  @Column
  value: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
