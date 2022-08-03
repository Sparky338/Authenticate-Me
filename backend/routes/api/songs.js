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

    return res.json({ songs });
});

// Songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;

    const songs = await Song.findByPk(user, {
        attributes:
            ['id', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl']
    });

    return res.json({ songs });
})

// Song by id
router.get('/:songId', async (req, res) => {
    const songId = req.params.songId;
    const song = await Song.findByPk(songId, {
        attributes: ['id', 'userId', 'albumId', 'title', 'description', 'url', 'createdAt', 'updatedAt', 'imageUrl'],
        include: [
            { model: User, as: 'Artist', attributes: ['id', 'username'] },
            { model: Album, attributes: ['id', 'title', 'imageUrl'] }
        ]
    })
    if (!song) {
        return res.json({
            "message": "Song couldn't be found",
            "statusCode": 404
        })
    }
    res.json(song)
})

// Edit a song
router.put('/:songId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const songId = req.params.songId
    const {title, description, url, imageUrl, albumId} = req.body;
    const songAuth = await Song.findByPk(songId);

    if (!songAuth){
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    if (user !== songAuth.userId) {
        return res.json({
            message: "User must be the Song's owner",
            statusCode: 401
        })
    }

    if (!title && !url) {
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Song title is required",
                url: "Audio is required"
            }
        })
    } else if (!title) {
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Song title is required",
            }
        })
    } else if (!url) {
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                url: "Audio is required"
            }
        })
    } else {
        const editSong = await Song.findByPk(songId)
            editSong.set({
            title,
            description,
            url,
            imageUrl
        })
        await editSong.save()

        res.status(200)
        return res.json(editSong)
    }
})


module.exports = router;
