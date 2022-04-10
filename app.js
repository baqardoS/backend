const express = require('express');
const fs = require('fs');

const app = express();

const books = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

app.get('/api/v1/books', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: { books },
  });
});

const port = 3000;
app.listen(port, () => {
  console.log('App started');
});
