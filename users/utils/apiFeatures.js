const AppError = require('./appError');

class APIFeatures {
  constructor(query, queryString, model) {
    this.query = query;
    this.queryString = queryString;
    this.model = model;
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
      this.query = this.query.select(`${fields}`);
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
      const numBooks = await this.model.countDocuments();
      if (skip >= numBooks) throw new AppError('This page does not exist', 404);
    }

    return this;
  }
}

module.exports = APIFeatures;
