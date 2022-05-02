const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} = require('../controllers/languageController');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllLanguages)
  .post(protect, restrictTo('admin'), createLanguage);
router
  .route('/:id')
  .patch(protect, restrictTo('admin'), updateLanguage)
  .delete(protect, restrictTo('admin'), deleteLanguage);

module.exports = router;
