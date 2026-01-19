import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'FitnessClubs',
  timestamps: true,
})
export class Fitness extends Model<Fitness> {
  //   @Column({
  //     type: DataType.INTEGER,
  //     autoIncrement: true,
  //     primaryKey: true,
  //   })
  //   id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  website: string;

  @Column({
    type: DataType.FLOAT,
    allowNull: true,
  })
  rating: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  priceRange: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  workingHours: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image: string;

  //   @Column({
  //     type: DataType.DATE,
  //     allowNull: false,
  //     defaultValue: DataType.NOW,
  //   })
  //   createdAt: Date;

  //   @Column({
  //     type: DataType.DATE,
  //     allowNull: false,
  //     defaultValue: DataType.NOW,
  //   })
  //   updatedAt: Date;
}
