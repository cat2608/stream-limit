const player = require('../controller/player.controller');

module.exports = (app) => {
  app.get('/api/play/:clipId', player.playClip);
};
