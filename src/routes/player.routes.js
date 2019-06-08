const player = require('../controller/player.controller');
const { addToPlaybackList, isPlaylistLimit } = require('../middleware');

module.exports = (app) => {
  app.get('/api/play/:clipId', [addToPlaybackList, isPlaylistLimit], player.playClip);
};
