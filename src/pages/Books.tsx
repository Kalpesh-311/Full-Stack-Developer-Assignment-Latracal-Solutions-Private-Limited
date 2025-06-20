import React, { useEffect, useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import { api } from '../services/api';
import BookCard from '../components/UI/BookCard';
import LoadingSpinner from '../components/UI/LoadingSpinner';
import { Search, Filter, SortAsc } from 'lucide-react';

export default function Books() {
  const { state, dispatch } = useAppContext();
  const [filteredBooks, setFilteredBooks] = useState(state.books);
  const [genres, setGenres] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  useEffect(() => {
    loadBooks();
    loadGenres();
  }, []);

  useEffect(() => {
    filterBooks();
  }, [state.books, state.searchQuery, state.selectedGenre, state.sortBy]);

  const loadBooks = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const books = await api.getBooks();
          console.log("📚 Loaded books:", books);

      dispatch({ type: 'SET_BOOKS', payload: books });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to load books' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const loadGenres = async () => {
    try {
      const genreList = await api.getGenres();
      setGenres(genreList);
    } catch (error) {
      console.error('Failed to load genres:', error);
    }
  };

  const filterBooks = () => {
    let filtered = [...state.books];

    // Apply search filter
    if (state.searchQuery) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    }

    // Apply genre filter
    if (state.selectedGenre) {
      filtered = filtered.filter(book => book.genre === state.selectedGenre);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (state.sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'author':
          return a.author.localeCompare(b.author);
        case 'rating':
          return b.average_rating - a.average_rating;
        case 'reviews':
          return b.total_reviews - a.total_reviews;
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: query });
  };

  const handleGenreChange = (genre: string) => {
    dispatch({ type: 'SET_SELECTED_GENRE', payload: genre });
  };

  const handleSortChange = (sortBy: string) => {
    dispatch({ type: 'SET_SORT_BY', payload: sortBy });
  };

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + booksPerPage);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Books</h1>
          <p className="text-gray-600">Discover your next favorite book from our collection</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Search className="h-4 w-4 inline mr-1" />
                Search Books
              </label>
              <input
                type="text"
                placeholder="Search by title or author..."
                value={state.searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Genre Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Filter className="h-4 w-4 inline mr-1" />
                Genre
              </label>
              <select
                value={state.selectedGenre}
                onChange={(e) => handleGenreChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Genres</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <SortAsc className="h-4 w-4 inline mr-1" />
                Sort By
              </label>
              <select
                value={state.sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviewed</option>
                <option value="newest">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + booksPerPage, filteredBooks.length)} of {filteredBooks.length} books
          </p>
        </div>

        {/* Books Grid */}
        {state.loading ? (
          <div className="flex justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
            <button
              onClick={() => {
                dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
                dispatch({ type: 'SET_SELECTED_GENRE', payload: '' });
              }}
              className="text-blue-600 hover:text-blue-800"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
              {paginatedBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-2 rounded-md ${
                        page === currentPage
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  
                  <button
                    onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
