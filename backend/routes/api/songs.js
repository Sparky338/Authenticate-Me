const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



// All songs
router.get('/', async (req, res) => {
    const allSongs = await Song.findAll();

    return res.json(allSongs);
});

// Songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id
    const userSongs = await Song.findByPk(user, {
        attributes: {
            Songs: [
                ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl']
            ]
        },
    });

    return res.json(userSongs);
})

module.exports = router;
