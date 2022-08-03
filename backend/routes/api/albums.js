const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/:albumId', async (req, res) => {
    const albums = await Album.findAll();

    return res.json(albums)
})

// Create a song based on albumId
router.post('/:albumId/songs', requireAuth, async (req, res) => {
    const user = req.user.id;
    const albumId = req.params.albumId;
    const { title, description, url, imageUrl } = req.body;

    const album = await Album.findByPk(albumId);

    if (!album && albumId !== null) {
        return res.json({
            message: "Album couldn't be found",
            statusCode: 404
        })
    }

    if (user !== album.userId){
        return res.json({
            message: "User must be the Album's owner",
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

// Get all Albums
router.get 

module.exports = router;
