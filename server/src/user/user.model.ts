import { Table, Column, Model, DataType, CreatedAt, UpdatedAt, HasMany } from 'sequelize-typescript';
import { TrainerReview } from '../trainer-reviews/trainer-review.model';

@Table({ tableName: 'users' })
export class User extends Model<User> {
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

  // Если в БД колонка называется hashpass, но хотим использовать password в коде
  @Column({
    type: DataType.STRING,
    allowNull: false,
    field: 'hashpass', // имя в БД
  })
  declare password: string; // имя в TypeScript коде

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;

  @HasMany(() => TrainerReview)
  reviews: TrainerReview[];
}