const Book = require('../models/bookModel');

exports.getAllBooks = async (req, res) => {
  try {
    const queryObj = { ...req.query };

    //? Exclude non field parameters
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //? Handle searching by checking if field contain value
    const containFields = ['title', 'description', 'author', 'publisher'];
    containFields.forEach((el) => {
      if (queryObj[el]) queryObj[el] = { $regex: queryObj[el], $options: 'i' };
    });

    //? Handle comparison operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Book.find(JSON.parse(queryStr));

    //? Handle sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(`${sortBy} _id`);
    } else {
      query = query.sort('-createdAt _id');
    }

    //? Handle fields limiting
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    //? Handle pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);

    //? Check if page exists
    if (req.query.page) {
      const numBooks = await Book.countDocuments();
      if (skip >= numBooks) throw new Error('This page does not exist');
    }

    const books = await query;

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
