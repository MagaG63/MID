import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { Gym } from './gym.model';
import { User } from './user.model';
import { Trainer } from './trainer.model';

@Table({ tableName: 'GymReviews', timestamps: true })
export class GymReviews extends Model<GymReviews> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  declare rate: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  @ForeignKey(() => User)
  declare userId: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  @ForeignKey(() => Trainer)
  declare trainerId: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare content: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  @ForeignKey(() => Gym)
  declare gymId: number;

  @Column({ type: DataType.STRING })
  declare like: string;

  @Column({ type: DataType.STRING })
  declare dislike: string;

  // Связи
  @BelongsTo(() => Gym)
  declare gym: Gym;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  declare user: User;

  @BelongsTo(() => Trainer, { foreignKey: 'trainerId' })
  declare trainer: Trainer;
}
