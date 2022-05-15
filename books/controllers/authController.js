const axios = require('axios');

const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.protect = catchAsync(async (req, res, next) => {
  //? Check if token exists
  if (!req.cookies.jwt)
    return next(
      new AppError('You are not logged in! Please login to get access.', 401)
    );

  try {
    await axios.get(
      `http://127.0.0.1:3001/api/v1/users/authenticateUser/${req.cookies.jwt}`
    );
  } catch (err) {
    next(new AppError(err.response.data.message, err.response.status));
  }

  next();
});

exports.restrictTo = (...roles) => {
  return catchAsync(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );

    next();
  });
};
