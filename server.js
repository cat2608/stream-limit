const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/health', (req, res) => {
  res.json({ message: 'Alive.' });
});

app.listen(3000, () => console.log('Server is listening on port 3000'));

module.exports = app;
