const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./BitsAndBooks.sqlite");

// Search books by title and include author + publisher
app.get("/api/search", (req, res) => {
  const query = req.query.q;
  db.all(
    `
    SELECT 
      b.book_id,
      b.title,
      b.isbn,
      p.name AS publisher_name,
      a.first_name || ' ' || a.last_name AS author_name
    FROM books b
    LEFT JOIN publishers p ON b.publisher_id = p.publisher_id
    LEFT JOIN book_authors ba ON b.book_id = ba.book_id
    LEFT JOIN authors a ON ba.author_id = a.author_id
    WHERE b.title LIKE ?
    LIMIT 50;
    `,
    [`%${query}%`],
    (err, rows) => {
      if (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
