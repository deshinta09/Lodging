'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.bulkInsert('Types', [
      {
        "name": "Spa", createdAt: new Date(), updatedAt:new Date()
      },
      {
        "name": "Hotel", createdAt: new Date(), updatedAt:new Date()
      },
      {
        "name": "Resort", createdAt: new Date(), updatedAt:new Date()
      },
      {
        "name": "Castle", createdAt: new Date(), updatedAt:new Date()
      },
      {
        "name": "Villa", createdAt: new Date(), updatedAt:new Date()
      }
   ], {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {})
  }
};
