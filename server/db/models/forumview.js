'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumView extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForumView.belongsTo(models.Forum, { foreignKey: 'forum_id' });
      ForumView.belongsTo(models.User, {
        foreignKey: 'user_id',
        optional: true,
      });
    }
  }
  ForumView.init(
    {
      forum_id: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      ip_address: DataTypes.STRING,
      user_agent: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'ForumView',
      tableName: 'forum_views',
      timestamps: true,
    },
  );
  return ForumView;
};
