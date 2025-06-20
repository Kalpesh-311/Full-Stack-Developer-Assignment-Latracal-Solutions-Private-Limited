const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

export const api = {
  async getBooks() {
    const res = await fetch(`${API_BASE}/books`);
    if (!res.ok) throw new Error('Failed to fetch books');
    return res.json();
  },

  async getBook(id: string) {
    const res = await fetch(`${API_BASE}/books/${id}`);
    if (!res.ok) throw new Error('Failed to fetch book');
    return res.json();
  },

  async submitReview(reviewData: any) {
    const res = await fetch(`${API_BASE}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) throw new Error('Failed to submit review');
    return res.json();
  },

  async getReviews(bookId: string) {
    const res = await fetch(`${API_BASE}/reviews?bookId=${bookId}`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
  },

  async getUser(userId: string) {
    const res = await fetch(`${API_BASE}/users/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch user');
    return res.json();
  },

  async updateUser(userId: string, data: any) {
    const res = await fetch(`${API_BASE}/users/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },


  async getGenres() {
   const res = await fetch(`${API_BASE}/books/genres`);
   if (!res.ok) throw new Error('Failed to fetch genres');
  return res.json();
}
}

// This file defines the API client for the Book Review Platform
// It provides functions to interact with the backend API endpoints
// The API_BASE is set to the environment variable or defaults to localhost
// Each function handles fetching data from the API and returns the parsed JSON response
// Error handling is included to throw an error if the fetch fails
// This allows the frontend to easily call these functions and handle the responses