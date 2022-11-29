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
      .createTable('Medias', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          unique: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        types: {
          type: Sequelize.STRING,
          allowNull: true,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: true,
        },
        description: {
          type: Sequelize.STRING(1025),
          allowNull: true,
        },
        featuredImage: {
          type: Sequelize.STRING(755),
          allowNull: true,
        },
        additionalFields: {
          type: Sequelize.JSONB,
          allowNull: true,
          defaultValue: '',
        },
        isPrivate: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        isAdultRestricted: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        creatorId: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        topicId: {
          type: Sequelize.INTEGER,
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
      .then(async () => {
        await queryInterface.addConstraint('Medias', {
          fields: ['topicId'],
          type: 'foreign key',
          name: 'medias_topic_id_fkey',
          references: {
            //Required field
            table: 'Topics',
            field: 'id',
          },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
        await queryInterface.addConstraint('Users', {
          fields: ['creatorId'],
          type: 'foreign key',
          name: 'medias_creator_id_fkey',
          references: {
            //Required field
            table: 'Users',
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
    return queryInterface.dropTable('Medias');
  },
};
