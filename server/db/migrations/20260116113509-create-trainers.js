'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Trainers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      email: {
        // ✅ Добавляем email для авторизации
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      hashpass: {
        // ✅ Пароль для тренеров
        type: Sequelize.TEXT,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      profileImage: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      qualificationImages: {
        type: Sequelize.TEXT,
        allowNull: false,
        defaultValue: '[]',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Trainers');
  },
};
