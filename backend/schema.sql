-- Drop existing tables (accounting for all naming cases)
DROP TABLE IF EXISTS BookAuthors;
DROP TABLE IF EXISTS Employee;
DROP TABLE IF EXISTS OrderDetails;
DROP TABLE IF EXISTS Store;

DROP TABLE IF EXISTS purchases;
DROP TABLE IF EXISTS inventory_purchases;
DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS book_authors;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS publishers;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS stores;

-- Publishers Table
CREATE TABLE publishers (
                            publisher_id INTEGER PRIMARY KEY AUTOINCREMENT,
                            name TEXT NOT NULL,
                            address TEXT,
                            phone TEXT,
                            email TEXT,
                            CONSTRAINT unique_publisher_info UNIQUE (name, email)
);

-- Authors Table
CREATE TABLE authors (
                         author_id INTEGER PRIMARY KEY AUTOINCREMENT,
                         first_name TEXT NOT NULL,
                         last_name TEXT NOT NULL,
                         bio TEXT,
                         CONSTRAINT unique_author_name UNIQUE (first_name, last_name) -- fix this later, authors cannot have the same and first and last name, but some people do have the same first and last name
);

-- Books Table
CREATE TABLE books (
                       book_id INTEGER PRIMARY KEY AUTOINCREMENT,
                       title TEXT NOT NULL,
                       isbn TEXT UNIQUE NOT NULL,
                       publisher_id INTEGER,
                       publication_date DATE,
                       price DECIMAL(10, 2),
                       stock INTEGER DEFAULT 0 CHECK (stock >= 0),
                       FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id)
);

-- BookAuthors (Many-to-Many between Books and Authors)
CREATE TABLE book_authors (
                              book_id INTEGER NOT NULL,
                              author_id INTEGER NOT NULL,
                              PRIMARY KEY (book_id, author_id),
                              FOREIGN KEY (book_id) REFERENCES books(book_id),
                              FOREIGN KEY (author_id) REFERENCES authors(author_id)
);

-- Customers Table
CREATE TABLE customers (
                           customer_id INTEGER PRIMARY KEY AUTOINCREMENT,
                           first_name TEXT NOT NULL,
                           last_name TEXT NOT NULL,
                           email TEXT UNIQUE NOT NULL,
                           phone TEXT,
                           address TEXT
);

-- Orders Table
CREATE TABLE orders (
                        order_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        customer_id INTEGER NOT NULL,
                        order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
                        total_amount DECIMAL(10,2),
                        status TEXT,
                        FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

-- OrderDetails Table
CREATE TABLE order_details (
                               order_detail_id INTEGER PRIMARY KEY AUTOINCREMENT,
                               order_id INTEGER NOT NULL,
                               book_id INTEGER NOT NULL,
                               quantity INTEGER NOT NULL,
                               price DECIMAL(10,2) NOT NULL,
                               FOREIGN KEY (order_id) REFERENCES orders(order_id),
                               FOREIGN KEY (book_id) REFERENCES books(book_id)
);

-- Inventory Purchases (store restocking from publishers)
CREATE TABLE inventory_purchases (
                                     purchase_id INTEGER PRIMARY KEY AUTOINCREMENT,
                                     book_id INTEGER NOT NULL,
                                     publisher_id INTEGER NOT NULL,
                                     quantity INTEGER NOT NULL,
                                     purchase_date DATE NOT NULL,
                                     FOREIGN KEY (book_id) REFERENCES books(book_id),
                                     FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id)
);

-- Stores Table
CREATE TABLE stores (
                        store_id INTEGER PRIMARY KEY AUTOINCREMENT,
                        address TEXT NOT NULL,
                        phone_number TEXT NOT NULL
);

-- Employees Table
CREATE TABLE employees (
                           employee_id INTEGER PRIMARY KEY AUTOINCREMENT,
                           name TEXT NOT NULL,
                           sex TEXT,
                           address TEXT NOT NULL,
                           ssn TEXT UNIQUE,
                           phone_number TEXT NOT NULL,
                           email TEXT NOT NULL,
                           store_id INTEGER NOT NULL,
                           FOREIGN KEY (store_id) REFERENCES stores(store_id)
);
