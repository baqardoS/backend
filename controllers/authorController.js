const Author = require('../models/authorModel');
const factory = require('./handlerFactory');

exports.getAllAuthors = factory.getAll(Author);
exports.createAuthor = factory.createOne(Author);
exports.updateAuthor = factory.updateOne(Author);
exports.deleteAuthor = factory.deleteOne(Author);
