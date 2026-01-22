'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('forum_comments', 'author_type', {
      type: Sequelize.ENUM('user', 'trainer'),
      allowNull: false,
      defaultValue: 'user',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('forum_comments', 'author_type');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_forum_comments_author_type";',
    );
  },
};
