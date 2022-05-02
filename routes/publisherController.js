const express = require('express');
const {
  getAllPublishers,
  createPublisher,
  updatePublisher,
  deletePublisher,
} = require('../controllers/publisherController');

const router = express.Router();

router.route('/').get(getAllPublishers).post(createPublisher);
router.route('/:id').patch(updatePublisher).delete(deletePublisher);

module.exports = router;
