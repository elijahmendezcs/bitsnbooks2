import sqlite3
from faker import Faker

# Config
DB_PATH = "../BitsAndBooks.sqlite"
NUM_CUSTOMERS = 5000
BATCH_SIZE = 500

# Faker setup
faker = Faker()

def generate_customer(index):
    first_name = faker.first_name()
    last_name = faker.last_name()
    email = f"customer{index}@{faker.free_email_domain()}"
    phone = faker.phone_number()
    address = faker.address().replace("\n", ", ")
    return (first_name, last_name, email, phone, address)

def insert_customers():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print(f"Inserting {NUM_CUSTOMERS} customers in batches of {BATCH_SIZE}...")

    for i in range(0, NUM_CUSTOMERS, BATCH_SIZE):
        batch = [generate_customer(index) for index in range(i, i + BATCH_SIZE)]
        cursor.execute("BEGIN TRANSACTION;")
        cursor.executemany("""
            INSERT INTO customers (first_name, last_name, email, phone, address)
            VALUES (?, ?, ?, ?, ?);
        """, batch)
        conn.commit()
        print(f"Inserted {min(i + BATCH_SIZE, NUM_CUSTOMERS)} / {NUM_CUSTOMERS} customers")

    conn.close()
    print("Done inserting customers.")

if __name__ == "__main__":
    insert_customers()
