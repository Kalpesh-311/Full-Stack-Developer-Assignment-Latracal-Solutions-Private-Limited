import React from 'react';
import { BookOpen, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="p-2 bg-blue-600 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">BookReview</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover your next favorite book and share your reading journey with fellow book lovers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="/books" className="text-gray-400 hover:text-white transition-colors">Browse Books</a></li>
              <li><a href="/profile" className="text-gray-400 hover:text-white transition-colors">My Profile</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Genres</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Fiction</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Non-Fiction</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mystery</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Romance</a></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About</h3>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              A platform where readers come together to discover, review, and discuss books.
            </p>
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>for book lovers</span>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 BookReview Platform. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}