const express = require('express');
const fs = require('fs');

const app = express();

app.use(express.json());

const books = JSON.parse(fs.readFileSync(`${__dirname}/data.json`));

const getAllBooks = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: books.length,
    data: { books },
  });
};

const getBook = (req, res) => {
  const id = req.params.id;
  const book = books.find((el) => el.index === id);

  if (book)
    return res.status(200).json({
      status: 'success',
      data: { book },
    });

  res.status(404).json({
    status: 'fail',
    message: 'Book not found',
  });
};

const createBook = (req, res) => {
  const newBook = { ...req.body };

  books.push(newBook);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(books), (err) => {
    res.status(201).json({
      status: 'success',
      data: { book: newBook },
    });
  });
};

const updateBook = (req, res) => {
  const id = req.params.id;

  const book = books.find((el) => el.index === id);

  if (book)
    res.status(200).json({
      status: 'success',
      data: { book: 'Updated book here' },
    });

  res.status(404).json({
    status: 'fail',
    message: 'Book not found',
  });
};

const deleteBook = (req, res) => {
  const id = req.params.id;

  const book = books.find((el) => el.index === id);

  if (book)
    res.status(204).json({
      status: 'success',
      data: null,
    });

  res.status(404).json({
    status: 'fail',
    message: 'Book not found',
  });
};

app.route('/api/v1/books').get(getAllBooks).post(createBook);
app
  .route('/api/v1/books/:id')
  .get(getBook)
  .patch(updateBook)
  .delete(deleteBook);

const port = 3000;
app.listen(port, () => {
  console.log('App started');
});
