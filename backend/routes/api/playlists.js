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

    return res.json(addSong)
})

module.exports = router;
