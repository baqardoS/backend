const express = require('express');

const {
  getAllBooks,
  createBook,
  getBook,
  updateBook,
  deleteBook,
  findBook,
  checkBody,
} = require('./../controllers/bookController');

const router = express.Router();

router.param('id', findBook);

router.route('/').get(getAllBooks).post(checkBody, createBook);
router.route('/:id').get(getBook).patch(updateBook).delete(deleteBook);

module.exports = router;
