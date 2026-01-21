// training-program/training-program.model.ts
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
import { Trainer } from '../trainer/trainer.model';

@Table({ tableName: 'traineProgramms' })
export class TrainingProgram extends Model<TrainingProgram> {
  @ForeignKey(() => Trainer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare trainerId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare price: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare contact: string; // Telegram link

  @BelongsTo(() => Trainer)
  declare trainer: Trainer;

  @CreatedAt
  declare createdAt: Date;

  @UpdatedAt
  declare updatedAt: Date;
}
