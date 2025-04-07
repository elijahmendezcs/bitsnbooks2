import sqlite3
from faker import Faker
import random

# Config
DB_PATH = "../BitsAndBooks.sqlite"
NUM_AUTHORS = 1000
BATCH_SIZE = 100

# Faker setup
faker = Faker()

# Track seen names to avoid duplicates
seen_names = set()

def generate_unique_author():
    while True:
        first_name = faker.first_name()
        last_name = faker.last_name()
        key = (first_name.lower(), last_name.lower())

        if key not in seen_names:
            seen_names.add(key)
            bio = faker.text(max_nb_chars=200)
            return (first_name, last_name, bio)

def insert_authors():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    print(f"Inserting {NUM_AUTHORS} authors in batches of {BATCH_SIZE}...")

    for i in range(0, NUM_AUTHORS, BATCH_SIZE):
        batch = [generate_unique_author() for _ in range(BATCH_SIZE)]
        cursor.execute("BEGIN TRANSACTION;")
        cursor.executemany("""
            INSERT INTO authors (first_name, last_name, bio)
            VALUES (?, ?, ?);
        """, batch)
        conn.commit()
        print(f"Inserted {min(i + BATCH_SIZE, NUM_AUTHORS)} / {NUM_AUTHORS} authors")

    conn.close()
    print("Done inserting authors.")

if __name__ == "__main__":
    insert_authors()
