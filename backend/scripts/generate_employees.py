import sqlite3
from faker import Faker
import random

# Config
DB_PATH = "../BitsAndBooks.sqlite"
NUM_EMPLOYEES = 500           # Adjust based on your goal
BATCH_SIZE = 100

# Faker setup
faker = Faker()

def generate_employee(store_ids, index):
    name = faker.name()
    sex = random.choice(["M", "F", "Other"])
    address = faker.address().replace("\n", ", ")
    ssn = f"{index:09d}"  # Unique SSN using index
    phone_number = faker.phone_number()
    email = f"employee{index}@{faker.free_email_domain()}"
    store_id = random.choice(store_ids)
    return (name, sex, address, ssn, phone_number, email, store_id)

def insert_employees():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Get existing store IDs
    cursor.execute("SELECT store_id FROM stores;")
    store_ids = [row[0] for row in cursor.fetchall()]
    if not store_ids:
        raise Exception("No stores found. Insert stores first.")

    print(f"Inserting {NUM_EMPLOYEES} employees in batches of {BATCH_SIZE}...")

    for i in range(0, NUM_EMPLOYEES, BATCH_SIZE):
        batch = [generate_employee(store_ids, index) for index in range(i, i + BATCH_SIZE)]
        cursor.execute("BEGIN TRANSACTION;")
        cursor.executemany("""
            INSERT INTO employees (name, sex, address, ssn, phone_number, email, store_id)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        """, batch)
        conn.commit()
        print(f"Inserted {min(i + BATCH_SIZE, NUM_EMPLOYEES)} / {NUM_EMPLOYEES} employees")

    conn.close()
    print("Done inserting employees.")

if __name__ == "__main__":
    insert_employees()
