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
            {model: User, as: 'Artist', attributes: ['id', 'username']},
            {model: Album, attributes: ['id', 'title', 'imageUrl']}
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

// const validateSong = [
//     check('title')
//         .exists({checkFalsy: true})
//         .withMessage("Song title is required"),
//     check('url')
//         .exists({checkFalsy: true})
//         .withMessage("Audio is required"),
//     handleValidationErrors
// ];

// Create a song
router.post('/', requireAuth, async (req, res) => {
    const user = req.user.id;
    const {title, description, url, imageUrl, albumId} = req.body;


    if (!req.body.title && !req.body.url){
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Song title is required",
                url: "Audio is required"
            }
        })
    } else if(!req.body.title){
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Song title is required",
            }
        })
    } else if (!req.body.url){
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

module.exports = router;
