'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Laboratory extends Model {
    static associate(models) {
      // define association here
    }
  }
  
  Laboratory.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stated: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.STRING,
      },
      post: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: 'Laboratory',
      tableName: 'Laboratories',
    }
  );
  
  return Laboratory;
};
