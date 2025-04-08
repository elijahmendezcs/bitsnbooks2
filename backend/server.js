const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const cors = require("cors");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./BitsAndBooks.sqlite");

// Use view_books_with_authors instead of raw books table
app.get("/api/search", (req, res) => {
  const query = req.query.q;

  db.all(
    `
    SELECT *
    FROM view_books_with_authors
    WHERE book_title LIKE ?
    ORDER BY book_title ASC
    LIMIT 50;
    `,
    [`%${query}%`],
    (err, rows) => {
      if (err) {
        console.error("DB Error:", err.message);
        return res.status(500).json({ error: "Database error" });
      }
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
