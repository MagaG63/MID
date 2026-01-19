import { Table, Column, Model, DataType } from 'sequelize-typescript';

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
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  declare id: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare email: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  declare hashpass: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare name: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  declare description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  declare profileImage: string;

  @Column({ 
    type: DataType.ARRAY(DataType.STRING), 
    allowNull: false,
    defaultValue: []
  })
  declare qualificationImages: string[];
}
