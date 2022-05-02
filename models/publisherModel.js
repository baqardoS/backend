const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please specify publisher name'],
    unique: true,
  },
});

const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;
