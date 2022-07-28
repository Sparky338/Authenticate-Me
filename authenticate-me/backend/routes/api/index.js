const router = require('express').Router();
const { restoreUser } = require('../../utils/auth.js');

// GET /api/restore-user
router.use(restoreUser);

module.exports = router;
