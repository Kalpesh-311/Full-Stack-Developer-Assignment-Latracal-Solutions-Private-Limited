import express, { Request, Response } from 'express';
import BookModel from '../models/Book.js';
import ReviewModel from '../models/Review.js';
import UserModel from '../models/User.js';

const router = express.Router();

// GET /books - Fetch all books (add pagination support)
router.get('/books', async (req, res) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const books = await BookModel.find()
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /books/:id - Fetch one book
router.get('/books/:id', async (req: Request, res: Response) => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(404).json({ error: 'Book not found' });
  }
});

// POST /books - Add a new book (admin only, placeholder for admin check)
router.post('/books', async (req, res) => {
  // TODO: Add admin authentication middleware
  try {
    const book = new BookModel(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// POST /reviews - Submit a review
router.post('/reviews', async (req, res) => {
  try {
    const review = new ReviewModel(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

// GET /reviews?bookId=xxx - Get reviews for a book
router.get('/reviews', async (req, res) => {
  try {
    const { bookId } = req.query;
    if (!bookId) return res.status(400).json({ error: 'bookId query param required' });
    const reviews = await ReviewModel.find({ bookId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// GET /users/:id - Get user profile
router.get('/users/:id', async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(404).json({ error: 'User not found' });
  }
});

// PUT /users/:id - Update user profile
router.put('/users/:id', async (req, res) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: 'User not found' });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: (error as Error).message });
  }
});

router.get('/genres', async (req, res) => {
  try {
    const genres = await BookModel.distinct('genre');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});

export default router;
// Export the router to be used in the main app