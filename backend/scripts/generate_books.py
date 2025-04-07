import sqlite3
from faker import Faker
import random
from datetime import datetime

# Config
DB_PATH = "../BitsAndBooks.sqlite"
NUM_BOOKS = 15_000_000           # Total number of books to insert.
BATCH_SIZE = 1_000_000              # Number of books to insert per transaction

# Faker setup
faker = Faker()

def generate_book(publisher_ids, index):
    title = faker.sentence(nb_words=random.randint(2, 6)).replace("'", "")
    # Index-based 13-digit fake ISBN to ensure uniqueness
    isbn = f"9780000{index:07d}"
    publisher_id = random.choice(publisher_ids)
    publication_date = faker.date_between(start_date="-10y", end_date="today").isoformat()
    price = round(random.uniform(5.0, 100.0), 2)
    stock = random.randint(0, 500)
    return (title, isbn, publisher_id, publication_date, price, stock)

def insert_books():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get all existing publisher IDs
    cursor.execute("SELECT publisher_id FROM publishers;")
    publisher_ids = [row[0] for row in cursor.fetchall()]
    if not publisher_ids:
        raise Exception("No publishers found. Insert publishers first.")

    print(f"📚 Inserting {NUM_BOOKS:,} books in batches of {BATCH_SIZE:,}...")

    for i in range(0, NUM_BOOKS, BATCH_SIZE):
        batch = [generate_book(publisher_ids, index) for index in range(i, i + BATCH_SIZE)]
        cursor.execute("BEGIN TRANSACTION;")
        cursor.executemany("""
            INSERT INTO books (title, isbn, publisher_id, publication_date, price, stock)
            VALUES (?, ?, ?, ?, ?, ?);
        """, batch)
        conn.commit()
        print(f"✅ Inserted {min(i + BATCH_SIZE, NUM_BOOKS):,} / {NUM_BOOKS:,} books")

    conn.close()
    print("🎉 Done inserting all books.")

if __name__ == "__main__":
    insert_books()
