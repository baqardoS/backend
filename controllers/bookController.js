const fs = require('fs');

const books = JSON.parse(fs.readFileSync(`${__dirname}/../data.json`));

exports.getAllBooks = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: books.length,
    data: { books },
  });
};

exports.getBook = (req, res) => {
  const id = req.params.id;
  const book = books.find((el) => el.index === id);

  if (book)
    return res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { book },
    });

  res.status(404).json({
    status: 'fail',
    message: 'Book not found',
  });
};

exports.createBook = (req, res) => {
  const newBook = { ...req.body };

  books.push(newBook);
  fs.writeFile(`${__dirname}/data.json`, JSON.stringify(books), (err) => {
    res.status(201).json({
      status: 'success',
      data: { book: newBook },
    });
  });
};

exports.updateBook = (req, res) => {
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

exports.deleteBook = (req, res) => {
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
