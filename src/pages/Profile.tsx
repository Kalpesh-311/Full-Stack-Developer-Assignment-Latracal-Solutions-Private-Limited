import React, { useState, useEffect } from 'react';
import { useAppContext, User } from '../contexts/AppContext';
import { api } from '../services/api';
import ReviewCard from '../components/UI/ReviewCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { User as UserIcon, Edit, Save, X, Calendar, MessageCircle } from 'lucide-react';

export default function Profile() {
  const { state, dispatch } = useAppContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    bio: ''
  });
  const [userReviews, setUserReviews] = useState(state.reviews);
  const [mockUser] = useState<User>({
    id: '1',
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    bio: 'Passionate reader and book enthusiast. I love discovering new authors and sharing my thoughts on great literature.',
    avatar_url: '',
    created_at: '2024-01-15T00:00:00Z'
  });

  useEffect(() => {
    loadUserReviews();
  }, []);

  const loadUserReviews = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      // Mock user reviews - in a real app, this would use the current user's ID
      const reviews = await api.getUserReviews('1');
      setUserReviews(reviews);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load reviews' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const handleEditStart = () => {
    setEditForm({
      name: mockUser.name,
      email: mockUser.email,
      bio: mockUser.bio
    });
    setIsEditing(true);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditForm({ name: '', email: '', bio: '' });
  };

  const handleEditSave = async () => {
    try {
      // In a real app, this would update the user profile
      console.log('Saving user profile:', editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const averageRating = userReviews.length > 0
    ? userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-32"></div>
          <div className="relative px-6 pb-6">
            {/* Avatar */}
            <div className="flex justify-center -mt-16 mb-4">
              <div className="w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                <UserIcon className="h-16 w-16 text-gray-400" />
              </div>
            </div>

            {/* Profile Info */}
            <div className="text-center mb-6">
              {isEditing ? (
                <div className="space-y-4 max-w-md mx-auto">
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-center font-bold text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your name"
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Your email"
                  />
                  <textarea
                    value={editForm.bio}
                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-center text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Tell us about yourself..."
                  />
                  <div className="flex justify-center space-x-3">
                    <button
                      onClick={handleEditSave}
                      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save
                    </button>
                    <button
                      onClick={handleEditCancel}
                      className="inline-flex items-center px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition-colors"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{mockUser.name}</h1>
                  <p className="text-gray-600 mb-2">{mockUser.email}</p>
                  <p className="text-gray-700 max-w-md mx-auto mb-4">{mockUser.bio}</p>
                  <button
                    onClick={handleEditStart}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </button>
                </>
              )}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{userReviews.length}</div>
                <div className="text-sm text-blue-800">Reviews</div>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">
                  {averageRating > 0 ? averageRating.toFixed(1) : '0.0'}
                </div>
                <div className="text-sm text-purple-800">Avg Rating</div>
              </div>
              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="text-2xl font-bold text-emerald-600">
                  {new Date().getFullYear() - new Date(mockUser.created_at).getFullYear() + 1}
                </div>
                <div className="text-sm text-emerald-800">Years Active</div>
              </div>
            </div>

            {/* Member Since */}
            <div className="text-center mt-4">
              <p className="text-sm text-gray-500 flex items-center justify-center">
                <Calendar className="h-4 w-4 mr-1" />
                Member since {formatDate(mockUser.created_at)}
              </p>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <MessageCircle className="h-6 w-6 mr-2" />
            My Reviews ({userReviews.length})
          </h2>

          {state.loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : userReviews.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <MessageCircle className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews yet</h3>
              <p className="text-gray-600 mb-4">Start sharing your thoughts about the books you've read!</p>
              <a
                href="/books"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Browse books to review
              </a>
            </div>
          ) : (
            <div className="space-y-6">
              {userReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}