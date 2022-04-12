const express = require('express');
const fs = require('fs');

const books = JSON.parse(fs.readFileSync(`${__dirname}/../data.json`));

exports.findBook = (req, res, next, val) => {
  const book = books.find((el) => el.index === val);

  if (!book)
    return res.status(404).json({
      status: 'fail',
      message: 'Book not found',
    });

  req.book = book;

  next();
};

exports.checkBody = (req, res, next) => {
  const bookProperties = [
    'title',
    'cover',
    'description',
    'category',
    'author',
    'publisher',
    'language',
    'pages',
    'premiere_date',
    'size',
    'index',
  ];

  if (bookProperties.some((property) => !req.body[property]))
    return res.status(400).json({
      status: 'fail',
      message: `Missing book data`,
    });
  next();
};

exports.getAllBooks = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: books.length,
    data: { books },
  });
};

exports.getBook = (req, res) => {
  const book = req.book;

  return res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { book },
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
  const book = req.book;

  res.status(200).json({
    status: 'success',
    data: { book: 'Updated book here' },
  });
};

exports.deleteBook = (req, res) => {
  const book = req.book;

  res.status(204).json({
    status: 'success',
    data: null,
  });
};
