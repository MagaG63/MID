// seed-forum-categories.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'forum_categories',
      [
        {
          name: 'Общее',
          slug: 'general',
          description: 'Общие вопросы и обсуждения',
          icon: 'bi-chat-dots',
          color: '#3498db',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Тренировки',
          slug: 'workouts',
          description: 'Обсуждение тренировок и программ',
          icon: 'bi-activity',
          color: '#2ecc71',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Питание',
          slug: 'nutrition',
          description: 'Вопросы питания и диет',
          icon: 'bi-egg-fried',
          color: '#e74c3c',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Здоровье',
          slug: 'health',
          description: 'Вопросы здоровья и восстановления',
          icon: 'bi-heart-pulse',
          color: '#9b59b6',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Оборудование',
          slug: 'equipment',
          description: 'Обсуждение спортивного оборудования',
          icon: 'bi-tools',
          color: '#f39c12',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Новичкам',
          slug: 'beginners',
          description: 'Вопросы для начинающих',
          icon: 'bi-person',
          color: '#1abc9c',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Достижения',
          slug: 'achievements',
          description: 'Делимся успехами и результатами',
          icon: 'bi-trophy',
          color: '#e67e22',
          is_active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('forum_categories', null, {});
  },
};
