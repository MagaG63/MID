import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { GymReviews } from './GymReviews.model';

export interface UserCreationAttributes {
  name: string;
  email: string;
  hashpass: string;
}

@Table({ tableName: 'Users', timestamps: true })
export class User extends Model<User, UserCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare hashpass: string;

  // Один пользователь может оставить много отзывов о разных залах
  @HasMany(() => GymReviews, { foreignKey: 'userId' })
  declare reviews: GymReviews[];
}
