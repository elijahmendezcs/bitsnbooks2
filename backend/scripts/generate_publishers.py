import sqlite3
from faker import Faker

# Config
DB_PATH = "../BitsAndBooks.sqlite"
NUM_PUBLISHERS = 100          # Total number of publishers to insert
BATCH_SIZE = 20               # Number of publishers per batch

# Faker setup
faker = Faker()

def generate_publisher(index):
    name = f"{faker.company()} Publishing Co. #{index}"
    address = faker.address().replace("\n", ", ")
    phone = faker.phone_number()
    email = f"pub{index}@{faker.free_email_domain()}"
    return (name, address, phone, email)

def insert_publishers():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print(f"Inserting {NUM_PUBLISHERS} publishers in batches of {BATCH_SIZE}...")

    for i in range(0, NUM_PUBLISHERS, BATCH_SIZE):
        batch = [generate_publisher(index) for index in range(i, i + BATCH_SIZE)]
        cursor.execute("BEGIN TRANSACTION;")
        cursor.executemany("""
            INSERT INTO publishers (name, address, phone, email)
            VALUES (?, ?, ?, ?);
        """, batch)
        conn.commit()
        print(f"Inserted {min(i + BATCH_SIZE, NUM_PUBLISHERS)} / {NUM_PUBLISHERS} publishers")

    conn.close()
    print("Done inserting publishers.")

if __name__ == "__main__":
    insert_publishers()
