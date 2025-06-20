import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  description: string;
  cover_image_url: string;
  average_rating: number;
  total_reviews: number;
  created_at: string;
}

export interface Review {
  id: string;
  book_id: string;
  user_id: string;
  rating: number;
  content: string;
  created_at: string;
  user_name: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatar_url: string;
  created_at: string;
}

interface AppState {
  books: Book[];
  reviews: Review[];
  currentUser: User | null;
  loading: boolean;
  error: string | null;
  searchQuery: string;
  selectedGenre: string;
  sortBy: string;
}

type AppAction =
  | { type: 'SET_BOOKS'; payload: Book[] }
  | { type: 'SET_REVIEWS'; payload: Review[] }
  | { type: 'SET_CURRENT_USER'; payload: User | null }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_SEARCH_QUERY'; payload: string }
  | { type: 'SET_SELECTED_GENRE'; payload: string }
  | { type: 'SET_SORT_BY'; payload: string }
  | { type: 'ADD_REVIEW'; payload: Review }
  | { type: 'UPDATE_USER'; payload: User };

const initialState: AppState = {
  books: [],
  reviews: [],
  currentUser: null,
  loading: false,
  error: null,
  searchQuery: '',
  selectedGenre: '',
  sortBy: 'title',
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_BOOKS':
      return { ...state, books: action.payload };
    case 'SET_REVIEWS':
      return { ...state, reviews: action.payload };
    case 'SET_CURRENT_USER':
      return { ...state, currentUser: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SEARCH_QUERY':
      return { ...state, searchQuery: action.payload };
    case 'SET_SELECTED_GENRE':
      return { ...state, selectedGenre: action.payload };
    case 'SET_SORT_BY':
      return { ...state, sortBy: action.payload };
    case 'ADD_REVIEW':
      return { ...state, reviews: [...state.reviews, action.payload] };
    case 'UPDATE_USER':
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}