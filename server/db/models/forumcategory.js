'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ForumCategory.hasMany(models.Forum, { foreignKey: 'category_id' });
    }
  }
  ForumCategory.init(
    {
      name: DataTypes.STRING,
      slug: DataTypes.STRING,
      description: DataTypes.TEXT,
      icon: DataTypes.STRING,
      color: DataTypes.STRING,
      is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: 'ForumCategory',
      tableName: 'forum_categories',
      timestamps: true,
    },
  );
  return ForumCategory;
};
