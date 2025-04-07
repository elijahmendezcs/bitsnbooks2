import sqlite3
import random

# Config
DB_PATH = "../BitsAndBooks.sqlite"
MAX_BOOKS_PER_ORDER = 5

def insert_order_details():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Fetch all order and book IDs
    cursor.execute("SELECT order_id FROM orders;")
    order_ids = [row[0] for row in cursor.fetchall()]
    cursor.execute("SELECT book_id, price FROM books;")
    books = cursor.fetchall()

    if not order_ids or not books:
        raise Exception("Orders or books not found. Insert both first.")

    print(f"Generating order_details for {len(order_ids)} orders...")

    cursor.execute("BEGIN TRANSACTION;")
    for order_id in order_ids:
        num_books = random.randint(1, MAX_BOOKS_PER_ORDER)
        selected_books = random.sample(books, num_books)

        for book_id, book_price in selected_books:
            quantity = random.randint(1, 3)
            line_price = round(book_price * quantity, 2)

            cursor.execute("""
                INSERT INTO order_details (order_id, book_id, quantity, price)
                VALUES (?, ?, ?, ?);
            """, (order_id, book_id, quantity, line_price))

    conn.commit()
    conn.close()
    print("✅ Done inserting order details.")

if __name__ == "__main__":
    insert_order_details()
