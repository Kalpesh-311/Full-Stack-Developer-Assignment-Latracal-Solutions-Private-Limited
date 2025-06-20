import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function StarRating({ rating, onRatingChange, readonly = false, size = 'md' }: StarRatingProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onRatingChange?.(star)}
          className={`${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110 active:scale-95'} transition-all duration-200 ${
            readonly ? '' : 'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 rounded'
          }`}
        >
          <Star
            className={`${sizeClasses[size]} ${
              star <= rating 
                ? 'text-yellow-400 fill-current animate-pulse' 
                : 'text-gray-300 hover:text-yellow-200'
            } transition-all duration-200`}
          />
        </button>
      ))}
    </div>
  );
}