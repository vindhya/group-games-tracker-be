const {
  getAllWins,
  getCoupData,
  getAvalonData
} = require('../../utils/helpers');

const gamesController = (req, res) => {
  getAllWins()
    // try just .json({ data }) later
    .then(data => res.status(200).json({ data: data }))
    .catch(error => res.status(400).json({ error }));
};

const gameController = (req, res) => {
  const { game } = req.params;

  switch (game) {
    case 'avalon':
      getAvalonData().then(data => res.status(200).json({ data: data }));
      break;
    case 'coup':
      getCoupData().then(data => res.status(200).json({ data: data }));
      break;
  }
};

module.exports = { gamesController, gameController };
