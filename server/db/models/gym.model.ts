import {
  Table,
  Column,
  Model,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { GymReviews } from './GymReviews.model';

@Table({ tableName: 'Gyms', timestamps: true })
export class Gym extends Model<Gym> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.STRING })
  declare contact: string;

  @Column({ type: DataType.STRING })
  declare price: string;

  @Column({ type: DataType.TEXT })
  declare desc: string;

  // Один зал имеет много отзывов
  @HasMany(() => GymReviews)
  declare reviews: GymReviews[];
}
