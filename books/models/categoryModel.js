const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A book must have a category'],
    maxlength: [50, 'A book title must be less or equal to 50 characters'],
    minlength: [2, 'A book title must be more or equal to 2 characters'],
    unique: true,
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
