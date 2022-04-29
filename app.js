const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const bookRouter = require('./routes/bookRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//? Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});

app.use('/api', limiter);
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//? Routes

app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);

//? Handle unhandled routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
