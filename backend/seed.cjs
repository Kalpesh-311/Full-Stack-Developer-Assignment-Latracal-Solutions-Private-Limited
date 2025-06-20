// Use CommonJS require syntax

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

console.log('MONGODB_URI:', MONGODB_URI);


const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'bookreview',
    });
    console.log('✅ MongoDB connected for seeding');
  } catch (error) {
    console.error('❌ DB connection error:', error);
    process.exit(1);
  }
};

const bookSchema = new mongoose.Schema({
  title: String,
  author: String,
  genre: String,
  description: String,
  publishedYear: Number,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  joinedAt: Date,
});

const reviewSchema = new mongoose.Schema({
  bookId: mongoose.Schema.Types.ObjectId,
  userId: mongoose.Schema.Types.ObjectId,
  rating: Number,
  comment: String,
  createdAt: Date,
});

const Book = mongoose.model('Book', bookSchema);
const User = mongoose.model('User', userSchema);
const Review = mongoose.model('Review', reviewSchema);

const seedData = async () => {
  try {
    // Clear existing data
    await Book.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    // Insert sample books
    const books = await Book.insertMany([
      {
        title: 'Atomic Habits',
        author: 'James Clear',
        genre: 'Self-help',
        description: 'A book about building good habits and breaking bad ones.',
        publishedYear: 2018,
      },
      {
        title: 'Deep Work',
        author: 'Cal Newport',
        genre: 'Productivity',
        description: 'Rules for focused success in a distracted world.',
        publishedYear: 2016,
      },
      {
        title: 'The Lean Startup',
        author: 'Eric Ries',
        genre: 'Business',
        description: 'A guide to building startups efficiently.',
        publishedYear: 2011,
      },
    ]);

    // Insert sample users
    const users = await User.insertMany([
      {
        name: 'Kalpesh Patil',
        email: 'kalpesh@example.com',
        joinedAt: new Date(),
      },
      {
        name: 'Shruti Sharma',
        email: 'shruti@example.com',
        joinedAt: new Date(),
      },
    ]);

    // Insert sample reviews
    await Review.insertMany([
      {
        bookId: books[0]._id,
        userId: users[0]._id,
        rating: 5,
        comment: 'Amazing book, very helpful!',
        createdAt: new Date(),
      },
      {
        bookId: books[1]._id,
        userId: users[1]._id,
        rating: 4,
        comment: 'Great insights on focus and productivity.',
        createdAt: new Date(),
      },
    ]);

    console.log('✅ Sample data seeded successfully!');
    process.exit();
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

const runSeed = async () => {
  await connectDB();
  await seedData();
};

runSeed();
