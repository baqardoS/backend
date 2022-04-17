const Book = require('../models/bookModel');
const APIFeatures = require('../utils/apiFeatures');

exports.alias5LongestBooks = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-pages';
  req.query.fields = 'title,cover,description,pages,category,author';

  next();
};

exports.aliasNewThisYear = (req, res, next) => {
  req.query.premiere_date = { gte: `${new Date().getFullYear()}` };
  req.query.sort = '-premiere_date';
  req.query.fields = 'title,cover,description,pages,category,author';

  next();
};

exports.getAllBooks = async (req, res) => {
  try {
    const features = await new APIFeatures(Book.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const books = await features.query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: books.length,
      data: { books },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.getBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    return res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { book },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.createBook = async (req, res) => {
  try {
    const newBook = await Book.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { book: newBook },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent!',
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: { book },
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error,
    });
  }
};
