import sqlite3
from faker import Faker
import random
from datetime import datetime

# Config
DB_PATH = "BitsAndBooks.sqlite"  # Change if your DB file is in another location
NUM_BOOKS = 10000                # Change this to scale up (e.g. 1000000)
BATCH_SIZE = 1000

# Faker setup
faker = Faker()

def generate_book(publisher_ids):
    title = faker.sentence(nb_words=random.randint(2, 6)).replace("'", "")
    isbn = faker.unique.isbn13()
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

    print(f"Inserting {NUM_BOOKS} books in batches of {BATCH_SIZE}...")

    for i in range(0, NUM_BOOKS, BATCH_SIZE):
        batch = [generate_book(publisher_ids) for _ in range(BATCH_SIZE)]
        cursor.execute("BEGIN TRANSACTION;")
        cursor.executemany("""
            INSERT INTO books (title, isbn, publisher_id, publication_date, price, stock)
            VALUES (?, ?, ?, ?, ?, ?);
        """, batch)
        conn.commit()
        print(f"Inserted {i + BATCH_SIZE} / {NUM_BOOKS} books")

    conn.close()
    print("✅ Done inserting books.")

if __name__ == "__main__":
    insert_books()
