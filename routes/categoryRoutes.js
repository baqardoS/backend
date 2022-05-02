const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
} = require('../controllers/categoryController');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllCategories)
  .post(protect, restrictTo('admin'), createCategory);
router
  .route('/:id')
  .patch(protect, restrictTo('admin'), updateCategory)
  .delete(protect, restrictTo('admin'), deleteCategory);

module.exports = router;
