// Basic Express and MongoDB setup

const express = require('express');
const cors = require('cors');
const connectDB = require('./backend/config/database.js'); // Adjust the path as necessary
const mongoose = require('mongoose');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/bookapi';
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Example root route
app.get('/', (req, res) => {
  res.send('Book Review Platform API');
});

// Start server after DB connection
const PORT = process.env.PORT || 3000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
