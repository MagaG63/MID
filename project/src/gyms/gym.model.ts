import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Gyms',
  timestamps: true,
  underscored: false,
})
export class Gym extends Model<Gym> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
  })
  declare contact: string;

  @Column({
    type: DataType.INTEGER,
  })
  declare price: number;

  @Column({
    type: DataType.TEXT,
  })
  declare desc: string;
}
