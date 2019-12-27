const express = require('express');

const { gamesController } = require('./games.controller');

const router = express.Router();

router.get('/', gamesController);
router.get('/:game', (req, res) =>
  res.send(`you've reached a single game route! ...there's nothing here`)
);

module.exports = { gamesRouter: router };
