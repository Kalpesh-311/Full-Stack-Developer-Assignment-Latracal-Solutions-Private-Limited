const Review = require('../models/Review');
const { validationResult } = require('express-validator');

exports.getReviews = async (req, res, next) => {
  try {
    const { bookId } = req.query;
    if (!bookId) return res.status(400).json({ error: 'bookId query param required' });
    const reviews = await Review.find({ book: bookId }).populate('user', 'username');
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const review = new Review({
      ...req.body,
      user: req.user._id // Assume req.user is set after authentication
    });
    await review.save();
    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};
