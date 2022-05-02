const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc)
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()} found with that ID`,
          404
        )
      );

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc)
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()} found with that ID`,
          404
        )
      );

    res.status(200).json({
      status: 'success',
      data: { [Model.modelName.toLowerCase()]: doc },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res) => {
    const newDoc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: { [Model.modelName.toLowerCase()]: newDoc },
    });
  });

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findById(req.params.id);

    if (!doc)
      return next(
        new AppError(
          `No ${Model.modelName.toLowerCase()} found with that ID`,
          404
        )
      );

    return res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      data: { [Model.modelName.toLowerCase()]: doc },
    });
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    let features = await new APIFeatures(
      Model.find(),
      req.query
    ).filterWithReference();
    features = await features.filter().sort().limitFields().paginate();

    const doc = await features.query;

    res.status(200).json({
      status: 'success',
      requestedAt: req.requestTime,
      results: doc.length,
      data: { [Model.modelName.toLowerCase()]: doc },
    });
  });
