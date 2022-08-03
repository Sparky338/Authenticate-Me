const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



// All songs
router.get('/', async (req, res) => {
    const songs = await Song.findAll();

    return res.json({ songs });
});

// Songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;

    const songs = await Song.findAll({
        where: {userId: user}
    });

    return res.json({ songs });
})

// Details of a song by id
router.get('/:songId', async (req, res) => {
    const songId = req.params.songId;
    const song = await Song.findByPk(songId, {
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

// Create a song
router.post('/', requireAuth, async (req, res) => {
    const user = req.user.id;

    const { title, description, url, imageUrl, albumId } = req.body;

    const album = await Album.findByPk(albumId);

    if (!album && albumId !== null) {
        return res.json({
            message: "Album couldn't be found",
            statusCode: 404
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
        const newSong = await Song.create({
            userId: user,
            albumId,
            title,
            description,
            url,
            createdAt: res.body,
            updatedAt: res.body,
            imageUrl
        })
        res.status(201)
        return res.json(newSong)
    }

})

// Edit a song
router.put('/:songId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const songId = req.params.songId;
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

// Delete a song
router.delete('/:songId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const songId = req.params.songId;
    const song = await Song.findByPk(songId);

    if (!song){
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    if (user !== song.userId) {
        return res.json({
            message: "User must be the Song's owner",
            statusCode: 401
        })
    }

    await song.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
