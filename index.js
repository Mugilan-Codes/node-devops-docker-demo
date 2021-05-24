const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello There!</h1>');
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on PORT ${port}`);
});
