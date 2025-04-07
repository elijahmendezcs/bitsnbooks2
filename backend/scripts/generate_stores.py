import sqlite3
from faker import Faker

# Config
DB_PATH = "../BitsAndBooks.sqlite"
NUM_STORES = 100            # Total number of stores to insert
BATCH_SIZE = 20             # Number of stores per batch

# Faker setup
faker = Faker()

def generate_store():
    address = faker.address().replace("\n", ", ")
    phone_number = faker.phone_number()
    return (address, phone_number)

def insert_stores():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print(f"Inserting {NUM_STORES} stores in batches of {BATCH_SIZE}...")

    for i in range(0, NUM_STORES, BATCH_SIZE):
        batch = [generate_store() for _ in range(BATCH_SIZE)]
        cursor.execute("BEGIN TRANSACTION;")
        cursor.executemany("""
            INSERT INTO stores (address, phone_number)
            VALUES (?, ?);
        """, batch)
        conn.commit()
        print(f"Inserted {min(i + BATCH_SIZE, NUM_STORES)} / {NUM_STORES} stores")

    conn.close()
    print("Done inserting stores.")

if __name__ == "__main__":
    insert_stores()
