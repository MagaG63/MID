'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class GymReviews extends Model {
    static associate(models) {
      // Отзыв принадлежит залу
      GymReviews.belongsTo(models.Gym, { foreignKey: 'gymId' });
      // Отзыв принадлежит пользователю (может быть null)
      GymReviews.belongsTo(models.User, { foreignKey: 'userId' });
      // Отзыв принадлежит тренеру (может быть null)
      GymReviews.belongsTo(models.Trainer, { foreignKey: 'trainerId' });

      // Зал имеет много отзывов
      models.Gym.hasMany(GymReviews, { foreignKey: 'gymId' });
      // Пользователь имеет много отзывов
      models.User.hasMany(GymReviews, { foreignKey: 'userId' });
      // Тренер имеет много отзывов
      models.Trainer.hasMany(GymReviews, { foreignKey: 'trainerId' });
    }
  }

  GymReviews.init(
    {
      rate: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      trainerId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      gymId: DataTypes.INTEGER,
      like: DataTypes.STRING,
      dislike: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'GymReviews',
    },
  );

  return GymReviews;
};
