'use strict';

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
    const seedItems = [
      {
        name: 'ITEM_TOPIC_REQUEST_TYPE',
        label: 'Item Topic Request Type',
        type: 'selectValues',
        value:
          '{"ADD":"add","UPDATE":"update","DELETE":"delete","ADD_ITEM":"add-item","UPDATE_ITEM":"update-item","DELETE_ITEM":"delete-item"}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    return queryInterface.bulkInsert('AppConfigs', seedItems, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('AppConfigs', null, {});
  },
};
