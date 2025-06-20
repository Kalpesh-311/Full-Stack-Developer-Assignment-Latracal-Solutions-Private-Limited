const express = require('express');
const { body } = require('express-validator');
const bookController = require('../controllers/bookController');
const admin = require('../middleware/admin');
const BookModel = require('../models/Book');


const router = express.Router();

router.get('/', bookController.getBooks);
router.get('/:id', bookController.getBookById);
router.post(
  '/',
  admin,
  [
    body('title').notEmpty().withMessage('Title is required'),
    // ...add more validation as needed...
  ],
  bookController.createBook
);
router.get('/genres', async (req, res) => {
  const genres = await BookModel.distinct('genre');
  res.json(genres);
});
router.get('/', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching books' });
  }
});

module.exports = router;

router.get('/genres', async (req, res) => {
  try {
    const genres = await BookModel.distinct('genre');
    res.json(genres);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch genres' });
  }
});
