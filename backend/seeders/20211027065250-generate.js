'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     
     */
   await queryInterface.bulkInsert('Users', [{
    username: 'admin',
    password: '123456',
    level: '0',
    createdAt: new Date(),
    updatedAt: new Date()
   }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
