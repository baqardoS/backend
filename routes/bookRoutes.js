const express = require('express');

const { protect } = require('../controllers/authController');

const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  aliasNewThisYear,
  alias5LongestBooks,
  getBooksStats,
} = require('../controllers/bookController');

const router = express.Router();

router.route('/published-this-year').get(aliasNewThisYear, getAllBooks);
router.route('/top-5-longest').get(alias5LongestBooks, getAllBooks);
router.route('/stats').get(getBooksStats);

router.route('/').get(protect, getAllBooks).post(createBook);
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
