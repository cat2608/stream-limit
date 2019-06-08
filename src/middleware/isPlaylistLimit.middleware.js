const isValidPayload = require('./validatePayload');

const isPlaylistLimit = (req, res, next) => {
  const { auth } = res.locals;
  if (auth && isValidPayload(auth, ['openConnections']) && auth.openConnections > 3) {
    return res.status(403).json({ status: 403, message: 'FORBIDDEN' });
  }
  next();
};

module.exports = isPlaylistLimit;
