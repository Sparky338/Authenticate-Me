'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('Albums', [
      {userId: 1, title: 'A Great Album', description: 'An Album that was great.', imageUrl: 'greatImageUrl'},
      {userId: 2, title: 'A Good Album', description: 'An Album that was good.', imageUrl: 'goodImageUrl'},
      {userId: 3, title: 'A Terrible Album', description: 'An Album that was terrible.', imageUrl: 'terribleImageUrl'},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Albums', null, {});
  }
};
