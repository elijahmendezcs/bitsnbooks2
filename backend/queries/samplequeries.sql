-- ================================================
-- 1. List all books with their publisher name
-- ================================================
SELECT b.title, b.isbn, p.name AS publisher_name
FROM books b
         JOIN publishers p ON b.publisher_id = p.publisher_id;


-- ================================================
-- 2. Show all authors for a specific book
-- ================================================
SELECT b.title, a.first_name || ' ' || a.last_name AS author_name
FROM books b
         JOIN book_authors ba ON b.book_id = ba.book_id
         JOIN authors a ON ba.author_id = a.author_id
WHERE b.title LIKE '%Java%';


-- ================================================
-- 3. Total number of orders per customer
-- ================================================
SELECT c.first_name || ' ' || c.last_name AS customer_name,
       COUNT(o.order_id) AS total_orders
FROM customers c
         JOIN orders o ON c.customer_id = o.customer_id
GROUP BY c.customer_id
ORDER BY total_orders DESC;


-- ================================================
-- 4. Most popular books (based on order frequency)
-- ================================================
SELECT b.title, COUNT(od.book_id) AS times_ordered
FROM books b
         JOIN order_details od ON b.book_id = od.book_id
GROUP BY b.book_id
ORDER BY times_ordered DESC
LIMIT 10;


-- ================================================
-- 5. Total revenue generated per book
-- ================================================
SELECT b.title,
       ROUND(SUM(od.price), 2) AS total_revenue
FROM books b
         JOIN order_details od ON b.book_id = od.book_id
GROUP BY b.book_id
ORDER BY total_revenue DESC
LIMIT 10;


-- ================================================
-- 6. Inventory restocks per publisher
-- ================================================
SELECT p.name AS publisher_name,
       COUNT(ip.purchase_id) AS num_restocks,
       SUM(ip.quantity) AS total_units
FROM inventory_purchases ip
         JOIN publishers p ON ip.publisher_id = p.publisher_id
GROUP BY p.publisher_id
ORDER BY total_units DESC;


-- ================================================
-- 7. All employees at each store
-- ================================================
SELECT s.address AS store_address,
       e.name AS employee_name,
       e.email
FROM stores s
         JOIN employees e ON s.store_id = e.store_id
ORDER BY s.store_id;


-- ================================================
-- 8. Orders with more than $200 total
-- ================================================
SELECT o.order_id, c.first_name || ' ' || c.last_name AS customer, o.total_amount
FROM orders o
         JOIN customers c ON o.customer_id = c.customer_id
WHERE o.total_amount > 200
ORDER BY o.total_amount DESC;


-- ================================================
-- 9. Books that are out of stock
-- ================================================
SELECT title, isbn, stock
FROM books
WHERE stock = 0;


-- ================================================
-- 10. View total sales per day
-- ================================================
SELECT DATE(order_date) AS sale_day,
       COUNT(order_id) AS orders,
       ROUND(SUM(total_amount), 2) AS total_revenue
FROM orders
GROUP BY DATE(order_date)
ORDER BY sale_day DESC
LIMIT 30;
