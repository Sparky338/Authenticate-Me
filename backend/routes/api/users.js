const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album,  } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateSignup = [
  check('email')
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage('Please provide a valid email.'),
  check('username')
    .exists({ checkFalsy: true })
    .isLength({ min: 4 })
    .withMessage('Please provide a username with at least 4 characters.'),
  check('username')
    .not()
    .isEmail()
    .withMessage('Username cannot be an email.'),
  check('password')
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage('Password must be 6 characters or more.'),
  handleValidationErrors
];

// Sign up
router.post(
  '/',
  validateSignup,
  async (req, res) => {
    const { email, password, username } = req.body;
    const user = await User.signup({ email, username, password });

    await setTokenCookie(res, user);

    return res.json({
      user,
    });
  }
);

// Get details of artist (user) from id
router.get('/:userId', async (req, res) => {
  const artistId = req.params.userId;

  const artist = await User.findByPk(artistId);

  if (!artist) {
    return res.json({
        message: "Artist couldn't be found",
        statusCode: 404
    })
}

  //lazy load songs & albums, sum them. prievew image for each song
  const totalSongs = await Song.count({
    where: {userId: artistId}
  })

  const totalAlbums = await Album.count({
    where: {userId: artistId}
  })

  res.json(totalAlbums)
})

module.exports = router;
