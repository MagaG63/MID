'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const users = [
      {
        name: 'Админ Панель',
        email: 'admin@fitnessapp.com',
        hashpass: bcrypt.hashSync('admin2026', 12),
      },
      {
        name: 'Иван Сидоров',
        email: 'ivan@example.com',
        hashpass: bcrypt.hashSync('password123', 12),
      },
      {
        name: 'Мария Козлова',
        email: 'maria@fitness.com',
        hashpass: bcrypt.hashSync('qwerty456', 12),
      },
      {
        name: 'Алексей Тренер',
        email: 'coach@alex.com',
        hashpass: bcrypt.hashSync('trainer789', 12),
      },
      {
        name: 'Анна Петрова',
        email: 'anna@example.com',
        hashpass: bcrypt.hashSync('user2026', 12),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
