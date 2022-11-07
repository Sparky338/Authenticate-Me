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
    options.tableName = 'Comments';
    await queryInterface.bulkInsert(options, [
      {userId: 3, songId: 1, body: 'This is an amazing song!'},
      {userId: 3, songId: 2, body: `This song speaks to my soul! It's like the artist knows me.`},
      {userId: 3, songId: 3, body: 'I went on a trip with this!'},
      {userId: 3, songId: 4, body: 'I hope this song stay around, it gave me chills.'},
      {userId: 3, songId: 5, body: 'They know what they are doing. Great song!'},
      {userId: 3, songId: 10, body: 'so talented.'},
      {userId: 1, songId: 2, body: 'Wow, nicely sung.'},
      {userId: 1, songId: 10, body: "Brilliant! Can't wait to hear more."},
      {userId: 1, songId: 6, body: 'This is an alright song.'},
      {userId: 1, songId: 7, body: 'never heard anything better'},
      {userId: 1, songId: 11, body: 'Makes me think of home.'},
      {userId: 2, songId: 8, body: 'Wish I could get more of this!'},
      {userId: 2, songId: 9, body: 'This is an awful song!'},
      {userId: 2, songId: 10, body: 'This is an awful song!'},
      {userId: 2, songId: 12, body: 'FIRST!'},
      {userId: 2, songId: 11, body: 'Leaving inane comments is my job.'},
      {userId: 2, songId: 1, body: 'This might be the worst song I have ever heard... Please stop.'},
      {userId: 2, songId: 3, body: 'Why do I love this song so much?'},
      {userId: 2, songId: 5, body: 'MOOOOOOOORRRRREEEEEEE!'},
      {userId: 2, songId: 6, body: 'Give me the beats!!!!'},
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    options.tableName = 'Comments'
     await queryInterface.bulkDelete(options, null, {});
  }
};
