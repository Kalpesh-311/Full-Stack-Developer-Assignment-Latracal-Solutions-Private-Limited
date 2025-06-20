import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  description: String,
  genre: String,
  publishedDate: Date,
  // ...add more fields as needed...
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
