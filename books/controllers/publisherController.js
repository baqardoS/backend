const Publisher = require('../models/publisherModel');
const factory = require('./handlerFactory');

exports.getAllPublishers = factory.getAll(Publisher);
exports.createPublisher = factory.createOne(Publisher);
exports.updatePublisher = factory.updateOne(Publisher);
exports.deletePublisher = factory.deleteOne(Publisher);
