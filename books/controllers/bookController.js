const Book = require('../models/bookModel');
const Category = require('../models/categoryModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Language = require('../models/languageModel');
const Publisher = require('../models/publisherModel');
const Author = require('../models/authorModel');
const factory = require('./handlerFactory');

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

exports.getAllBooks = factory.getAll(Book);
exports.getBook = factory.getOne(Book);
exports.deleteBook = factory.deleteOne(Book);

exports.setPublisherAuthorLanguageCategory = catchAsync(
  async (req, res, next) => {
    if (req.body.category) {
      const category = await Category.findOneAndUpdate(
        { name: req.body.category },
        { name: req.body.category },
        {
          new: true,
          upsert: true,
        }
      );
      req.body.category = category._id;
    }

    if (req.body.language) {
      const language = await Language.findOneAndUpdate(
        { name: req.body.language },
        { name: req.body.language },
        {
          new: true,
          upsert: true,
        }
      );
      req.body.language = language._id;
    }

    if (req.body.publisher) {
      const publisher = await Publisher.findOneAndUpdate(
        { name: req.body.publisher },
        { name: req.body.publisher },
        {
          new: true,
          upsert: true,
        }
      );
      req.body.publisher = publisher._id;
    }

    if (req.body.author) {
      const author = await Author.findOneAndUpdate(
        {
          name: req.body.author.split(' ')[0],
          surname: req.body.author.split(' ')[1],
        },
        {
          name: req.body.author.split(' ')[0],
          surname: req.body.author.split(' ')[1],
        },
        {
          new: true,
          upsert: true,
        }
      );
      req.body.author = author._id;
    }

    next();
  }
);

exports.createBook = catchAsync(async (req, res) => {
  const newBook = await Book.create(req.body);

  res.status(201).json({
    status: 'success',
    data: { book: newBook },
  });
});

exports.updateBook = catchAsync(async (req, res, next) => {
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
