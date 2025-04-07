import sqlite3
import random

# Config
DB_PATH = "../BitsAndBooks.sqlite"
MAX_AUTHORS_PER_BOOK = 3

def insert_book_authors():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get existing book and author IDs
    cursor.execute("SELECT book_id FROM books;")
    book_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT author_id FROM authors;")
    author_ids = [row[0] for row in cursor.fetchall()]

    if not book_ids or not author_ids:
        raise Exception("Books or authors not found. Insert both first.")

    print(f"Assigning 1–{MAX_AUTHORS_PER_BOOK} authors to each of {len(book_ids)} books...")

    cursor.execute("BEGIN TRANSACTION;")
    for book_id in book_ids:
        num_authors = random.randint(1, MAX_AUTHORS_PER_BOOK)
        selected_authors = random.sample(author_ids, num_authors)

        for author_id in selected_authors:
            cursor.execute("""
                INSERT OR IGNORE INTO book_authors (book_id, author_id)
                VALUES (?, ?);
            """, (book_id, author_id))

    conn.commit()
    conn.close()
    print("✅ Done inserting book-author links.")

if __name__ == "__main__":
    insert_book_authors()
