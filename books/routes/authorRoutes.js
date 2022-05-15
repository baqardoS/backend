const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');
const {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllAuthors)
  .post(protect, restrictTo('admin'), createAuthor);
router
  .route('/:id')
  .patch(protect, restrictTo('admin'), updateAuthor)
  .delete(protect, restrictTo('admin'), deleteAuthor);

module.exports = router;
