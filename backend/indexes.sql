-- ===========================
-- Indexes for Books Table
-- ===========================
CREATE INDEX idx_books_title ON books(title);
CREATE INDEX idx_books_title_nocase ON books(title COLLATE NOCASE);
CREATE INDEX idx_books_isbn ON books(isbn);
CREATE INDEX idx_books_publisher_id ON books(publisher_id);
CREATE INDEX idx_books_price ON books(price);

-- ===========================
-- Indexes for Authors Table
-- ===========================
CREATE INDEX idx_authors_name ON authors(last_name, first_name);

-- ===========================
-- Indexes for Customers Table
-- ===========================
CREATE INDEX idx_customers_email ON customers(email);

-- ===========================
-- Indexes for Orders Table
-- ===========================
CREATE INDEX idx_orders_customer_id ON orders(customer_id);

-- ===========================
-- Indexes for Order Details Table
-- ===========================
CREATE INDEX idx_orderdetails_order_id ON order_details(order_id);
CREATE INDEX idx_orderdetails_book_id ON order_details(book_id);
CREATE INDEX idx_orderdetails_order_book ON order_details(order_id, book_id);

-- ===========================
-- Indexes for Book Authors Table
-- ===========================
CREATE INDEX idx_bookauthors_author_id ON book_authors(author_id);
CREATE INDEX idx_bookauthors_book_id ON book_authors(book_id);

-- ===========================
-- Indexes for Employees Table
-- ===========================
CREATE INDEX idx_employees_store_id ON employees(store_id);
CREATE INDEX idx_employees_email ON employees(email);
CREATE INDEX idx_employees_ssn ON employees(ssn);

-- ===========================
-- Indexes for Stores Table
-- ===========================
CREATE INDEX idx_stores_phone ON stores(phone_number);

-- ===========================
-- Indexes for Inventory Purchases Table
-- ===========================
CREATE INDEX idx_inventory_purchases_book_id ON inventory_purchases(book_id);
CREATE INDEX idx_inventory_purchases_publisher_id ON inventory_purchases(publisher_id);
