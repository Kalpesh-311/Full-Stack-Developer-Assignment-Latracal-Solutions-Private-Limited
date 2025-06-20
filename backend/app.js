import express from 'express';
import cors from 'cors';
import booksRouter from './routes/book.js';
import reviewsRouter from './routes/review.js';
import usersRouter from './routes/user.js';
import apiRoutes from './routes/api.js';

// This is the main entry point for the Book Review Platform API
// It sets up the Express application and routes
const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Book Review Platform API');
});

// Register API routes
app.use('/books', booksRouter);
app.use('/reviews', reviewsRouter);
app.use('/users', usersRouter);
app.use('/', apiRoutes);

// Only use one export style with ES modules
export default app;