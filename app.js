const bodyParser = require('body-parser');
const express = require('express')
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require('./routes');

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 8000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(MONGO_URL, { useNewUrlParser: true });

mongoose.connection.once('open', () => console.log('Connected to the database!'));
mongoose.connection.on('error', () => console.log('MongoDB connection error: '))

app.use('/', routes());

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`)
});
