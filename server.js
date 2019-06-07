const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')({ level: 'debug' });

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(pino);

app.get('/health', (req, res) => {
  res.json({ message: 'Alive.' });
});

require('./src/routes/player.routes')(app);

app.listen(3000, () => console.log('Server is listening on port 3000'));

module.exports = app;
