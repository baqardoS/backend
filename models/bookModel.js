const mongoose = require('mongoose');
const slugify = require('slugify');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'A book must have a title'],
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
  },
  category: {
    type: String,
    required: [true, 'A book must have a category'],
  },
  author: {
    type: String,
    required: [true, 'A book must have an author'],
  },
  pages: {
    type: Number,
    required: [true, 'A book must have a number of pages'],
  },
  premiere_date: {
    type: Date,
    required: [true, 'A book must have a premiere date'],
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
