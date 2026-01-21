'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForumLike.belongsTo(models.Forum, { foreignKey: 'forum_id' });
      ForumLike.belongsTo(models.Trainer, { foreignKey: 'user_id' });
    }
  }
  ForumLike.init(
    {
      forum_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      type: {
        type: DataTypes.ENUM('like', 'dislike'),
        defaultValue: 'like',
      },
    },
    {
      sequelize,
      modelName: 'ForumLike',
      tableName: 'forum_likes',
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ['forum_id', 'user_id'],
        },
      ],
    },
  );
  return ForumLike;
};
