'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FitnessClub extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  FitnessClub.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    website: DataTypes.STRING,
    rating: DataTypes.FLOAT,
    priceRange: DataTypes.STRING,
    workingHours: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'FitnessClub',
  });
  return FitnessClub;
};