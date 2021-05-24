const express = require('express');
const mongoose = require('mongoose');

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require('./config/config');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectWithRetry = () => {
  mongoose
    .connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    .then(() => {
      console.log('successfully connected to DB');
    })
    .catch((err) => {
      console.log(err);
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();

app.get('/', (req, res) => {
  res.send('<h1>Hello There!!!</h1>');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on PORT ${port}`);
});
