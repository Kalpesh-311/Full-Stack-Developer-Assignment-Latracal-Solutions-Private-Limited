import React from 'react';
import { Review } from '../../contexts/AppContext';
import StarRating from './StarRating';
import { Calendar, User } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-100 rounded-full">
            <User className="h-5 w-5 text-gray-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{review.user_name}</h4>
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(review.created_at)}</span>
            </div>
          </div>
        </div>
        <StarRating rating={review.rating} readonly size="sm" />
      </div>

      {/* Review Content */}
      <p className="text-gray-700 leading-relaxed">{review.content}</p>
    </div>
  );
}