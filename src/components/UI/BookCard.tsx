import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../contexts/AppContext';
import StarRating from './StarRating';
import { User, Eye, Heart } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

export default function BookCard({ book }: BookCardProps) {
  return (
    <Link to={`/books/${book.id}`} className="group block">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 hover:-translate-y-1 card-hover">
        {/* Book Cover */}
        <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
          <img
            src={book.cover_image_url}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center`;
            }}
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-0 group-hover:scale-100 transition-transform duration-300">
              <Eye className="h-6 w-6 text-gray-700" />
            </div>
          </div>

          {/* Rating badge */}
          {book.average_rating > 4 && (
            <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 animate-pulse">
              <span>⭐</span>
              <span>{book.average_rating.toFixed(1)}</span>
            </div>
          )}
        </div>

        {/* Book Info */}
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
            {book.title}
          </h3>
          <p className="text-sm text-gray-600 mb-2">by {book.author}</p>
          
          {/* Rating */}
          <div className="flex items-center justify-between mb-2">
            <StarRating rating={book.average_rating} readonly size="sm" />
            <span className="text-xs text-gray-500 flex items-center space-x-1">
              <User className="h-3 w-3" />
              <span>{book.total_reviews}</span>
            </span>
          </div>

          {/* Genre */}
          <div className="flex items-center justify-between">
            <span className="inline-block px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full group-hover:bg-blue-100 transition-colors">
              {book.genre}
            </span>
            
            {/* Like button */}
            <button 
              className="p-1 rounded-full hover:bg-red-50 transition-colors group/like"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Add to favorites logic here
              }}
            >
              <Heart className="h-4 w-4 text-gray-400 group-hover/like:text-red-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}