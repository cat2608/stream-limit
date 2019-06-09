const user = require('../controller/user.controller');
const { removeFromPlaybackList } = require('../middleware');

module.exports = (app) => {
  app.post('/api/user/logout', removeFromPlaybackList, user.logout);
};
