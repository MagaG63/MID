import { Column, DataType, Table, Model } from 'sequelize-typescript';

@Table({
  tableName: 'Forums',
  timestamps: true,
})
export class Forum extends Model<Forum> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  author_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  likes: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  comments: string;
}
