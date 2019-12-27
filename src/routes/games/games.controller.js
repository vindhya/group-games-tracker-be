const db = require('../../db');

const gamesController = (req, res) => {
  const { game } = req.params;

  db.collection(game)
    .get()
    .then(snapshot =>
      res
        .status(200)
        .json({
          data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        })
    )
    .catch(error => res.status(400).json({ error }));
};

module.exports = { gamesController };
