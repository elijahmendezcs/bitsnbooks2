# seed_database.py
import sys

from generate_stores import insert_stores
from generate_publishers import insert_publishers
from generate_authors import insert_authors
from generate_employees import insert_employees
from generate_books import insert_books
from generate_book_authors import insert_book_authors
from generate_customers import insert_customers
from generate_orders import insert_orders
from generate_order_details import insert_order_details
from generate_inventory_purchases import insert_inventory_purchases

steps = [
    ("Stores", insert_stores),
    ("Publishers", insert_publishers),
    ("Authors", insert_authors),
    ("Employees", insert_employees),
    ("Books", insert_books),
    ("Book-Author Links", insert_book_authors),
    ("Customers", insert_customers),
    ("Orders", insert_orders),
    ("Order Details", insert_order_details),
    ("Inventory Purchases", insert_inventory_purchases)
]

def print_menu():
    print("\n--- Bits & Books DB Seeder ---")
    print("0: Run all")
    for i, (label, _) in enumerate(steps, 1):
        print(f"{i}: Populate {label}")
    print("q: Quit\n")

def main():
    while True:
        print_menu()
        choice = input("Choose an option: ").strip()

        if choice == "q":
            print("Goodbye!")
            sys.exit()

        if choice == "0":
            for label, func in steps:
                print(f"\n--- Running: {label} ---")
                func()
            print("✅ Done populating entire database.")
            break

        if choice.isdigit() and 1 <= int(choice) <= len(steps):
            label, func = steps[int(choice) - 1]
            print(f"\n--- Running: {label} ---")
            func()
        else:
            print("Invalid choice. Try again.")

if __name__ == "__main__":
    main()
