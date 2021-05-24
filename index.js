const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Get IPAddress of the container using docker inspect command
mongoose
  .connect('mongodb://mugil:mypassword@172.31.0.2:27017/?authSource=admin')
  .then(() => {
    console.log('successfully connected to DB');
  })
  .catch((err) => {
    console.log(err);
  });

app.get('/', (req, res) => {
  res.send('<h1>Hello There!!!</h1>');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on PORT ${port}`);
});
