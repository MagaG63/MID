import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  timestamps: true,
})
export class User extends Model<User> {
//   @Column({
//     type: DataType.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   })
//   id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  hashpass: string;
}
