'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('Types', {
      name: {
        type: Sequelize.STRING(255),
        allowNull: false,
        autoIncrement: false,
        unique: true,
        primaryKey: true,
      },
      featuredImage: {
        type: Sequelize.STRING(1025),
        allowNull: true,
      },
      isTrending: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      numberOfTopics: {
        type: Sequelize.BIGINT,
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Types');
  },
};
