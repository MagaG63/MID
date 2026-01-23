// seed-forum-likes.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Получаем ID форумов
    // const forums = await queryInterface.sequelize.query(
    //   'SELECT id FROM Forums ORDER BY id',
    //   { type: queryInterface.sequelize.QueryTypes.SELECT },
    // );

    // // Получаем ID пользователей
    // const users = await queryInterface.sequelize.query(
    //   'SELECT id FROM Users ORDER BY id',
    //   { type: queryInterface.sequelize.QueryTypes.SELECT },
    // );

    // const forumLikes = [];

    // Создаем лайки для каждого форума от разных пользователей
  //   forums.forEach((forum, forumIndex) => {
  //     // Для каждого форума создаем лайки от разных пользователей
  //     const likesCount = Math.min(3 + forumIndex, users.length); // Не больше чем пользователей

  //     for (let i = 0; i < likesCount; i++) {
  //       forumLikes.push({
  //         forum_id: forum.id,
  //         user_id: users[i].id,
  //         type: 'like',
  //         createdAt: new Date(),
  //         updatedAt: new Date(),
  //       });
  //     }
  //   }
  // );

    // await queryInterface.bulkInsert('forum_likes', forumLikes, {});
  },

  async down(queryInterface, Sequelize) {
    // await queryInterface.bulkDelete('forum_likes', null, {});
  },
};
