const express = require('express');

const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  aliasNewThisYear,
  alias5LongestBooks,
  getBooksStats,
  setPublisherAuthorLanguageCategory,
} = require('../controllers/bookController');

const router = express.Router();

router
  .route('/published-this-year')
  .get(protect, aliasNewThisYear, getAllBooks);
router.route('/top-5-longest').get(protect, alias5LongestBooks, getAllBooks);
router.route('/stats').get(protect, getBooksStats);

router
  .route('/')
  .get(protect, getAllBooks)
  .post(
    protect,
    restrictTo('admin'),
    setPublisherAuthorLanguageCategory,
    createBook
  );
router
  .route('/:id')
  .get(protect, getBook)
  .patch(
    protect,
    restrictTo('admin'),
    setPublisherAuthorLanguageCategory,
    updateBook
  )
  .delete(protect, restrictTo('admin'), deleteBook);

module.exports = router;
