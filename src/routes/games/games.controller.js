const { getAllWins } = require('../../utils/helpers');

const gamesController = (req, res) => {
  // db.collection()
  //   .get()
  //   .then(snapshot =>
  //     res.status(200).json({
  //       data: snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  //     })
  //   )
  //   .catch(error => res.status(400).json({ error }));

  getAllWins()
    // try just .json({ data }) later
    .then(data => res.status(200).json({ data: data }))
    .catch(error => res.status(400).json({ error }));
};

module.exports = { gamesController };
