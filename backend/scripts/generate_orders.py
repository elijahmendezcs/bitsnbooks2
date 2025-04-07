import sqlite3
import random
from faker import Faker

# Config
DB_PATH = "../BitsAndBooks.sqlite"
NUM_ORDERS = 5000
BATCH_SIZE = 500

faker = Faker()

def generate_order(customer_ids):
    customer_id = random.choice(customer_ids)
    order_date = faker.date_time_between(start_date='-2y', end_date='now').isoformat()
    total_amount = round(random.uniform(20.0, 500.0), 2)
    status = random.choice(["Processing", "Shipped", "Delivered", "Cancelled"])
    return (customer_id, order_date, total_amount, status)

def insert_orders():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Fetch existing customers
    cursor.execute("SELECT customer_id FROM customers;")
    customer_ids = [row[0] for row in cursor.fetchall()]
    if not customer_ids:
        raise Exception("No customers found. Insert customers first.")

    print(f"Inserting {NUM_ORDERS} orders in batches of {BATCH_SIZE}...")

    for i in range(0, NUM_ORDERS, BATCH_SIZE):
        batch = [generate_order(customer_ids) for _ in range(BATCH_SIZE)]
        cursor.execute("BEGIN TRANSACTION;")
        cursor.executemany("""
            INSERT INTO orders (customer_id, order_date, total_amount, status)
            VALUES (?, ?, ?, ?);
        """, batch)
        conn.commit()
        print(f"Inserted {min(i + BATCH_SIZE, NUM_ORDERS)} / {NUM_ORDERS} orders")

    conn.close()
    print("Done inserting orders.")

if __name__ == "__main__":
    insert_orders()
