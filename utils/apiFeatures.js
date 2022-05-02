const Author = require('../models/authorModel');
const Category = require('../models/categoryModel');
const Language = require('../models/languageModel');
const Publisher = require('../models/publisherModel');

class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  async filterWithReference() {
    const queryObj = { ...this.queryString };

    const includedFields = ['author', 'publisher', 'category', 'language'];

    Object.keys(queryObj).forEach(
      (el) => !includedFields.includes(el) && delete queryObj[el]
    );

    if ('author' in queryObj) {
      const authorData = queryObj.author.split(' ');
      let name = authorData[0];
      const surname = authorData[0];
      if (authorData.length > 1) name = authorData[0];
      const authors = await Author.find({
        $or: [
          { name: { $in: [name, surname] } },
          { surname: { $in: [name, surname] } },
        ],
      });
      const ids = authors.map((author) => author._id);
      queryObj.author = { $in: ids };
    }

    if ('publisher' in queryObj) {
      const publishers = await Publisher.find({
        name: { $regex: queryObj.publisher, $options: 'i' },
      });
      const ids = publishers.map((publisher) => publisher._id);
      queryObj.publisher = { $in: ids };
    }

    if ('category' in queryObj) {
      const categories = await Category.find({
        name: { $regex: queryObj.category, $options: 'i' },
      });
      const ids = categories.map((category) => category._id);
      queryObj.category = { $in: ids };
    }

    if ('language' in queryObj) {
      const languages = await Language.find({
        name: { $regex: queryObj.language, $options: 'i' },
      });
      const ids = languages.map((language) => language._id);
      queryObj.language = { $in: ids };
    }

    this.query = this.query.find(queryObj);

    return this;
  }

  filter() {
    const queryObj = { ...this.queryString };

    //? Exclude non field parameters
    const excludedFields = [
      'page',
      'sort',
      'limit',
      'fields',
      'author',
      'publisher',
      'category',
      'language',
    ];
    excludedFields.forEach((el) => delete queryObj[el]);

    //? Handle searching by checking if field contain value
    const containFields = ['title', 'description', 'name', 'email'];
    containFields.forEach((el) => {
      if (queryObj[el]) queryObj[el] = { $regex: queryObj[el], $options: 'i' };
    });

    //? Handle comparison operators
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(`${sortBy} _id`);
    } else {
      this.query = this.query.sort('-createdAt _id');
    }

    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  async paginate() {
    //? Handle pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 10;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    //? Check if page exists
    if (this.queryString.page) {
      const numBooks = await this.query.countDocuments();
      if (skip >= numBooks) throw new Error('This page does not exist');
    }

    return this;
  }
}

module.exports = APIFeatures;
