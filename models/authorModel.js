const mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please specify author name'],
  },
  surname: {
    type: String,
    required: [true, 'Please specify author surname'],
  },
});

authorSchema.index({ name: 1, surname: 1 }, { unique: true });

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;
