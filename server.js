const express = require('express');
const bodyParser = require('body-parser');
const pino = require('pino')();
const expressPino = require('express-pino-logger')({ level: process.env.LOG_LEVEL || 'info' });

const app = express();

const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressPino);

app.get('/health', (req, res) => {
  res.json({ message: 'Alive.' });
});

require('./src/routes/player.routes')(app);

app.listen(PORT, () => pino.info(
  { endpoint: `http://127.0.0.1:${PORT}` },
  `Server is running on port ${PORT}`,
));

module.exports = app;
