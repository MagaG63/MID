// seed-forum-views.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Получаем ID форумов
    const forums = await queryInterface.sequelize.query(
      'SELECT id FROM Forums ORDER BY id',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    // Получаем ID пользователей
    const users = await queryInterface.sequelize.query(
      'SELECT id FROM Users ORDER BY id',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

    // const views = [];

    // // Создаем просмотры для каждого форума
    // forums.forEach((forum, forumIndex) => {
    //   // Просмотры от зарегистрированных пользователей
    //   users.forEach((user, userIndex) => {
    //     views.push({
    //       forum_id: forum.id,
    //       user_id: user.id,
    //       ip_address: `192.168.1.${(userIndex % 254) + 1}`,
    //       user_agent:
    //         userIndex % 2 === 0 ? 'Chrome/120.0.0.0' : 'Firefox/115.0',
    //       createdAt: new Date(
    //         Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
    //       ),
    //       updatedAt: new Date(),
    //     });
    //   });

    //   // Добавляем несколько анонимных просмотров
    //   for (let i = 0; i < 5; i++) {
    //     views.push({
    //       forum_id: forum.id,
    //       user_id: null,
    //       ip_address: `192.168.2.${(i % 254) + 1}`,
    //       user_agent: i % 2 === 0 ? 'Chrome/120.0.0.0' : 'Safari/17.0',
    //       createdAt: new Date(
    //         Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000,
    //       ),
    //       updatedAt: new Date(),
    //     });
    //   }
    // });

    // await queryInterface.bulkInsert('forum_views', views, {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('forum_views', null, {});
  },
};
