// trainer.model.ts - УПРОЩЕННАЯ ВЕРСИЯ
import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { TrainingProgram } from '../training-program/training-program.model';
import { TrainerReview } from '../trainer-reviews/trainer-review.model';

@Table({ tableName: 'trainers' })
export class Trainer extends Model<Trainer> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'hashpass',
  })
  declare password: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare profileImage: string;

  @Column({
    type: DataType.TEXT, // В SQLite используем TEXT вместо JSON
    allowNull: true,
  })
  declare qualificationImages: string;

  // Связь с программами тренировок
  @HasMany(() => TrainingProgram)
  declare trainingPrograms: TrainingProgram[];

  // Связь с отзывами
  @HasMany(() => TrainerReview)
  declare reviews: TrainerReview[];

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}