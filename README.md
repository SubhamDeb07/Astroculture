# Astroculture - Personalized Horoscope API

A Node.js backend service that generates and serves personalized daily horoscopes based on user's zodiac signs.

## Features

- User authentication (Signup/Login)
- Automatic zodiac sign detection based on birthdate
- Daily horoscope generation
- Horoscope history tracking
- Rate limiting

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Setup Instructions

1. Clone the repository:

```bash
git clone <repository-url>
cd astroculture
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/astroculture
JWT_SECRET=your_jwt_secret_key
```

4. Start the development server:

```bash
npm run dev
```

## API Documentation

Once the server is running, you can access the Swagger documentation at:

```
http://localhost:3000/api-docs
```

## API Endpoints

### Authentication

- POST /api/auth/signup - Register a new user
- POST /api/auth/login - Login user

### Horoscope

- GET /api/horoscope/today - Get today's horoscope
- GET /api/horoscope/history - Get horoscope history

## Design Decisions

1. **MongoDB with Mongoose**: Chosen for its flexibility with schema design and ease of use with Node.js
2. **JWT Authentication**: Provides stateless authentication and better scalability
3. **Rate Limiting**: Implemented to prevent API abuse
4. **Swagger Documentation**: Added for better API documentation and testing

## Future Improvements

1. Add email verification
2. Implement password reset functionality
3. Add more detailed horoscope content
4. Implement caching for better performance
5. Add unit and integration tests
6. Add user profile management
7. Implement real-time horoscope updates
