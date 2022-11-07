'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
    options.tableName = 'Albums'

    await queryInterface.bulkInsert(options, [
      { userId: 1, title: 'A Great Album', description: 'An Album that was great.', imageUrl: 'greatImageUrl' },
      { userId: 2, title: 'A Good Album', description: 'An Album that was good.', imageUrl: 'goodImageUrl' },
      { userId: 3, title: 'A Terrible Album', description: 'An Album that was terrible.', imageUrl: 'terribleImageUrl' },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Albums'
    await queryInterface.bulkDelete(options, null, {});
  }
};
