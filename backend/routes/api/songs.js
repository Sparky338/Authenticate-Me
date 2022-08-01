const express = require('express');
const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User, Album } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();



// All songs
router.get('/', async (req, res) => {
    const allSongs = await Song.findAll();

    return res.json(allSongs);
})

module.exports = router;
