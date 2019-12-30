const mergeWith = require('lodash/mergeWith');

const db = require('../db');
const { GAMES } = require('../constants');

const getCoupStats = async () => {
  const snapshot = await db.collection(GAMES.COUP).get();

  return snapshot.docs.map(currentDoc => {
    const doc = currentDoc.data();
    return { id: currentDoc.id, ...doc };
  });
};

const getAvalonStats = async () => {
  const snapshot = await db.collection(GAMES.AVALON).get();

  return snapshot.docs.map(currentDoc => {
    const doc = currentDoc.data();
    return { id: currentDoc.id, ...doc };
  });
};

const getOverallCoupWins = async () => {
  const snapshot = await db.collection(GAMES.COUP).get();

  return snapshot.docs.reduce((acc, currentDoc) => {
    const doc = currentDoc.data();
    if (!acc[doc.winner]) {
      return { ...acc, [doc.winner]: 1 };
    }
    return { ...acc, [doc.winner]: acc[doc.winner] + 1 };
  }, {});
};

const getOverallAvalonWins = async () => {
  const snapshot = await db.collection(GAMES.AVALON).get();

  return snapshot.docs.reduce((acc, currentDoc) => {
    const doc = currentDoc.data();
    let newAcc = { ...acc };
    doc.winners.forEach(winner => {
      if (!newAcc[winner]) {
        newAcc = { ...newAcc, [winner]: 1 };
      } else {
        newAcc = { ...newAcc, [winner]: newAcc[winner] + 1 };
      }
    });
    return newAcc;
  }, {});
};

const getAllWins = async () => {
  // get coup wins by player
  const coupWins = await getOverallCoupWins();
  // get avalon wins by player
  const avalonWins = await getOverallAvalonWins();

  // merge together the win objects
  const mergeCustomizer = (objValue, srcValue) => {
    if (objValue && srcValue) {
      return objValue + srcValue;
    } else if (objValue && !srcValue) {
      return objValue;
    } else if (!objValue && srcValue) {
      return srcValue;
    }
  };
  const totalWins = mergeWith(coupWins, avalonWins, mergeCustomizer);

  // return merged object
  return totalWins;
};

const getCoupData = async () => {
  const data = { wins: {}, stats: [] };
  data.wins = await getOverallCoupWins();
  data.stats = await getCoupStats();
  return data;
};

const getAvalonData = async () => {
  const data = { wins: {}, stats: [] };
  data.wins = await getOverallAvalonWins();
  data.stats = await getAvalonStats();
  return data;
};

module.exports = { getAllWins, getCoupData, getAvalonData };
