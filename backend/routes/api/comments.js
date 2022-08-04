const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Album, Song, Comment } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

//Edit a comment
router.put('/:commentId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const commentId = req.params.commentId;
    const {body} = req.body;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
        res.status(404)
        return res.json({
            message: "Comment couldn't be found",
            statusCode: 404
        })
    }

    if (user !== comment.userId) {
        res.status(401)
        return res.json({
            message: "User must be the comment's owner",
            statusCode: 401
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
    } else {
        const editComment = await Comment.findByPk(commentId)
        editComment.set({body})

        await editComment.save()

        res.status(200)
        return res.json(editComment)
    }
})

// Delete a comment
router.delete('/:commentId', requireAuth, async (req, res) => {
    const user = req.user.id;
    const commentId = req.params.commentId;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
        res.status(404)
        return res.json({
            message: "Comment couldn't be found",
            statusCode: 404
        })
    }

    if (user !== comment.userId) {
        res.status(401)
        return res.json({
            message: "User must be the comment's owner",
            statusCode: 401
        })
    }

    await comment.destroy();

    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
