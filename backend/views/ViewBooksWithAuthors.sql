-- =======================================================
-- View: ViewBooksWithAuthors
-- Shows all books with their authors
-- =======================================================

CREATE VIEW view_books_with_authors AS
SELECT
    b.title AS book_title,
    b.isbn,
    a.first_name || ' ' || a.last_name AS author_name
FROM books b
         JOIN book_authors ba ON b.book_id = ba.book_id
         JOIN authors a ON ba.author_id = a.author_id;
