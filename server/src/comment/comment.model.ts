import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Forum } from '../forum/forum.model';

@Table({
  tableName: 'forum_comments',
  timestamps: true,
})
export class Comment extends Model<Comment> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @ForeignKey(() => Forum)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  forum_id: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  author_id: number;

  @Column({
    type: DataType.ENUM('user', 'trainer'),
    allowNull: false,
    defaultValue: 'user',
  })
  author_type: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  parent_id: number;

  @Column({
    type: DataType.INTEGER,
    defaultValue: 0,
    allowNull: false,
  })
  likes_count: number;

  @Column({
    type: DataType.ENUM('active', 'deleted', 'hidden'),
    defaultValue: 'active',
    allowNull: false,
  })
  status: string;

  @BelongsTo(() => Forum)
  forum: Forum;
}
