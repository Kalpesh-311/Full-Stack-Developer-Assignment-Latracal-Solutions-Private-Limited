import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { api } from '../services/api';
import { Book } from '../contexts/AppContext';
import StarRating from '../components/UI/StarRating';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { ArrowLeft, Save, AlertCircle } from 'lucide-react';

export default function ReviewForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state, dispatch } = useAppContext();
  const [book, setBook] = useState<Book | null>(null);
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState('');
  const [userName, setUserName] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      loadBookDetail(id);
    }
  }, [id]);

  const loadBookDetail = async (bookId: string) => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const bookData = await api.getBook(bookId);
      setBook(bookData);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load book details' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!userName.trim()) {
      newErrors.userName = 'Name is required';
    }

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!content.trim()) {
      newErrors.content = 'Review content is required';
    } else if (content.trim().length < 10) {
      newErrors.content = 'Review must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !book) return;

    setIsSubmitting(true);

    try {
      const review = {
        book_id: book.id,
        user_id: '1', // Mock user ID
        rating,
        content: content.trim(),
        user_name: userName.trim()
      };

      const newReview = await api.createReview(review);
      dispatch({ type: 'ADD_REVIEW', payload: newReview });

      // Navigate back to book detail page
      navigate(`/books/${book.id}`);
    } catch (error) {
      setErrors({ submit: 'Failed to submit review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Book not found</h2>
          <p className="text-gray-600 mb-4">The book you're trying to review doesn't exist.</p>
          <Link
            to="/books"
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to={`/books/${book.id}`}
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Book
        </Link>

        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <img
                src={book.cover_image_url}
                alt={book.title}
                className="w-20 h-28 object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center`;
                }}
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Write a Review</h1>
              <h2 className="text-lg text-gray-700 mb-1">{book.title}</h2>
              <p className="text-gray-600">by {book.author}</p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.userName ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.userName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.userName}
                </p>
              )}
            </div>

            {/* Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex items-center space-x-4">
                <StarRating
                  rating={rating}
                  onRatingChange={setRating}
                  size="lg"
                />
                <span className="text-sm text-gray-600">
                  {rating > 0 ? `${rating} star${rating > 1 ? 's' : ''}` : 'Select a rating'}
                </span>
              </div>
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" />
                  {errors.rating}
                </p>
              )}
            </div>

            {/* Review Content */}
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                Review
              </label>
              <textarea
                id="content"
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.content ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Share your thoughts about this book... What did you like or dislike? Would you recommend it to others?"
              />
              <div className="mt-1 flex justify-between">
                {errors.content ? (
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.content}
                  </p>
                ) : (
                  <p className="text-sm text-gray-500">Minimum 10 characters</p>
                )}
                <p className="text-sm text-gray-500">
                  {content.length} characters
                </p>
              </div>
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <p className="text-sm text-red-600 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end space-x-4">
              <Link
                to={`/books/${book.id}`}
                className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <LoadingSpinner size="sm" className="mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {isSubmitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}