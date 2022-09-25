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
      {userId: 1, albumId: null, title: 'The Blackest Bouquet', description: 'LeonellCassio- If you would like to use this song for social media, feel free to. All that I ask back is that you give credit, and that do not re-sell & distribute the song or any form of remixes.', url: 'https://cdn.pixabay.com/audio/2022/08/31/audio_419263fc12.mp3', imageUrl: 'https://cdn.pixabay.com/audio/2022/08/31/19-48-37-847_200x200.jpg'},
      {userId: 3, albumId: null, title: 'Electronic Future Beats', description: 'QubeSounds- Making future songs for cubes', url: 'https://cdn.pixabay.com/audio/2022/08/23/audio_d16737dc28.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2022/07/06/13/10/vintage-car-7305109_960_720.jpg'},
      {userId: 1, albumId: null, title: 'SoundHelix Song 1', description: 'T. Schürger- recording date: 07/06/2009', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2022/07/21/20/25/converse-7336903_960_720.jpg'},
      {userId: 1, albumId: null, title: 'The Stationary Ark - Low pH Arktic Clubmix', description: 'T. Schürger- recording date: 25/09/2020, SoundHelix Song 17', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2022/08/24/15/42/library-7408106_960_720.jpg'},
      {userId: 2, albumId: null, title: 'Stereophonic Sound', description: 'ikoliks- A groovy, funky royalty free music track with cool basslines, guitars, horns, synths, vocal bits, strings and drums, best for travel, fashion or urban visuals, commercials or films.', url: 'https://dsqqu7oxq6o1v.cloudfront.net/preview-983864-aCF3bWUtFG.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2014/05/21/15/18/musician-349790_960_720.jpg'},
      {userId: 2, albumId: null, title: 'The Dark Wing', description: 'SymphoMix- An epic, emotional royalty-free orchestral score, with piano, airy flute, lush strings, choirs, fx, and big drums, best for adventure films, fantasy games, heroic scenes, or film credits.', url: 'https://dsqqu7oxq6o1v.cloudfront.net/preview-993640-1rlJVWb69B.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2016/02/05/13/11/fairy-tale-1180921_960_720.png'},
      {userId: 2, albumId: null, title: 'A Time To Remember', description: 'Motion Array Originals: Classics- A wonderful and upbeat indie rock track - perfect for inspirational content and uplifting videos.', url: 'https://dsqqu7oxq6o1v.cloudfront.net/preview-9814FYOKf2gWz3.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2016/02/05/13/11/fairy-tale-1180921_960_720.png'},
      {userId: 2, albumId: null, title: 'Pride And Strength', description: 'SymphoMix- An intense and powerful royalty free inspiring and action packed orchestral epic track. Featuring synths, strings, brass, percussion, and drums. Great for historical, patriotic or fantasy films, trailers, teasers, intro, games and many other projects.', url: 'https://dsqqu7oxq6o1v.cloudfront.net/preview-1054644-6gS8JuSlyA.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2013/11/03/08/05/cheers-204742_960_720.jpg'},
      {userId: 2, albumId: null, title: 'The Riddle Of The Unknown', description: 'SymphoMix- An intense and powerful royalty free inspiring and action packed orchestral epic track. Featuring synths, strings, brass, percussion, and drums. Great for historical, patriotic or fantasy films, trailers, teasers, intro, games and many other projects.', url: 'https://dsqqu7oxq6o1v.cloudfront.net/preview-1003730-HwlhyOP0vn.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2018/09/17/14/27/headphones-3683983_960_720.jpg'},
      {userId: 3, albumId: null, title: 'Unstoppable Energy', description: 'Sheva- A fun, percussive royalty-free funk track, with rock guitars, synths, sax, stomps, claps, cool vocal hooks, and spicy vibes, best for youth, branding, sports, fashion, or lifestyle contents.', url: 'https://dsqqu7oxq6o1v.cloudfront.net/preview-1049247-Smh46DqSMJ.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2015/03/08/17/25/musician-664432_960_720.jpg'},
      {userId: 3, albumId: null, title: 'Darkness Evokes', description: 'Sheva- Intense, hybrid royalty free cinematic scores, with layers of synth, braams, sound effects and percussion, best for movies, spots, games, extreme, and more.', url: 'https://dsqqu7oxq6o1v.cloudfront.net/preview-1244854-hGYFz7p3no.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2015/04/13/13/37/audio-720589_960_720.jpg'},
      {userId: 3, albumId: null, title: 'Rich And Successful People', description: 'Sheva- A trendy, energetic royalty-free hip-hop, with brass, guitars, vocal cuts, effects and cool beats, best for vlogs, short ads, urban visuals or youthful content.', url: 'https://dsqqu7oxq6o1v.cloudfront.net/preview-1175854-KEzgaTglMz.mp3', imageUrl: 'https://cdn.pixabay.com/photo/2016/11/22/19/15/hand-1850120_960_720.jpg'},
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
