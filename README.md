# Book Review Platform

A comprehensive book review platform built with React, TypeScript, Node.js, Express, and MongoDB. Users can browse books, write reviews, and manage their reading profiles.

---

## Features

- Browse a large collection of books with advanced search and filtering
- View detailed information and reviews for each book
- Submit your own reviews and ratings
- Manage your user profile and review history
- Responsive and user-friendly interface
- Secure RESTful API with authentication and data validation
- Built with a modular, scalable backend using Node.js, Express, and MongoDB

---

## Frontend (React + TypeScript)

- Home Page: Featured books and platform statistics  
  ![Home Page Screenshot](https://github.com/user-attachments/assets/d8aec354-5d78-4f59-b3a7-0e46ed5ecf05)
- Book Listing: Search, filter by genre, and sort with pagination  
  ![genre](https://github.com/user-attachments/assets/d0ec4453-cae6-41e3-b30a-e9fa127522de)

- Book Details: Detailed book info with reviews and ratings  
  ![browse](https://github.com/user-attachments/assets/a76ee8e9-cc80-4d20-9c8f-a5dcea1a5827)

- Review System: Submit and read book reviews with star ratings  
  ![reviews](https://github.com/user-attachments/assets/be21690b-d751-468b-80e7-1242f253f4b6)
 
- User Profiles: Manage profile and review history  
  ![Profile](https://github.com/user-attachments/assets/b6d4d485-2d95-4587-ac20-71a133428894)

- Responsive Design: Works on mobile, tablet, desktop  
  ![phone](https://github.com/user-attachments/assets/167a9921-4d9a-4eba-b11c-695bb0ba7a3d)

---

### Backend (Node.js/Express/MongoDB)
- **Database**: MongoDB (Mongoose)
- **APIs**: RESTful endpoints for books, reviews, and users
- **Security**: JWT/Auth middleware
- **Data Validation**: Express-validator and Mongoose schemas

## Technology Stack

- **Frontend**: React , TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB, Mongoose
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Build Tool**: Vite

## Getting Started

### Prerequisites
- Node.js and npm
- MongoDB instance (local or Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Kalpesh-311/Full-Stack-Developer-Assignment-Latracal-Solutions-Private-Limited
   ```

2. **Install dependencies**
   ```bash
   npm install
   npm run dev
   ```

3. **Set up MongoDB**
   - Make sure MongoDB is running locally or provided a MongoDB Atlas URI
   ```bash
   MONGODB_URI=mongodb+srv://kalpeshspatil311:Newton%40311@cluster1.y55hvgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1
   ```

4. **Configure environment variables**
   - Create a `.env` file and add your MongoDB URI:
     ```
     MONGODB_URI=mongodb://localhost:27017/bookapi
     PORT=3000
     ```

5. **Start the backend server**
   ```bash
   cd backend
   node server.js
   ```
   The server will connect to MongoDB and start on the specified port.

## Database Schema

### Collections

- **books**: Store book information (title, author, genre, description, etc.)
- **reviews**: Store user reviews with ratings and content
- **users**: Store user profiles and information

### Key Features
- Relationships between collections
- Data validation with Mongoose schemas
- Middleware for authentication and authorization
- Automatic rating calculations
- Sample data for demonstration

## API Endpoints

### Books
- `GET /books` - Get all books with optional filtering and pagination
- `GET /books/:id` - Get specific book details
- `POST /books` - Add new book (admin functionality)

### Reviews
- `GET /reviews?book_id=:id` - Get reviews for a specific book
- `POST /reviews` - Create new review

### Users
- `GET /users/:id` - Get user profile
- `PUT /users/:id` - Update user profile

## Project Structure

```
src/
├── components/
│   ├── Layout/          # Header, Footer components
│   └── UI/              # Reusable UI components
├── contexts/            # React Context for state management
├── lib/                 # API client configuration
├── pages/               # Main page components
├── services/            # API service functions
└── App.tsx              # Main application component

backend/
├── config/              # Database connection config
├── controllers/         # Express controllers
│   ├── bookController.js
│   ├── reviewController.js
│   └── userController.js
├── models/              # Mongoose models
│   ├── Book.js
│   ├── Review.js
│   └── User.js
├── routes/              # API routes
│   ├── books.js
│   ├── reviews.js
│   └── users.js
├── .env                 # Environment variables
├── app.js               # Express app setup
└── server.js            # Server entry point
```

## Key Features Implemented

### Code Quality
- Modular component architecture
- TypeScript for type safety
- Proper error handling and loading states
- Responsive design with Tailwind CSS

### User Experience
- Intuitive navigation with React Router
- Search and filtering functionality
- Star rating system
- Loading spinners and error messages
- Mobile-first responsive design

### Database Design
- Normalized schema with proper relationships
- Data validation and constraints
- Middleware for authentication and authorization
- Efficient queries with proper indexing

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
