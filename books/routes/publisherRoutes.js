const express = require('express');
const { protect, restrictTo } = require('../controllers/authController');

const {
  getAllPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
} = require('../controllers/publisherController');

const router = express.Router();

router
  .route('/')
  .get(protect, getAllPublishers)
  .post(protect, restrictTo('admin'), createPublisher);
router
  .route('/:id')
  .patch(protect, restrictTo('admin'), updatePublisher)
  .delete(protect, restrictTo('admin'), deletePublisher);

module.exports = router;
