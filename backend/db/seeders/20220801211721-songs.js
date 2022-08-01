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
      {title: 'A Great Song', description: 'A Great song is about a great song we wrote once.', userId: 1, albumId: 1, url: 'greaturl', imageUrl: 'greatImageUrl'},
      {title: 'A Good Song', description: 'A Good song is about a good song we wrote once.', userId: 2, albumId: 2, url: 'goodurl', imageUrl: 'goodImageUrl'},
      {title: 'A Terrible Song', description: 'A Terrible song is about a terrible song we wrote once.', userId: 3, albumId: 3, url: 'terribleurl', imageUrl: 'terribleImageUrl'},
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
