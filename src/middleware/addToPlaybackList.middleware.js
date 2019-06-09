const User = require('../model/user.model');
const isValidPayload = require('./utils/validatePayload');
const reqHeader = require('./utils/reqHeader');

const addToPlaybackList = async (req, res, next) => {
  const authorization = reqHeader.extractAuth(req);

  if (!authorization || !isValidPayload(authorization, ['email'])) {
    return res.status(403).json({ status: 403, message: 'FORBIDDEN' });
  }

  let user = {};
  try {
    user = await User.update({ authorization, openConnections: 1 });
  } catch (error) {
    req.log.error(error);
    return res.status(500).send({ message: 'Error updating user connections.' });
  }
  res.locals.auth = { ...user };
  next();
};

module.exports = addToPlaybackList;
