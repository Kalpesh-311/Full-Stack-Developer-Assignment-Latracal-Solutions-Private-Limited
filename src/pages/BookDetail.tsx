import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { api } from '../services/api';
import { Book, Review } from '../contexts/AppContext';
import StarRating from '../components/UI/StarRating';
import ReviewCard from '../components/UI/ReviewCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { ArrowLeft, Calendar, User, MessageCircle, Star, Edit } from 'lucide-react';

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useAppContext();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'rating'>('newest');

  useEffect(() => {
    if (id) {
      loadBookDetail(id);
      loadReviews(id);
    }
  }, [id]);

  useEffect(() => {
    sortReviews();
  }, [reviews, sortBy]);

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

  const loadReviews = async (bookId: string) => {
    try {
      const reviewsData = await api.getReviews(bookId);
      setReviews(reviewsData);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    }
  };

  const sortReviews = () => {
    const sorted = [...reviews].sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });
    setReviews(sorted);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
          <p className="text-gray-600 mb-4">The book you're looking for doesn't exist.</p>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          to="/books"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Books
        </Link>

        {/* Book Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="md:flex">
            {/* Book Cover */}
            <div className="md:w-1/3 lg:w-1/4">
              <div className="aspect-[3/4] bg-gray-100">
                <img
                  src={book.cover_image_url}
                  alt={book.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center`;
                  }}
                />
              </div>
            </div>

            {/* Book Info */}
            <div className="md:w-2/3 lg:w-3/4 p-6 md:p-8">
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full mb-4">
                  {book.genre}
                </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h1>
                <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
              </div>

              {/* Rating and Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-6">
                <div className="flex items-center space-x-2">
                  <StarRating rating={book.average_rating} readonly />
                  <span className="text-lg font-semibold text-gray-900">
                    {book.average_rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <MessageCircle className="h-5 w-5" />
                  <span>{book.total_reviews} reviews</span>
                </div>
                <div className="flex items-center space-x-1 text-gray-600">
                  <Calendar className="h-5 w-5" />
                  <span>Added {formatDate(book.created_at)}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed">{book.description}</p>
              </div>

              {/* Action Button */}
              <Link
                to={`/books/${book.id}/review`}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Edit className="h-5 w-5 mr-2" />
                Write a Review
              </Link>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
              Reviews ({reviews.length})
            </h2>
            
            {reviews.length > 0 && (
              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-gray-700">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'rating')}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="rating">Highest Rating</option>
                </select>
              </div>
            )}
          </div>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MessageCircle className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">Be the first to share your thoughts about this book!</p>
              <Link
                to={`/books/${book.id}/review`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                <Edit className="h-4 w-4 mr-1" />
                Write the first review
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}