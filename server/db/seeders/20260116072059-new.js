'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Очищаем таблицы перед вставкой
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Trainers', null, {});
    await queryInterface.bulkDelete('FitnessClubs', null, {});

    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash('123456', 10);

    const users = [
      {
        name: 'alex',
        email: 'alex@user.com',
        hashpass: hashedPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'john',
        email: 'john@user.com',
        hashpass: hashedPass,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'leha',
        email: 'leha@user.com',
        hashpass: hashedPass,
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
        name: 'Spirit. Fitness',
        description:
          'Современный фитнес-клуб с профессиональным оборудованием и круглосуточным режимом работы. Расположен в удобном торговом центре с отличной транспортной доступностью.',
        address: 'ул. Вавилова, 3, ТРЦ Гагаринский, Москва, 119334',
        phone: '8 (495) 432-66-31',
        email: 'rio@spiritfit.ru',
        website:
          'https://spiritfit.ru/clubs/gagarinskiy/?utm_source=google&utm_medium=maps&utm_campaign=msk',
        rating: 4.4,
        priceRange: '4000',
        workingHours: 'Круглосуточно',
        image: 'https://spiritfit.ru/images/logo_white.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BIOSFERA CLUB fitness&spa',
        description:
          'Премиальный фитнес-клуб с спа-зоной, предлагающий комплексный подход к здоровью и красоте. Современное оборудование и профессиональные программы тренировок.',
        address: 'Малая Калужская ул., 15, стр.4, Москва, 119071',
        phone: '8 (499) 877-52-75',
        email: 'info@biosfera-club.ru',
        website: 'https://biosfera-club.ru/',
        rating: 4.6,
        priceRange: '6000',
        workingHours: 'Открыто · Закроется в 23:00',
        image:
          'https://biosfera-club.ru/upload/CMedc2/fc3/znlrwh1qk08gmcxwtpnx7gy2f9nywxvg/logo_spa.png',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'REBOOT EAST. Fitness',
        description:
          'Инновационный фитнес-клуб с высоким рейтингом и современным подходом к тренировкам. Расположен в бизнес-центре с удобной парковкой и отличными отзывами клиентов.',
        address: 'Рива, Шлюзовая наб., 4, БЦ Россо, Москва, 115114',
        phone: '8 (499) 216-81-39',
        email: 'brand-manager@reboot.ru',
        website:
          'https://reboot.ru/?utm_source=googlemaps&utm_medium=organic&utm_campaign=reboot_east',
        rating: 4.9,
        priceRange: '5000',
        workingHours: 'Закроется в 22:30',
        image:
          'https://reboot.ru/media/galleries/photos/2025/01/17/DSC06484_copy.jpg.2048x1024_q90.webp',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'LOMOV GYM',
        description:
          'Круглосуточный тренажерный зал для серьезных атлетов. Профессиональное оборудование, атмосфера настоящего спорта и возможность тренироваться в любое время суток.',
        address: 'Автозаводская ул., 18, Москва, 115280',
        phone: '8 (495) 150-85-90',
        email: 'sales@lomovgym.ru',
        website: 'https://lomovgym.ru/',
        rating: 4.6,
        priceRange: '3500',
        workingHours: 'Круглосуточно',
        image:
          'https://avatars.mds.yandex.net/get-altay/2813737/2a000001725221614d6ee3586c9e44081e0b/XL',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'IDOL GYM',
        description:
          'Современный фитнес-клуб с качественным оборудованием и профессиональными тренерами. Удобное расположение и комфортная атмосфера для достижения ваших фитнес-целей.',
        address: 'Нагатинская ул., 1, с 21, Москва, 117105',
        phone: '8 (495) 120-08-06',
        email: 'info@idolgym.ru',
        website: 'https://idolgym.ru/',
        rating: 4.5,
        priceRange: '4000',
        workingHours: 'Закроется в 23:00',
        image:
          'https://static.tildacdn.com/tild6339-6265-4432-b134-616666663335/_.svg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'X-way fitness and beauty',
        description:
          'Премиальная студия фитнеса и красоты с высоким рейтингом. Сочетание эффективных тренировок и процедур красоты в одном месте для комплексного подхода к здоровью.',
        address: 'ул. Серпуховский Вал, 21 к1, Москва, 115191',
        phone: '8 (495) 432-66-31',
        email: 'hello@xway.studio',
        website: 'https://xway.studio/',
        rating: 4.9,
        priceRange: '7000',
        workingHours: 'Закроется в 23:00',
        image:
          'https://lh3.googleusercontent.com/p/AF1QipM-UIzlVd_T-vt6ofrQGgWNXnGiHAUOYaFfiDCT=s1360-w1360-h1020-rw',
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

    // await queryInterface.bulkInsert(
    //   'GymReviews',
    //   [
    //     {
    //       rate: 5,
    //       userId: null,
    //       trainerId: 1,
    //       content:
    //         'Отличный зал! Новое оборудование, чисто, просторно. Тренируюсь уже 3 месяца, результат на лицо.',
    //       gymId: 1,
    //       like: null,
    //       dislike: null,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       rate: 4,
    //       userId: 2,
    //       trainerId: null,
    //       content:
    //         'Хороший зал для кардио и групповых занятий. Штанги могли бы быть поновее, но в целом всё устраивает.',
    //       gymId: 1,
    //       like: 'Кардио зона',
    //       dislike: 'Старые штанги',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       rate: 3,
    //       userId: 3,
    //       trainerId: null,
    //       content:
    //         'Средний зал. Очереди на тренажёры в вечернее время, душ только 2 кабинки на всех.',
    //       gymId: 2,
    //       like: null,
    //       dislike: 'Мало душевых',
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //     {
    //       rate: 5,
    //       userId: 1,
    //       trainerId: null,
    //       content:
    //         'Лучший зал в районе! Профессиональное оборудование, отличная вентиляция, дружелюбный персонал.',
    //       gymId: 2,
    //       like: 'Всё',
    //       dislike: null,
    //       createdAt: new Date(),
    //       updatedAt: new Date(),
    //     },
    //   ],
    //   {},
    // );
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
