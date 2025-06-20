import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../contexts/AppContext';
import { api } from '../services/api';
import BookCard from '../components/UI/BookCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { 
  BookOpen, 
  Star, 
  Users, 
  TrendingUp, 
  ChevronRight, 
  Quote,
  Award,
  Clock,
  Heart,
  MessageCircle,
  ArrowRight,
  Sparkles,
  BookmarkPlus,
  Coffee
} from 'lucide-react';

export default function Home() {
  const { state, dispatch } = useAppContext();
  const [featuredBooks, setFeaturedBooks] = useState(state.books.slice(0, 6));
  const [recentBooks, setRecentBooks] = useState(state.books.slice(6, 10));
  const [topRatedBooks, setTopRatedBooks] = useState(state.books.slice(10, 14));
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    loadFeaturedBooks();
    setIsVisible(true);
  }, []);

  const loadFeaturedBooks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const books = await api.getBooks();
      
      // Sort by rating and reviews to get featured books
      const featured = books
        .sort((a, b) => (b.average_rating * b.total_reviews) - (a.average_rating * a.total_reviews))
        .slice(0, 6);
      
      // Get recent books (newest first)
      const recent = books
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        .slice(0, 4);

      // Get top rated books
      const topRated = books
        .sort((a, b) => b.average_rating - a.average_rating)
        .slice(0, 4);
      
      setFeaturedBooks(featured);
      setRecentBooks(recent);
      setTopRatedBooks(topRated);
      dispatch({ type: 'SET_BOOKS', payload: books });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load books' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Book Enthusiast",
      content: "This platform has completely transformed how I discover new books. The community reviews are incredibly helpful!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Literature Professor",
      content: "As an educator, I love how this platform brings together readers of all backgrounds. The discussions are thoughtful and engaging.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face"
    },
    {
      name: "Emma Davis",
      role: "Avid Reader",
      content: "I've discovered so many hidden gems through this community. The recommendation system is spot-on!",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face"
    }
  ];

  const genres = [
    { name: "Fiction", count: 245, icon: "📚", color: "bg-blue-500" },
    { name: "Mystery", count: 189, icon: "🔍", color: "bg-purple-500" },
    { name: "Romance", count: 156, icon: "💕", color: "bg-pink-500" },
    { name: "Sci-Fi", count: 134, icon: "🚀", color: "bg-indigo-500" },
    { name: "Fantasy", count: 198, icon: "🧙‍♂️", color: "bg-emerald-500" },
    { name: "Non-Fiction", count: 167, icon: "📖", color: "bg-orange-500" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-emerald-600 text-white overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-yellow-300 rounded-full animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-pink-300 rounded-full animate-ping"></div>
          <div className="absolute bottom-32 right-1/3 w-8 h-8 bg-green-300 rounded-full animate-pulse"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 animate-fade-in">
              <Sparkles className="h-5 w-5 text-yellow-300" />
              <span className="text-sm font-medium">Welcome to BookReview</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Your Next
              <span className="block text-yellow-300 animate-pulse">Great Read</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join thousands of readers sharing their favorite books and discovering new stories that inspire, educate, and entertain.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                to="/books"
                className="group inline-flex items-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
              >
                <BookOpen className="h-5 w-5 mr-2 group-hover:animate-bounce" />
                Browse Books
                <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/profile"
                className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition-all duration-300"
              >
                <Users className="h-5 w-5 mr-2" />
                Join Community
              </Link>
            </div>

            {/* Floating book icons */}
            <div className="relative">
              <div className="absolute -top-4 left-1/4 animate-bounce delay-100">
                <BookOpen className="h-8 w-8 text-yellow-300 opacity-60" />
              </div>
              <div className="absolute -top-2 right-1/4 animate-bounce delay-300">
                <Star className="h-6 w-6 text-pink-300 opacity-60" />
              </div>
              <div className="absolute top-2 left-1/3 animate-bounce delay-500">
                <Heart className="h-7 w-7 text-red-300 opacity-60" />
              </div>
            </div>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#f8fafc" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, count: "1,000+", label: "Books in our collection", color: "text-blue-600", bg: "bg-blue-100" },
              { icon: Star, count: "5,000+", label: "Reviews written", color: "text-purple-600", bg: "bg-purple-100" },
              { icon: Users, count: "2,500+", label: "Active readers", color: "text-emerald-600", bg: "bg-emerald-100" }
            ].map((stat, index) => (
              <div 
                key={index}
                className={`text-center group hover:scale-105 transition-all duration-300 p-6 rounded-xl hover:shadow-lg ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 ${stat.bg} rounded-full mb-4 group-hover:animate-pulse`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {stat.count}
                </h3>
                <p className="text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 text-blue-600 mb-4">
              <TrendingUp className="h-6 w-6 animate-bounce" />
              <span className="text-sm font-semibold uppercase tracking-wide">Featured</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trending Books
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most popular and highly-rated books that readers are talking about
            </p>
          </div>

          {state.loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner size="lg" />
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
                {featuredBooks.map((book, index) => (
                  <div 
                    key={book.id}
                    className={`transform transition-all duration-500 hover:scale-105 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <BookCard book={book} />
                  </div>
                ))}
              </div>

              <div className="text-center">
                <Link
                  to="/books"
                  className="group inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  View All Books
                  <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Genre Explorer Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Explore by Genre
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find your perfect book in your favorite genre
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {genres.map((genre, index) => (
              <Link
                key={genre.name}
                to={`/books?genre=${genre.name}`}
                className={`group p-6 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-lg text-center ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-12 h-12 ${genre.color} rounded-full flex items-center justify-center mx-auto mb-3 group-hover:animate-bounce`}>
                  <span className="text-2xl">{genre.icon}</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                  {genre.name}
                </h3>
                <p className="text-sm text-gray-500">{genre.count} books</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent & Top Rated Books */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Recent Books */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Clock className="h-6 w-6 text-blue-600" />
                <h3 className="text-2xl font-bold text-gray-900">Recently Added</h3>
              </div>
              <div className="space-y-4">
                {recentBooks.map((book, index) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    className={`group flex items-center space-x-4 p-4 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-102 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center`;
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{book.author}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{book.average_rating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{book.total_reviews} reviews</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Top Rated Books */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Award className="h-6 w-6 text-yellow-600" />
                <h3 className="text-2xl font-bold text-gray-900">Top Rated</h3>
              </div>
              <div className="space-y-4">
                {topRatedBooks.map((book, index) => (
                  <Link
                    key={book.id}
                    to={`/books/${book.id}`}
                    className={`group flex items-center space-x-4 p-4 bg-white rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-102 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={book.cover_image_url}
                      alt={book.title}
                      className="w-16 h-20 object-cover rounded-lg group-hover:scale-105 transition-transform"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop&crop=center`;
                      }}
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                        {book.title}
                      </h4>
                      <p className="text-gray-600 text-sm">{book.author}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm text-gray-600 ml-1">{book.average_rating.toFixed(1)}</span>
                        </div>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm text-gray-600">{book.total_reviews} reviews</span>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Readers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of book lovers who have found their next favorite read
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`group p-6 bg-gray-50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 ${isVisible ? 'animate-fade-in' : 'opacity-0'}`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <Quote className="h-8 w-8 text-blue-600 mb-4 group-hover:animate-pulse" />
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover group-hover:scale-110 transition-transform"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <Coffee className="h-5 w-5" />
            <span className="text-sm font-medium">Stay Updated</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Never Miss a Great Book
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Get weekly recommendations, new releases, and exclusive content delivered to your inbox.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
            />
            <button className="group px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition-all duration-300 hover:scale-105">
              <span className="flex items-center">
                Subscribe
                <BookmarkPlus className="h-4 w-4 ml-2 group-hover:animate-bounce" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Start Your Reading Journey Today
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Join our community of passionate readers and share your thoughts on the books you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/books"
              className="group inline-flex items-center px-8 py-4 bg-white text-purple-600 font-semibold rounded-lg shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 hover:shadow-xl"
            >
              <BookOpen className="h-5 w-5 mr-2 group-hover:animate-bounce" />
              Explore Books Now
            </Link>
            <Link
              to="/profile"
              className="group inline-flex items-center px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300"
            >
              <MessageCircle className="h-5 w-5 mr-2" />
              Join Discussions
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}