const User = require('../model/user.model');
const reqHeader = require('./utils/reqHeader');

const removeFromPlaybackList = async (req, res, next) => {
  const authorization = reqHeader.extractAuth(req);

  if (!authorization) {
    return res.status(403).json({ status: 403, message: 'FORBIDDEN' });
  }

  let user = {};
  try {
    user = await User.update({ authorization, openConnections: -1 });
  } catch (error) {
    req.log.error(error);
    return res.status(500).send({ message: 'Error updating user connections.' });
  }
  res.locals.auth = { ...user };
  next();
};

module.exports = removeFromPlaybackList;
