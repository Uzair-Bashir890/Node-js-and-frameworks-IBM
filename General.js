// router/general.js
const express = require('express');
const axios = require('axios'); // included for demonstration if you want to call endpoints externally
const books = require("./booksdb.js").books; // books is an object keyed by ISBN
const general = express.Router();

/**
 * Task 1:
 * GET '/' - list all books (synchronous)
 */
general.get('/', function (req, res) {
  try {
    // books is an object keyed by ISBN. Return as JSON stringified for neat output.
    return res.status(200).json(JSON.stringify(books, null, 2));
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.toString() });
  }
});

/**
 * Task 2:
 * GET '/isbn/:isbn' - get book by ISBN (synchronous)
 */
general.get('/isbn/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  if (!isbn) return res.status(400).json({ message: "ISBN required" });

  const book = books[isbn];
  if (book) return res.status(200).json(JSON.stringify(book, null, 2));
  return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
});

/**
 * Task 3:
 * GET '/author/:author' - get books by author (synchronous)
 */
general.get('/author/:author', function (req, res) {
  const author = req.params.author;
  if (!author) return res.status(400).json({ message: "Author required" });

  const keys = Object.keys(books);
  const matched = [];

  for (let i = 0; i < keys.length; i++) {
    const b = books[keys[i]];
    if (b.author && b.author.toLowerCase() === author.toLowerCase()) {
      matched.push(b);
    }
  }

  if (matched.length === 0) return res.status(404).json({ message: "No books found for author: " + author });
  return res.status(200).json(JSON.stringify(matched, null, 2));
});

/**
 * Task 4:
 * GET '/title/:title' - get books by title (synchronous)
 */
general.get('/title/:title', function (req, res) {
  const title = req.params.title;
  if (!title) return res.status(400).json({ message: "Title required" });

  const keys = Object.keys(books);
  const matched = [];

  for (let i = 0; i < keys.length; i++) {
    const b = books[keys[i]];
    if (b.title && b.title.toLowerCase() === title.toLowerCase()) {
      matched.push(b);
    }
  }

  if (matched.length === 0) return res.status(404).json({ message: "No books found for title: " + title });
  return res.status(200).json(JSON.stringify(matched, null, 2));
});

/**
 * Task 5:
 * GET '/review/:isbn' - get reviews for a book (synchronous)
 */
general.get('/review/:isbn', function (req, res) {
  const isbn = req.params.isbn;
  const book = books[isbn];
  if (!book) return res.status(404).json({ message: "Book not found for ISBN: " + isbn });
  // reviews are stored under book.reviews in starter data
  return res.status(200).json(JSON.stringify(book.reviews || {}, null, 2));
});

/* --------------------
   Promise / Async examples
   Tasks 10-13: demonstrate the same four queries using Promises/async-await.
   These endpoints return the same results but implemented with Promises/async-await.
   Use the exact screenshot filenames the lab requests when submitting.
   -------------------- */

/**
 * Task 10:
 * GET '/async/books' - get all books using a Promise
 */
general.get('/async/books', function (req, res) {
  // Demonstration using a Promise
  const p = new Promise((resolve, reject) => {
    try {
      resolve(JSON.stringify(books, null, 2));
    } catch (err) {
      reject(err);
    }
  });

  p.then((payload) => res.status(200).send(payload))
   .catch((err) => res.status(500).json({ message: "Server error", error: err.toString() }));
});

/**
 * Task 11:
 * GET '/async/isbn/:isbn' - get by ISBN using async/await
 */
general.get('/async/isbn/:isbn', async function (req, res) {
  try {
    const isbn = req.params.isbn;
    const result = await (async () => {
      const b = books[isbn];
      if (!b) throw new Error("Book not found");
      return JSON.stringify(b, null, 2);
    })();
    return res.status(200).send(result);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

/**
 * Task 12:
 * GET '/async/author/:author' - get by author using Promise + filter
 */
general.get('/async/author/:author', function (req, res) {
  const author = req.params.author;
  const p = new Promise((resolve, reject) => {
    try {
      const keys = Object.keys(books);
      const matched = [];
      keys.forEach(k => {
        const b = books[k];
        if (b.author && b.author.toLowerCase() === author.toLowerCase()) matched.push(b);
      });
      if (matched.length === 0) return reject(new Error("No books found for author"));
      resolve(JSON.stringify(matched, null, 2));
    } catch (err) {
      reject(err);
    }
  });

  p.then(payload => res.status(200).send(payload))
   .catch(err => res.status(404).json({ message: err.message }));
});

/**
 * Task 13:
 * GET '/async/title/:title' - get by title using async/await
 */
general.get('/async/title/:title', async function (req, res) {
  try {
    const title = req.params.title;
    const keys = Object.keys(books);
    const matched = [];
    for (let i = 0; i < keys.length; i++) {
      const b = books[keys[i]];
      if (b.title && b.title.toLowerCase() === title.toLowerCase()) matched.push(b);
    }
    if (matched.length === 0) return res.status(404).json({ message: "No books found for title: " + title });
    return res.status(200).send(JSON.stringify(matched, null, 2));
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports.general = general;
