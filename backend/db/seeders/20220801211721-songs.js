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
    await queryInterface.bulkInsert('Songs', [
      {userId: 1, albumId: 1, title: 'A Great Song', description: 'A Great song is about a great song we wrote once.', url: 'greaturl', imageUrl: 'greatImageUrl'},
      {userId: 2, albumId: 2, title: 'A Good Song', description: 'A Good song is about a good song we wrote once.', url: 'goodurl', imageUrl: 'goodImageUrl'},
      {userId: 3, albumId: 3, title: 'A Terrible Song', description: 'A Terrible song is about a terrible song we wrote once.', url: 'terribleurl', imageUrl: 'terribleImageUrl'},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Songs', null, {});
  }
};
