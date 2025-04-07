import sqlite3
import random
from faker import Faker

# Config
DB_PATH = "../BitsAndBooks.sqlite"
MAX_PURCHASES_PER_BOOK = 3

faker = Faker()

def insert_inventory_purchases():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get all books and their publisher_id
    cursor.execute("SELECT book_id, publisher_id FROM books WHERE publisher_id IS NOT NULL;")
    book_records = cursor.fetchall()

    if not book_records:
        raise Exception("No books with publishers found.")

    print(f"Inserting inventory purchases for {len(book_records)} books...")

    cursor.execute("BEGIN TRANSACTION;")
    for book_id, publisher_id in book_records:
        num_purchases = random.randint(1, MAX_PURCHASES_PER_BOOK)

        for _ in range(num_purchases):
            quantity = random.randint(10, 100)
            purchase_date = faker.date_between(start_date="-3y", end_date="today").isoformat()

            cursor.execute("""
                INSERT INTO inventory_purchases (book_id, publisher_id, quantity, purchase_date)
                VALUES (?, ?, ?, ?);
            """, (book_id, publisher_id, quantity, purchase_date))

    conn.commit()
    conn.close()
    print("✅ Done inserting inventory purchases.")

if __name__ == "__main__":
    insert_inventory_purchases()
