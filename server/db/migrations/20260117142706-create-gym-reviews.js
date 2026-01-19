'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GymReviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      rate: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: true, // может быть null если отзыв от тренера
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      trainerId: {
        type: Sequelize.INTEGER,
        allowNull: true, // может быть null если отзыв от пользователя
        references: {
          model: 'Trainers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      gymId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Gyms',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      like: {
         type: Sequelize.STRING
      },
      dislike: {
        type: Sequelize.STRING
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

    // Уникальный индекс: один отзыв на gym от одного user/trainer
    await queryInterface.addConstraint('GymReviews', {
      fields: ['gymId', 'userId'],
      type: 'unique',
      name: 'unique_user_gym_review',
    });

    await queryInterface.addConstraint('GymReviews', {
      fields: ['gymId', 'trainerId'],
      type: 'unique',
      name: 'unique_trainer_gym_review',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('GymReviews');
  },
};
