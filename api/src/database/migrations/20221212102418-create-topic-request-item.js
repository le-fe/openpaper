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
      .createTable('TopicRequestItems', {
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
        requestType: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        key: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        oldContent: {
          type: Sequelize.STRING(2000),
          allowNull: true,
        },
        content: {
          type: Sequelize.STRING(2000),
          allowNull: true,
        },
        requestUserId: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
        isApproved: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
        },
        isRejected: {
          type: Sequelize.BOOLEAN,
          allowNull: true,
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
        queryInterface.addConstraint('TopicRequestItems', {
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
    return queryInterface.dropTable('TopicRequestItems');
  },
};
