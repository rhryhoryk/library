const express = require('express');
const mongoose = require('mongoose');
const configVariables = require('./config/variables');
const cors = require('./config/cors').cors;

const dbUrl = configVariables.dataBaseUrl;

mongoose.connect(
  dbUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }, 
  (err) => {
    if (err) {
      throw err;
    } else {
      console.log(`library-db0 connection is done.....`)
    }
  }
)

const app = express();

app.use(express.json());
app.use(cors);

app.use('/api/books', require('./api/routes/books.route'));

app.get('/', (req, res) => {
  res.status(200).json({ msg: 'ok' });
});

module.exports = app;
