const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist, PlaylistsSong } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Create a Playlist
router.post('/', requireAuth, async (req, res) => {
    const user = req.user.id;
    const { name, imageUrl } = req.body;

    if (!name) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Playlist name is required",
            }
        })
    }

    const newPlaylist = await Playlist.create({
        userId: user,
        name,
        createdAt: res.body,
        updatedAt: res.body,
        imageUrl
    })

    res.status(201)
    return res.json(newPlaylist)
})

// Add a Song to a Playlist based on the Playlists's id
router.post('/:playlistId/songs', requireAuth, async (req, res) => {
    const user = req.user.id;
    const playlistId = req.params.playlistId;
    const { songId } = req.body;
    const playlist = await Playlist.findByPk(playlistId);
    const song = await Song.findByPk(songId);

    if (!playlist) {
        res.status(404)
        return res.json({
            message: "Playlist couldn't be found",
            statusCode: 404
        })
    }

    if (user !== playlist.userId) {
        res.status(401)
        return res.json({
            message: "User must be the Playlist's owner",
            statusCode: 401
        })
    }

    if (!song) {
        res.status(404)
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    const addSong = await PlaylistsSong.create({
        playlistId,
        songId
    })

    const id = await PlaylistsSong.findAll({
        limit: 1,
        attributes: ['id'],
        order: [['id', 'DESC']]
    })

    return res.json({
        id: id[0].id,
        playlistId,
        songId
    })
})

//Get details of a Playlist from an id
router.get('/:playlistId', async (req, res) => {
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) {
        res.status(404)
        return res.json({
            message: "Playlist couldn't be found",
            statusCode: 404
        })
    }

    const combinedPlaylist = await Playlist.findByPk(playlistId, {
        include: { model: Song, through: { attributes: [] } }
    })

    return res.json(combinedPlaylist)
})

// edit a playlist
router.put('/:playlistId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const playlistId = req.params.playlistId;
    const { name, imageUrl } = req.body;
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) {
        res.status(404)
        return res.json({
            message: "Playlist couldn't be found",
            statusCode: 404
        })
    }

    if (user !== playlist.userId) {
        res.status(401)
        return res.json({
            message: "User must be the Playlist's owner",
            statusCode: 401
        })
    }

    if (!name) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                name: "Playlist name is required",
            }
        })
    } else {
        const editPlaylist = await Playlist.findByPk(playlistId)
        editPlaylist.set({
            name,
            imageUrl
        })
        await editPlaylist.save()

        res.status(200)
        return res.json(editPlaylist)
    }
})

// Delete a playlist
router.delete('/:playlistId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const playlistId = req.params.playlistId;
    const playlist = await Playlist.findByPk(playlistId);

    if (!playlist) {
        res.status(404)
        return res.json({
            message: "Playlist couldn't be found",
            statusCode: 404
        })
    }

    if (user !== playlist.userId) {
        res.status(401)
        return res.json({
            message: "User must be the Playlist's owner",
            statusCode: 401
        })
    }

    await playlist.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
