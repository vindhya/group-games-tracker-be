const express = require('express');

const { gamesController } = require('./games.controller');

const router = express.Router();

router.get('/', (req, res) =>
  res.send(`you've reached the root games route! ...there's nothing here`)
);
router.get('/:game', gamesController);

module.exports = { gamesRouter: router };
