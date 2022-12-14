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
    return queryInterface
      .createTable('Discussions', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        topicId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        title: {
          type: Sequelize.STRING(255),
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(1025),
          allowNull: true,
        },
        featuredImage: {
          type: Sequelize.STRING(1025),
          allowNull: true,
        },
        creatorId: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        isPrivate: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        isAdultRestricted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
          type: Sequelize.DATE,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
      })
      .then(() => {
        queryInterface.addConstraint('Discussions', {
          fields: ['topicId'],
          type: 'foreign key',
          name: 'topics_id_fkey',
          references: {
            //Required field
            table: 'Topics',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
      });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('Discussions');
  },
};
