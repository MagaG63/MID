'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('forum_likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      forum_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Forums',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      type: {
        type: Sequelize.ENUM('like', 'dislike'),
        defaultValue: 'like',
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });

    // Добавляем уникальный индекс
    await queryInterface.addIndex('forum_likes', ['forum_id', 'user_id'], {
      unique: true,
      name: 'forum_likes_forum_user_unique',
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('forum_likes');
  },
};
