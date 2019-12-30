const express = require('express');

const { gamesController, gameController } = require('./games.controller');

const router = express.Router();

router.get('/', gamesController);
router.get('/:game', gameController);

module.exports = { gamesRouter: router };
