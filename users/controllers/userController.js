const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead',
  });
};

exports.preventPasswordChange = (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(new AppError('Changing password by admin is forbidden', 403));
  next();
};

exports.getAllUsers = catchAsync(async (req, res) => {
  const features = await new APIFeatures(User.find(), req.query, User)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const users = await features.query;

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: users.length,
    data: { users },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  return res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    data: { user },
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.becomeAdministrator = catchAsync(async (req, res, next) => {
  if (process.env.NODE_ENV === 'production') next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
  const user = await User.findByIdAndUpdate(req.user.id, {role:"admin"}, {
    new: true,
    runValidators: true,
  }).select('-_id name email role');

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) return next(new AppError('No user found with that ID', 404));

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-_id name email');

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm)
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );

  const filteredBody = filterObj(req.body, 'name', 'email');
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  }).select('-_id name email');

  res.status(200).json({
    status: 'success',
    data: { user: updatedUser },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
