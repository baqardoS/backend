const express = require('express');
const {
  getAllAuthors,
  createAuthor,
  updateAuthor,
  deleteAuthor,
} = require('../controllers/authorController');

const router = express.Router();

router.route('/').get(getAllAuthors).post(createAuthor);
router.route('/:id').patch(updateAuthor).delete(deleteAuthor);

module.exports = router;
