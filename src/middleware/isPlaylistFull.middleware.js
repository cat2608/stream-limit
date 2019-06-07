const isValidPayload = require('./validatePayload');

const isPlaylistFull = (req, res, next) => {
  const { auth } = res.locals;
  if (auth && isValidPayload(auth, ['openConnection']) && auth.openConnection > 3) {
    return res.status(403).json();
  }
  next();
};

module.exports = isPlaylistFull;
