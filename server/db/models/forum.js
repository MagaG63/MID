'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forum extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Forum.hasMany(models.Comment, { foreignKey: 'forum_id' });
      Forum.hasMany(models.ForumView, { foreignKey: 'forum_id' });
      Forum.hasMany(models.ForumLike, { foreignKey: 'forum_id' });
      Forum.belongsTo(models.Trainer, {
        foreignKey: 'author_id',
        as: 'author',
      });
      Forum.belongsTo(models.ForumCategory, { foreignKey: 'category_id' });
    }
  }
  Forum.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      author_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      status: {
        type: DataTypes.ENUM('active', 'closed', 'archived'),
        defaultValue: 'active',
      },
      is_pinned: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Forum',
      timestamps: true,
    },
  );
  return Forum;
};
