const express = require('express');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User, Album, Song } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// router.get('/:albumId', async (req, res) => {
//     const albums = await Album.findAll();

//     return res.json(albums)
// })

// Get all albums
router.get('/', async (req, res) => {
    const albums = await Album.findAll();

    res.json({albums})
})

module.exports = router;
