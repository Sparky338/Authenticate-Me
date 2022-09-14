const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Album, Song, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



// All songs
router.get('/', async (req, res) => {
    let { page, size, title, createdAt } = req.query;

    if (!page) page = 0;
    if (!size) size = 20;

    let where = {}
    if (title) {
        where.title = title
    }
    if (createdAt) {
        where.createdAt = createdAt
    }

    page = parseInt(page);
    size = parseInt(size);

    const pagination = {};
    if (page >= 1 && page <= 10 && size >= 0 && size <= 20) {
        pagination.limit = size;
        pagination.offset = size * (page - 1);
    }

    if (page < 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                page: "Page must be greater than or equal to 0",
            }
        })
    } else if (size < 0) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                size: "Size must be greater than or equal to 0",
            }
        })
    } /*else if (typeof(where.createdAt) !== 'string') {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                createdAt: "CreatedAt is invalid",
            }
        })
    }*/


    const songs = await Song.findAll({
        where,
        ...pagination
    });

    return res.json({
        songs,
        page,
        size
    });
});

// Songs by current user
router.get('/current', requireAuth, async (req, res) => {
    const user = req.user.id;

    const songs = await Song.findAll({
        where: { userId: user }
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
        res.status(404)
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }
    res.json(song)
})

// Create a song
router.post('/', requireAuth, async (req, res) => {
    const user = req.user.id;

    const { title, description, url, imageUrl, albumId } = req.body;

    // const album = await Album.findByPk(albumId);

    // if (!album && albumId !== null) {
    //     res.status(404)
    //     return res.json({
    //         message: "Album couldn't be found",
    //         statusCode: 404
    //     })
    // }

    if (!title && !url) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Song title is required",
                url: "Audio is required"
            }
        })
    } else if (!title) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Song title is required",
            }
        })
    } else if (!url) {
        res.status(400)
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
    const { title, description, url, imageUrl, albumId } = req.body;
    const song = await Song.findByPk(songId);

    if (!song) {
        res.status(404)
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    if (user !== song.userId) {
        res.status(401)
        return res.json({
            message: "User must be the Song's owner",
            statusCode: 401
        })
    }

    if (!title && !url) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Song title is required",
                url: "Audio is required"
            }
        })
    } else if (!title) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                title: "Song title is required",
            }
        })
    } else if (!url) {
        res.status(400)
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
            imageUrl,
            albumId
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

    if (!song) {
        res.status(404)
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    if (user !== song.userId) {
        res.status(401)
        return res.json({
            message: "User must be the Song's owner",
            statusCode: 401
        })
    }

    await song.destroy();

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

// Get comments by a song's id
router.get('/:songId/comments', async (req, res) => {
    const songId = req.params.songId;
    const song = await Song.findByPk(songId)

    if (!song) {
        res.status(404)
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    const comments = await Comment.findAll({
        where: { songId: songId },
        include:
            { model: User, attributes: ['id', 'username'] },
    })

    res.json({ comments })
})

// Create a Comment for a song based on song's id
router.post('/:songId/comments', requireAuth, async (req, res) => {
    const user = req.user.id;
    const songId = req.params.songId;
    const { body } = req.body;
    const song = await Song.findByPk(songId);

    if (!song) {
        res.status(404)
        return res.json({
            message: "Song couldn't be found",
            statusCode: 404
        })
    }

    if (!body) {
        res.status(400)
        return res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: {
                body: "Comment body text is required",
            }
        })
    }

    const newComment = await Comment.create({
        userId: user,
        songId: songId,
        body,
        createdAt: res.body,
        updatedAt: res.body
    })
    res.status(200)
    return res.json(newComment)
})

module.exports = router;
