// server/routes/books.js
const express = require("express");
const router = express.Router();

// Sample book data (replace with DB logic if needed)
const books = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    image: "https://covers.openlibrary.org/b/id/8228691-L.jpg",
  },
  {
    title: "1984",
    author: "George Orwell",
    image: "https://covers.openlibrary.org/b/id/7222241-L.jpg",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    image: "https://covers.openlibrary.org/b/id/8081536-L.jpg",
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    image: "https://covers.openlibrary.org/b/id/8101352-L.jpg",
  },
  {
    title: "Harry Potter",
    author: "J.K. Rowling",
    image: "https://covers.openlibrary.org/b/id/7984916-L.jpg",
  },
];

// GET /api/books/search?q=keyword
router.get("/search", (req, res) => {
  const q = req.query.q?.toLowerCase() || "";
  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
  );
  res.json(filtered);
});

module.exports = router;
