const express = require('express');
const cors = require('cors');
const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();
const port = 5500;


app.use(cors());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api', indexRouter);

app.all('*', (req, res, next) => {
  res.send('404 ERROR');
});

app.listen(port, () => {
console.log('server running at ' + port)
});

module.exports = app;