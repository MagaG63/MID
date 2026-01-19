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
import { Gym } from '../gyms/gym.model';
import { User } from '../user/user.model';
import { Trainer } from '../trainer/trainer.model';

// Интерфейс атрибутов для создания (без id)
export interface GymReviewsCreationAttributes {
  rate: number;
  userId?: number;
  trainerId?: number;
  content: string;
  gymId: number;
  like?: string;
  dislike?: string;
}

// Интерфейс для удаления (по ID)
export interface GymReviewsDeletionAttributes {
  where: {
    id: number;
  };
}

// Полный интерфейс модели (для чтения)
export interface GymReviewsAttributes extends GymReviewsCreationAttributes {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

@Table({ tableName: 'GymReviews', timestamps: true })
export class GymReviews extends Model<
  GymReviews,
  GymReviewsCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
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

  @Column({ type: DataType.STRING, allowNull: true })
  declare like: string;

  @Column({ type: DataType.STRING, allowNull: true })
  declare dislike: string;

  // Связи
  @BelongsTo(() => Gym)
  declare gym: Gym;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  declare user: User;

  @BelongsTo(() => Trainer, { foreignKey: 'trainerId' })
  declare trainer: Trainer;

  // Sequelize timestamps
  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
