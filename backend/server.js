import dotenv from 'dotenv';
import app from './app.js';
import connectDB from './config/database.js';
import cors from 'cors';
import booksRouter from './routes/book.js';
import reviewsRouter from './routes/review.js';
import usersRouter from './routes/user.js';
dotenv.config();

const PORT = process.env.PORT || 5000;  // Default 5000 to match frontend API_BASE

app.use(cors());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(error => {
  console.error('Failed to connect to DB:', error);
  process.exit(1);
});
