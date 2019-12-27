const express = require('express');

const { gamesRouter } = require('../routes/games/games.router');

const router = express.Router();
router.use('/games', gamesRouter);

module.exports = router;
