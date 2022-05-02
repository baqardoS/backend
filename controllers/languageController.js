const Language = require('../models/languageModel');
const factory = require('./handlerFactory');

exports.getAllLanguages = factory.getAll(Language);
exports.createLanguage = factory.createOne(Language);
exports.updateLanguage = factory.updateOne(Language);
exports.deleteLanguage = factory.deleteOne(Language);
