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
     await queryInterface.bulkInsert('Playlists', [
      {userId: 1, name: "Demo-lition Destroyer", imageUrl: 'playlistUrl'},
      {userId: 2, name: 'Fakers', imageUrl: 'playlistUrl'},
      {userId: 3, name: 'Phone Phreaking tunes', imageUrl: 'playlistUrl'},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Playlists', null, {});
  }
};
