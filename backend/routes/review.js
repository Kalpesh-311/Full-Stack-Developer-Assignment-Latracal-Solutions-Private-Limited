const express = require('express');
const { body } = require('express-validator');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.get('/', reviewController.getReviews);
router.post(
  '/',
  [
    body('book').notEmpty().withMessage('Book ID is required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be 1-5'),
    // ...add more validation as needed...
  ],
  reviewController.createReview
);

module.exports = router;
