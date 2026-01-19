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
 await queryInterface.bulkInsert('Gyms', [
    {
      name: 'DDX Fitness',
      contact: '+7 (495) 777-11-22',
      price: 1900-2999,
      desc: 'Сетевой фитнес-клуб DDX с современными тренажерами, групповыми занятиями и зонами для кардио. Удобное расписание, опытные инструкторы.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'World Class',
      contact: '+7 (495) 937-77-77',
      price: 3600-14200,
      desc: 'Премиум фитнес-клуб с бассейном, SPA, групповыми программами и просторным тренажерным залом. Высокий уровень сервиса.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      name: 'X-Fit',
      contact: '+7 (495) 645-44-55',
      price: 2000-9200,
      desc: 'Популярная сеть X-Fit с разнообразными групповыми занятиями, функциональным тренингом и качественным оборудованием.',
      createdAt: new Date(),
      updatedAt: new Date(),
    },

     {
      name: 'Spirit-fitness',
      contact: '+7 (495) 645-44-55',
      price: 1700-3000,
      desc: 'Популярная сеть X-Fit с разнообразными групповыми занятиями, функциональным тренингом и качественным оборудованием.',
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  ]);



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

    const trainers = [
      {
        email: 'coach@alex.com',
        hashpass: bcrypt.hashSync('trainer789', 12),
        name: 'Алексей Тренер',
        description: 'Сертифицированный тренер по фитнесу с 10-летним опытом',
        profileImage: '/uploads/trainers/alexey.jpg',
        qualificationImages: [
          '/uploads/qualifications/alexey-cert1.jpg',
          '/uploads/qualifications/alexey-cert2.jpg',
        ],
      },
      {
        email: 'maria@fitness.com',
        hashpass: bcrypt.hashSync('trainer456', 12),
        name: 'Мария Козлова',
        description: 'Мастер спорта по бодибилдингу',
        profileImage: '/uploads/trainers/maria.jpg',
        qualificationImages: ['/uploads/qualifications/maria-gold.jpg'],
      },
    ];
    await queryInterface.bulkInsert('Trainers', trainers, {});


     await queryInterface.bulkInsert('GymReviews', [
      {
        rate: 5,
        userId: null,
        trainerId: 1,
        content: 'Отличный зал! Новое оборудование, чисто, просторно. Тренируюсь уже 3 месяца, результат на лицо.',
        gymId: 1,
        like: null,
        dislike: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rate: 4,
        userId: 2,
        trainerId: null,
        content: 'Хороший зал для кардио и групповых занятий. Штанги могли бы быть поновее, но в целом всё устраивает.',
        gymId: 1,
        like: 'Кардио зона',
        dislike: 'Старые штанги',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rate: 3,
        userId: 3,
        trainerId: null,
        content: 'Средний зал. Очереди на тренажёры в вечернее время, душ только 2 кабинки на всех.',
        gymId: 2,
        like: null,
        dislike: 'Мало душевых',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        rate: 5,
        userId: 4,
        trainerId: null,
        content: 'Лучший зал в районе! Профессиональное оборудование, отличная вентиляция, дружелюбный персонал.',
        gymId: 2,
        like: 'Всё',
        dislike: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
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
