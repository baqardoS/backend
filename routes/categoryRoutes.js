const express = require('express');
const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router.route('/').get(getAllCategories).post(createCategory);
router.route('/:id').patch(updateCategory).delete(deleteCategory);

module.exports = router;
