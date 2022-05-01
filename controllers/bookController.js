const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

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

exports.getAllBooks = catchAsync(async (req, res) => {
  let features = await new APIFeatures(
    Book.find(),
    req.query
  ).filterWithReference();
  features = await features.filter().sort().limitFields().paginate();

  const books = await features.query;

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: books.length,
    data: { books },
  });
});

exports.getBook = catchAsync(async (req, res, next) => {
  const book = await Book.findById(req.params.id);

  if (!book) return next(new AppError('No book found with that ID', 404));

  return res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { book },
  });
});

exports.createBook = catchAsync(async (req, res) => {
  const category = await Category.findOneAndUpdate(
    { name: req.body.category },
    { name: req.body.category },
    {
      new: true,
      upsert: true,
    }
  );
  req.body.category = category._id;

  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { book: newBook },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
  const category = await Category.findOneAndUpdate(
    { name: req.body.category },
    { name: req.body.category },
    {
      new: true,
      upsert: true,
    }
  );
  req.body.category = category._id;

  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!book) return next(new AppError('No book found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { book },
  });
});

exports.deleteBook = catchAsync(async (req, res, next) => {
  const book = await Book.findByIdAndDelete(req.params.id);

  if (!book) return next(new AppError('No book found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getBooksStats = catchAsync(async (req, res) => {
  const stats = await Book.aggregate([
    {
      $match: { _id: { $exists: true } },
    },
    {
      $group: {
        _id: '$category',
        booksQuantity: { $sum: 1 },
        avgPages: { $avg: '$pages' },
        minPages: { $min: '$pages' },
        maxPages: { $max: '$pages' },
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: stats,
  });
});
