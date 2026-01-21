// seed-forum-comments.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Получаем ID форумов
    const forums = await queryInterface.sequelize.query(
      'SELECT id FROM Forums ORDER BY id',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    await queryInterface.bulkInsert(
      'forum_comments',
      [
        {
          forum_id: forums[0].id,
          author_id: 1,
          content:
            'Отличный вопрос! Начинать лучше с базовых упражнений: приседания, отжимания, подтягивания. Не гонитесь за весами, сначала освойте технику.',
          parent_id: null,
          likes_count: 5,
          status: 'active',
          createdAt: new Date('2024-01-10 14:30:00'),
          updatedAt: new Date('2024-01-10 14:30:00'),
        },
        {
          forum_id: forums[0].id,
          author_id: 1,
          content:
            'Советую начать с 2-3 тренировок в неделю по 45-60 минут. Обязательно включайте разминку и заминку. И не забывайте про отдых!',
          parent_id: null,
          likes_count: 3,
          status: 'active',
          createdAt: new Date('2024-01-10 16:45:00'),
          updatedAt: new Date('2024-01-10 16:45:00'),
        },
        {
          forum_id: forums[1].id,
          author_id: 1,
          content:
            'Планка - одно из лучших упражнений на пресс. Делайте по 3 подхода по 60 секунд. Также рекомендую велосипед и скручивания.',
          parent_id: null,
          likes_count: 8,
          status: 'active',
          createdAt: new Date('2024-01-12 10:15:00'),
          updatedAt: new Date('2024-01-12 10:15:00'),
        },
        {
          forum_id: forums[2].id,
          author_id: 1,
          content:
            'Сидел на белковой диете 3 месяца. Сбросил 8 кг жира, прибавил в силе. Главное - пить много воды и следить за состоянием почек.',
          parent_id: null,
          likes_count: 12,
          status: 'active',
          createdAt: new Date('2024-01-15 09:20:00'),
          updatedAt: new Date('2024-01-15 09:20:00'),
        },
        {
          forum_id: forums[3].id,
          author_id: 1,
          content:
            'После травмы колена хорошо помогает плавание и упражнения в воде. Также рекомендую ЛФК под руководством специалиста.',
          parent_id: null,
          likes_count: 6,
          status: 'active',
          createdAt: new Date('2024-01-18 15:40:00'),
          updatedAt: new Date('2024-01-18 15:40:00'),
        },
        {
          forum_id: forums[4].id,
          author_id: 1,
          content:
            'При выборе дорожки смотрите на максимальный вес пользователя, размер полотна и мощность двигателя. Для дома достаточно 2-2.5 л.с.',
          parent_id: null,
          likes_count: 7,
          status: 'active',
          createdAt: new Date('2024-01-20 11:10:00'),
          updatedAt: new Date('2024-01-20 11:10:00'),
        },
        {
          forum_id: forums[5].id,
          author_id: 1,
          content:
            'Поздравляю с отличным результатом! 2 кг за месяц - это очень хороший прогресс. Продолжайте в том же духе!',
          parent_id: null,
          likes_count: 9,
          status: 'active',
          createdAt: new Date('2024-01-22 18:25:00'),
          updatedAt: new Date('2024-01-22 18:25:00'),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('forum_comments', null, {});
  },
};
