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
        price: '1900-2999',
        desc: 'Сетевой фитнес-клуб DDX с современными тренажерами, групповыми занятиями и зонами для кардио. Удобное расписание, опытные инструкторы.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'World Class',
        contact: '+7 (495) 937-77-77',
        price: '3600-14200',
        desc: 'Премиум фитнес-клуб с бассейном, SPA, групповыми программами и просторным тренажерным залом. Высокий уровень сервиса.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'X-Fit',
        contact: '+7 (495) 645-44-55',
        price: '2000-9200',
        desc: 'Популярная сеть X-Fit с разнообразными групповыми занятиями, функциональным тренингом и качественным оборудованием.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: 'Spirit-fitness',
        contact: '+7 (495) 645-44-55',
        price: '1700-3000',
        desc: 'Популярная сеть Spirit-fitness с разнообразными групповыми занятиями, функциональным тренингом и качественным оборудованием.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = [
      {
        name: 'Админ Панель',
        email: 'admin@fitnessapp.com',
        hashpass: bcrypt.hashSync('admin2026', 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Иван Сидоров',
        email: 'ivan@example.com',
        hashpass: bcrypt.hashSync('password123', 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Анна Петрова',
        email: 'anna@example.com',
        hashpass: bcrypt.hashSync('user2026', 12),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    await queryInterface.bulkInsert('Users', users, {});

    // await queryInterface.bulkInsert('Forums', [
    //   {
    //     id: 1,
    //     title: 'Изучение React',
    //     description:
    //       'Обсуждаем лучшие практики и подходы к изучению React для начинающих разработчиков',
    //     author_id: 1,
    //     likes: 0,
    //     comments: '',
    //     createdAt: new Date('2024-01-15'),
    //     updatedAt: new Date('2024-01-15'),
    //   },
    //   {
    //     id: 2,
    //     title: 'TypeScript vs JavaScript',
    //     description:
    //       'Сравниваем преимущества и недостатки TypeScript по сравнению с обычным JavaScript',
    //     author_id: 2,
    //     likes: 0,
    //     comments: '',
    //     createdAt: new Date('2024-01-14'),
    //     updatedAt: new Date('2024-01-14'),
    //   },
    //   {
    //     id: 3,
    //     title: 'Архитектура фронтенд приложений',
    //     description:
    //       'Разбираем различные подходы к архитектуре современных фронтенд приложений',
    //     author_id: 1,
    //     likes: 0,
    //     comments: '',
    //     createdAt: new Date('2024-01-13'),
    //     updatedAt: new Date('2024-01-13'),
    //   },
    //   {
    //     id: 4,
    //     title: 'Оптимизация производительности',
    //     description:
    //       'Делимся опытом оптимизации производительности веб-приложений и лучшими практиками',
    //     author_id: 3,
    //     likes: 0,
    //     comments: '',
    //     createdAt: new Date('2024-01-12'),
    //     updatedAt: new Date('2024-01-12'),
    //   },
    //   {
    //     id: 5,
    //     title: 'CSS Grid vs Flexbox',
    //     description:
    //       'Когда использовать CSS Grid, а когда Flexbox? Разбираем на практических примерах',
    //     author_id: 4,
    //     likes: 0,
    //     comments: '',
    //     createdAt: new Date('2024-01-11'),
    //     updatedAt: new Date('2024-01-11'),
    //   },
    // ]);

    await queryInterface.bulkInsert('FitnessClubs', [
      {
        name: 'ddxFitness',
        description:
          'Современный фитнес-клуб с профессиональным оборудованием и опытными тренерами. Специализируемся на силовых тренировках и функциональном фитнесе.',
        address: 'ул. Спортивная, 15, Москва',
        phone: '+7 (495) 123-45-67',
        email: 'info@ddxfitness.ru',
        website: 'www.ddxfitness.ru',
        rating: 4.8,
        priceRange: '3000-5000 ₽/месяц',
        workingHours: 'Пн-Вс: 06:00-24:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTA9j9er1aBd4ZaMp6C5UYWIQvNssrz80JuNg&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'MyFitLab',
        description:
          'Инновационный фитнес-клуб с научным подходом к тренировкам. Индивидуальные программы и современные технологии для достижения ваших целей.',
        address: 'пр. Фитнес, 42, Москва',
        phone: '+7 (495) 987-65-43',
        email: 'hello@myfitlab.ru',
        website: 'www.myfitlab.ru',
        rating: 4.6,
        priceRange: '4000-7000 ₽/месяц',
        workingHours: 'Пн-Пт: 06:00-23:00, Сб-Вс: 08:00-22:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGn42rRG_VR324IMIEMlk4OPPQuAzI-sGgew&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'PowerHouse Gym',
        description:
          'Культовый зал для серьезных атлетов. Тяжелое оборудование, атмосфера чемпионатов и сообщество единомышленников.',
        address: 'ул. Железная, 28, Москва',
        phone: '+7 (495) 555-78-90',
        email: 'contact@powerhouse.ru',
        website: 'www.powerhousegym.ru',
        rating: 4.9,
        priceRange: '3500-6000 ₽/месяц',
        workingHours: 'Круглосуточно',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ0CdzMMMjgyquZvhAl3_yAeYKpH_qdMf7aw&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Flex Studio',
        description:
          'Студия групповых тренировок премиум-класса. Пилатес, йога, стретчинг и танцевальные направления в уютной атмосфере.',
        address: 'ул. Гибкая, 5, Москва',
        phone: '+7 (495) 222-33-44',
        email: 'flex@studio.ru',
        website: 'www.flexstudio.ru',
        rating: 4.7,
        priceRange: '5000-8000 ₽/месяц',
        workingHours: 'Пн-Вс: 07:00-23:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzR9OHgnX3ysuBNtqKIK8G_JLAMKdQHjA3wg&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CrossFit Arena',
        description:
          'Официальный бокс CrossFit с сертифицированными тренерами. Функциональные тренировки, сообщество и соревновательный дух.',
        address: 'пр. Выносливости, 12, Москва',
        phone: '+7 (495) 777-12-34',
        email: 'arena@crossfit.ru',
        website: 'www.crossfitarena.ru',
        rating: 4.8,
        priceRange: '4500-7000 ₽/месяц',
        workingHours: 'Пн-Пт: 06:00-22:00, Сб: 08:00-20:00, Вс: 09:00-18:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHAb_TEbxK0FfkxppH2vZRO_5vwOxuGJ_eiQ&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Iron Will',
        description:
          'Тренажерный зал для пауэрлифтеров и бодибилдеров. Профессиональное оборудование для силового тренинга.',
        address: 'ул. Стальная, 33, Москва',
        phone: '+7 (495) 444-55-66',
        email: 'iron@will.ru',
        website: 'www.ironwillgym.ru',
        rating: 4.5,
        priceRange: '2500-4000 ₽/месяц',
        workingHours: 'Пн-Вс: 05:00-01:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxKbA-4utcJV7K3E_QfH4vVhKujog8WJZ5ag&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Zenith Fitness',
        description:
          'Фитнес-клуб с бассейном и спа-зоной. Комплексные программы для здоровья и восстановления.',
        address: 'пр. Оздоровительный, 18, Москва',
        phone: '+7 (495) 888-99-00',
        email: 'zenith@fitness.ru',
        website: 'www.zenithfitness.ru',
        rating: 4.9,
        priceRange: '6000-10000 ₽/месяц',
        workingHours: 'Пн-Вс: 06:00-24:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjWdbVTYi_RfKBH1P9OMrM0iTg_Z6bZbn0EQ&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Urban Athlete',
        description:
          'Современный мультифункциональный зал с акцентом на функциональный тренинг и воркаут.',
        address: 'ул. Урбанная, 7, Москва',
        phone: '+7 (495) 333-44-55',
        email: 'urban@athlete.ru',
        website: 'www.urbanathlete.ru',
        rating: 4.6,
        priceRange: '3500-5500 ₽/месяц',
        workingHours: 'Пн-Пт: 06:00-23:00, Сб-Вс: 08:00-22:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqWcv7lmy9cN3gILi8agDGTdZcHV1GvTX7rQ&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Hercules Gym',
        description:
          'Классический тренажерный зал для начинающих и продвинутых атлетов. Демократичные цены и дружеская атмосфера.',
        address: 'ул. Геркулеса, 21, Москва',
        phone: '+7 (495) 666-77-88',
        email: 'hercules@gym.ru',
        website: 'www.herculesgym.ru',
        rating: 4.4,
        priceRange: '2000-3500 ₽/месяц',
        workingHours: 'Пн-Вс: 07:00-23:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQN2blfrwOD98mI70krBTrX2TZOkUiqxRGhSg&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Elite Fitness Club',
        description:
          'Премиальный клуб с персональным подходом. Эксклюзивные программы, диетологи и физиотерапевты.',
        address: 'ул. Премиум, 1, Москва',
        phone: '+7 (495) 999-00-11',
        email: 'elite@fitness.ru',
        website: 'www.elitefitness.ru',
        rating: 4.9,
        priceRange: '8000-15000 ₽/месяц',
        workingHours: 'Пн-Вс: 06:00-24:00',
        image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFz7qajsqM35u-pds4tJfE18CN9pHzHmFW4A&s',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    const trainers = [
      {
        email: 'alexey.trainer@fitness.com',
        hashpass: bcrypt.hashSync('trainer789', 12),
        name: 'Алексей Тренер',
        description: 'Сертифицированный тренер по фитнесу с 10-летним опытом',
        profileImage: 'https://via.placeholder.com/300x300?text=Alexey',
        qualificationImages: JSON.stringify([
          'https://via.placeholder.com/400x300?text=Certificate1',
          'https://via.placeholder.com/400x300?text=Certificate2',
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'maria.trainer@fitness.com',
        hashpass: bcrypt.hashSync('trainer456', 12),
        name: 'Мария Козлова',
        description: 'Мастер спорта по бодибилдингу',
        profileImage: 'https://via.placeholder.com/300x300?text=Maria',
        qualificationImages: JSON.stringify([
          'https://via.placeholder.com/400x300?text=Gold-Medal',
        ]),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert('Trainers', trainers, {});

    await queryInterface.bulkInsert(
      'GymReviews',
      [
        {
          rate: 5,
          userId: null,
          trainerId: 1,
          content:
            'Отличный зал! Новое оборудование, чисто, просторно. Тренируюсь уже 3 месяца, результат на лицо.',
          gymId: 1,
          like: null,
          dislike: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 4,
          userId: 2,
          trainerId: null,
          content:
            'Хороший зал для кардио и групповых занятий. Штанги могли бы быть поновее, но в целом всё устраивает.',
          gymId: 1,
          like: 'Кардио зона',
          dislike: 'Старые штанги',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 3,
          userId: 3,
          trainerId: null,
          content:
            'Средний зал. Очереди на тренажёры в вечернее время, душ только 2 кабинки на всех.',
          gymId: 2,
          like: null,
          dislike: 'Мало душевых',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          rate: 5,
          userId: 1,
          trainerId: null,
          content:
            'Лучший зал в районе! Профессиональное оборудование, отличная вентиляция, дружелюбный персонал.',
          gymId: 2,
          like: 'Всё',
          dislike: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
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
