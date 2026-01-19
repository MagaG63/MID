import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  Default,
} from 'sequelize-typescript';
import { GymReviews } from './GymReviews.model';

export interface TrainerCreationAttributes {
  email: string;
  hashpass: string;
  name: string;
  profileImage: string;
  qualificationImages: string[];
  description?: string;
}

@Table({ tableName: 'Trainers', timestamps: true })
export class Trainer extends Model<Trainer, TrainerCreationAttributes> {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare hashpass: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string | null;

  @Column({ type: DataType.STRING, allowNull: false })
  declare profileImage: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('qualificationImages');
      return rawValue ? JSON.parse(rawValue as string) : [];
    },
    set(value: string[]) {
      this.setDataValue('qualificationImages', JSON.stringify(value) as any);
    },
  })
  @Default('[]')
  declare qualificationImages: string[];

  // Один тренер может оставить много отзывов о разных залах
  @HasMany(() => GymReviews, { foreignKey: 'trainerId' })
  declare reviews: GymReviews[];
}
