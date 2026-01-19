import { Table, Column, Model, DataType } from 'sequelize-typescript';
// Интерфейс атрибутов для создания (без id)
export interface UserCreationAttributes {
  name: string;
  email: string;
  hashpass: string;
}

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model<User, UserCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare email: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare hashpass: string;
}
