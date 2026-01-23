// seed-forums.js
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Получаем ID категорий
    const categories = await queryInterface.sequelize.query(
      'SELECT id FROM forum_categories ORDER BY id',
      { type: queryInterface.sequelize.QueryTypes.SELECT },
    );

  //   await queryInterface.bulkInsert(
  //     'Forums',
  //     [
  //       {
  //         title: 'Как правильно начать тренироваться?',
  //         description:
  //           'Подскажите, с чего лучше начать новичку в фитнесе. Какие упражнения самые эффективные для начала? Хочу составить программу на первые 3 месяца.',
  //         author_id: 1,
  //         category_id: categories[0].id, // Общее
  //         status: 'active',
  //         is_pinned: true,
  //         createdAt: new Date('2024-01-10'),
  //         updatedAt: new Date('2024-01-10'),
  //       },
  //       {
  //         title: 'Лучшие упражнения на пресс',
  //         description:
  //           'Делимся эффективными упражнениями для проработки мышц пресса. Какие техники действительно работают?',
  //         author_id: 1,
  //         category_id: categories[1].id, // Тренировки
  //         status: 'active',
  //         is_pinned: false,
  //         createdAt: new Date('2024-01-12'),
  //         updatedAt: new Date('2024-01-12'),
  //       },
  //       {
  //         title: 'Белковая диета: опыт и результаты',
  //         description:
  //           'Кто пробовал высокобелковую диету? Поделитесь опытом, результатами и советами по составлению рациона.',
  //         author_id: 1,
  //         category_id: categories[2].id, // Питание
  //         status: 'active',
  //         is_pinned: false,
  //         createdAt: new Date('2024-01-15'),
  //         updatedAt: new Date('2024-01-15'),
  //       },
  //       {
  //         title: 'Как восстановиться после травмы колена',
  //         description:
  //           'Получил травму на тренировке. Какие упражнения можно делать для восстановления без риска усугубить ситуацию?',
  //         author_id: 1,
  //         category_id: categories[3].id, // Здоровье
  //         status: 'active',
  //         is_pinned: true,
  //         createdAt: new Date('2024-01-18'),
  //         updatedAt: new Date('2024-01-18'),
  //       },
  //       {
  //         title: 'Выбор беговой дорожки для дома',
  //         description:
  //           'Ищу рекомендации по выбору беговой дорожки для домашних тренировок. На что обращать внимание?',
  //         author_id: 1,
  //         category_id: categories[4].id, // Оборудование
  //         status: 'active',
  //         is_pinned: false,
  //         createdAt: new Date('2024-01-20'),
  //         updatedAt: new Date('2024-01-20'),
  //       },
  //       {
  //         title: 'Мой первый месяц в зале: отчет',
  //         description:
  //           'Прошел первый месяц тренировок. Хочу поделиться результатами и впечатлениями. Прибавил 2 кг мышечной массы!',
  //         author_id: 1,
  //         category_id: categories[6].id, // Достижения
  //         status: 'active',
  //         is_pinned: false,
  //         createdAt: new Date('2024-01-22'),
  //         updatedAt: new Date('2024-01-22'),
  //       },
  //     ],
  //     {},
  //   );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Forums', null, {});
  },
};
