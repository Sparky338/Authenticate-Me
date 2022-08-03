const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// Get all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll();

    return res.json({ albums })
})

// Get all albums by current user
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;

    const albums = await Album.findAll({
        where: { userId: user }
    });

    return res.json({ albums });
})

//Get details of an Album from an id
router.get('/:albumId', async (req, res) => {
    const albumId = req.params.albumId;

    const album = await Album.findByPk(albumId, {
        include: [
            { model: User, as: 'Artist', attributes: ['id', 'username'] },
            { model: Song }
        ]
    });

    if (!album) {
        return res.json({
            message: "Album couldn't be found",
            statusCode: 404
        })
    }
    return res.json(album)
})

// Create an album
router.post('/', requireAuth, async (req, res) => {
    const user = req.user.id;
    const { title, description, imageUrl } = req.body;

    if (!title) {
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Album title is required",
            }
        })
    } else {
        const newAlbum = await Album.create({
            userId: user,
            title,
            description,
            createdAt: res.body,
            updatedAt: res.body,
            imageUrl
        })
        res.status(201)
        return res.json(newAlbum)
    }
})

// Edit an album
router.put('/:albumId', requireAuth, async (req,res) => {
    const user = req.user.id;
    const albumId = req.params.albumId;
    const {title, description, imageUrl} = req.body;
    const album = await Album.findByPk(albumId);

    if (!album) {
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

    if (!title) {
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Album title is required",
            }
        })
    } else {
        const editAlbum = await Album.findByPk(albumId)
        editAlbum.set({
            title,
            description,
            imageUrl
        })
        await editAlbum.save()

        res.status(200)
        return res.json(editAlbum)
    }

})

// Delete an album
router.delete('/:albumId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const albumId = req.params.albumId;
    const album = await Album.findByPk(albumId);

    if (!album) {
        return res.json({
            message: "Album couldn't be found",
            statusCode: 404
        })
    }

    if (user !== album.userId) {
        return res.json({
            message: "User must be the Album's owner",
            statusCode: 401
        })
    }

    await album.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
