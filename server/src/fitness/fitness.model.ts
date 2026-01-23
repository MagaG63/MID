import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'FitnessClubs',
  timestamps: true,
})
export class Fitness extends Model<Fitness> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  declare description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare website: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  declare rating: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare priceRange: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare workingHours: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  declare image: string;
}
