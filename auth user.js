 // router/auth_users.js
const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();
const books = require("./booksdb.js").books;

// Simple in-memory users array for the lab
let users = []; // each item: { username, password }

// Helper: isValid(username)
const isValid = (username) => {
  // returns true if username is not already taken (for registration)
  return !users.some(u => u.username === username);
};

// Helper: authenticatedUser(username, password)
const authenticatedUser = (username, password) => {
  return users.some(u => u.username === username && u.password === password);
};

/**
 * Task 6:
 * POST '/register' - register a new user
 * Body: { username, password }
 */
regd_users.post('/register', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Username and password are required" });

  if (!isValid(username)) return res.status(400).json({ message: "Username already exists" });

  // Add to users
  users.push({ username, password });
  return res.status(201).json({ message: "User registered successfully", username });
});

/**
 * Task 7:
 * POST '/login' - login a registered user (save JWT in session)
 * NOTE: This endpoint is mounted under /customer/login per index.js mounting
 * Body: { username, password }
 */
regd_users.post('/login', (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ message: "Username and password are required" });

  if (!authenticatedUser(username, password)) return res.status(401).json({ message: "Invalid credentials" });

  // create JWT and store in session.authorization
  const payload = { username };
  const JWT_SECRET = "access"; // must match index.js secret
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

  // Save token in session authorization so middleware can read it
  if (req.session) {
    req.session.authorization = { accessToken: token, username };
  }

  return res.status(200).json({ message: "User logged in successfully", token });
});

/**
 * Task 8:
 * PUT '/auth/review/:isbn' - add or modify a review for a book (protected)
 * Query param: review (string) OR body { review, rating }
 * The username is read from req.session.authorization.username (and req.user if middleware attached)
 */
regd_users.put('/auth/review/:isbn', (req, res) => {
  try {
    // ensure session username exists
    const username = (req.session && req.session.authorization && req.session.authorization.username) || (req.user && req.user.username);
    if (!username) return res.status(401).json({ message: "User not logged in" });

    const isbn = req.params.isbn;
    const book = books[isbn];
    if (!book) return res.status(404).json({ message: "Book not found" });

    // obtain review text from query or body
    const reviewText = (req.query.review) ? req.query.review : (req.body && req.body.review) ? req.body.review : null;
    const rating = (req.body && req.body.rating) ? req.body.rating : undefined;

    if (!reviewText && rating === undefined) return res.status(400).json({ message: "Provide review (query or body) or rating in body" });

    // If reviews object doesn't exist, create it
    book.reviews = book.reviews || {};

    // If the same user posts different review, it should update their existing review
    book.reviews[username] = {};
    if (reviewText !== null) book.reviews[username].review = reviewText;
    if (rating !== undefined) book.reviews[username].rating = rating;

    return res.status(200).json({ message: "Review added/updated", reviews: book.reviews });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.toString() });
  }
});

/**
 * Task 9:
 * DELETE '/auth/review/:isbn' - delete review by the logged-in user (protected)
 */
regd_users.delete('/auth/review/:isbn', (req, res) => {
  try {
    const username = (req.session && req.session.authorization && req.session.authorization.username) || (req.user && req.user.username);
    if (!username) return res.status(401).json({ message: "User not logged in" });

    const isbn = req.params.isbn;
    const book = books[isbn];
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (!book.reviews || !book.reviews[username]) {
      return res.status(404).json({ message: "Review by user not found" });
    }

    // delete the user's review
    delete book.reviews[username];
    return res.status(200).json({ message: "Review deleted", reviews: book.reviews });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error", error: err.toString() });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.authenticatedUser = authenticatedUser;
