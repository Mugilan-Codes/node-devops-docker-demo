const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose
  .connect('mongodb://mugil:mypassword@mongodb:27017/?authSource=admin')
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
