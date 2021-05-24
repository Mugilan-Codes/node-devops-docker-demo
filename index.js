const express = require('express');
const mongoose = require('mongoose');

const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
} = require('./config/config');
const postRouter = require('./routes/postRoutes');

const app = express();

const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

// This is to ensure mongodb is up and running. (healthcheck)
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

app.use(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello There!!!</h1>');
});

app.use('/api/v1/posts', postRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on PORT ${port}`);
});
