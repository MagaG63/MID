import {
  Column,
  DataType,
  Table,
  Model,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';

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
  category_id: number;

  @Column({
    type: DataType.ENUM('active', 'closed', 'archived'),
    defaultValue: 'active',
    allowNull: false,
  })
  status: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  })
  is_pinned: boolean;
}
