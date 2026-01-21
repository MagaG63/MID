import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Trainer } from '../trainer/trainer.model';

@Table({
  tableName: 'trainerRevievs',
  timestamps: true,
})
export class TrainerReview extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare userId: number;

  @ForeignKey(() => Trainer)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare trainerId: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  })
  declare rate: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare text: string;

  @BelongsTo(() => User)
  declare user: User;

  @BelongsTo(() => Trainer)
  declare trainer: Trainer;
}
