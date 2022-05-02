const express = require('express');
const {
  getAllLanguages,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} = require('../controllers/languageController');

const router = express.Router();

router.route('/').get(getAllLanguages).post(createLanguage);
router.route('/:id').patch(updateLanguage).delete(deleteLanguage);

module.exports = router;
