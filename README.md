# MovieHub

[![CodeQL Advanced](https://github.com/gabriel-rodriguezcastellini/MovieHub/actions/workflows/codeql.yml/badge.svg)](https://github.com/gabriel-rodriguezcastellini/MovieHub/actions/workflows/codeql.yml)

MovieHub is a comprehensive web application designed to streamline the movie viewing experience. It provides features for managing movies, showtimes, theaters, tickets, and users.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization using Firebase.
- CRUD operations for movies, showtimes, theaters, tickets, and users.
- Input validation using Joi.
- MongoDB integration using Mongoose.

## Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/yourusername/moviehub.git
   cd moviehub
   ```

2. Install dependencies:

   ```sh
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```env
   PORT=3000
   FIREBASE_PRIVATE_KEY=your_firebase_private_key
   FIREBASE_PROJECT_ID=your_firebase_project_id
   FIREBASE_CLIENT_EMAIL=your_firebase_client_email
   MONGODB_URI=your_mongodb_uri
   ```

4. Start the application:
   ```sh
   npm start
   ```

## Usage

Once the application is running, you can access it at `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST /auth/login**: User login
- **POST /auth/register**: User registration

### Movies

- **GET /movies**: Get all movies
- **POST /movies**: Create a new movie
- **PUT /movies/:id**: Update a movie
- **DELETE /movies/:id**: Delete a movie

### Showtimes

- **GET /showtimes**: Get all showtimes
- **POST /showtimes**: Create a new showtime
- **PUT /showtimes/:id**: Update a showtime
- **DELETE /showtimes/:id**: Delete a showtime

### Theaters

- **GET /theaters**: Get all theaters
- **POST /theaters**: Create a new theater
- **PUT /theaters/:id**: Update a theater
- **DELETE /theaters/:id**: Delete a theater

### Tickets

- **GET /tickets**: Get all tickets
- **POST /tickets**: Create a new ticket
- **PUT /tickets/:id**: Update a ticket
- **DELETE /tickets/:id**: Delete a ticket

### Users

- **GET /users**: Get all users
- **POST /users**: Create a new user
- **PUT /users/:id**: Update a user
- **DELETE /users/:id**: Delete a user

## Environment Variables

The application requires the following environment variables to be set:

- `PORT`: The port on which the server will run.
- `FIREBASE_PRIVATE_KEY`: Firebase private key for authentication.
- `FIREBASE_PROJECT_ID`: Firebase project ID.
- `FIREBASE_CLIENT_EMAIL`: Firebase client email.
- `MONGODB_URI`: MongoDB connection URI.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the ISC License.
