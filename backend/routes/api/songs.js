const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



// All songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll({
        attributes:
            ['id', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl']
    });

    return res.json({songs});
});

// Songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id
    const songs = await Song.findByPk(user, {
        attributes:
            ['id', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl']
    });

    return res.json({songs});
})

// Song by id
router.get('/:songId', async (req, res) => {
    const songId = req.params.songId;
    const song = await Song.findByPk(songId, {
        attributes:
            ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl'],
        include: {
            model: Artist,
            attributes: ['id', 'username', 'imageUrl']
        },
        include: {
            model: Album,
            attributes: ['id', 'title', 'imageUrl']
        }

    })
})


module.exports = router;
