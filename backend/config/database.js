// Improved: async connection function, better error handling, export for reuse

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('MONGODB_URI not set in environment variables');
    }
    // Always connect to the "bookreview" database, regardless of the URI's path
    const uriWithDb = uri.replace(/(mongodb(?:\+srv)?:\/\/[^/]+)(?:\/[^?]*)?/, '$1/bookreview');
    await mongoose.connect(uriWithDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
