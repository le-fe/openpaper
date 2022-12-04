import { Column, Model, Table, PrimaryKey } from 'sequelize-typescript';

@Table({
  tableName: 'Countries',
})
export class Country extends Model<Country> {
  @PrimaryKey
  @Column
  code: String;

  @Column
  name: string;

  @Column
  flag: string;
}
