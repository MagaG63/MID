'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.Forum, { foreignKey: 'forum_id' });
      Comment.belongsTo(models.Trainer, {
        foreignKey: 'author_id',
        as: 'author',
      });
    }
  }
  Comment.init(
    {
      forum_id: DataTypes.INTEGER,
      author_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      parent_id: DataTypes.INTEGER,
      likes_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.ENUM('active', 'deleted', 'hidden'),
        defaultValue: 'active',
      },
    },
    {
      sequelize,
      modelName: 'Comment',
      tableName: 'forum_comments',
      timestamps: true,
    },
  );
  return Comment;
};
