const express = require('express');

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

router.route('/').get(getAllBooks).post(createBook);
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
