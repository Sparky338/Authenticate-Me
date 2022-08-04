const express = require('express');
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User, Song, Album, Playlist } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

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

    return res.json(newPlaylist)
})

module.exports = router;
