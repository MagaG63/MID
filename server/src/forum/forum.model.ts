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
  declare title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  declare description: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare author_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare category_id: number;

  @Column({
    type: DataType.ENUM('active', 'closed', 'archived'),
    defaultValue: 'active',
    allowNull: false,
  })
  declare status: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  declare is_pinned: boolean;
}
