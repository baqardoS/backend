const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'A book must have a title'],
    maxlength: [100, 'A book title must be less or equal to 100 characters'],
    minlength: [2, 'A book title must be more or equal to 2 characters'],
  },
  cover: {
    type: String,
    trim: true,
    required: [true, 'A book must have a cover'],
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'A book must have a description'],
    minlength: [
      20,
      'A book description must be more or equal to 20 characters',
    ],
  },
  category: {
    type: String,
    required: [true, 'A book must have a category'],
    maxlength: [50, 'A book title must be less or equal to 50 characters'],
    minlength: [2, 'A book title must be more or equal to 2 characters'],
  },
  author: {
    type: String,
    required: [true, 'A book must have an author'],
  },
  pages: {
    type: Number,
    required: [true, 'A book must have a number of pages'],
    min: [20, 'Number of pages must be 20 or more'],
  },
  premiere_date: {
    type: Date,
    required: [true, 'A book must have a premiere date'],
    max: [Date.now(), "Premiere date can't be in the future"],
  },
  index: {
    type: String,
    required: [true, 'A book must have a premiere index'],
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  publisher: String,
  language: String,
  size: String,
  slug: String,
});

//? Document middleware: runs before ONLY .save() and .create()
bookSchema.pre('save', function (next) {
  this.slug = slugify(`${this.title} ${this.index}`, { lower: true });

  next();
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
