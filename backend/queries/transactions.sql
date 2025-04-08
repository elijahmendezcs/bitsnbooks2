-- ================================================
-- Transaction 1: Customer 5 places a new order
-- Books: Book 3 (1 copy), Book 7 (2 copies)
-- ================================================

BEGIN TRANSACTION;

-- Step 1: Insert new order
INSERT INTO orders (customer_id, order_date, total_amount, status)
VALUES (5, CURRENT_TIMESTAMP, 89.90, 'Pending');

-- Step 2: Add order details using the latest order_id
INSERT INTO order_details (order_id, book_id, quantity, price)
VALUES ((SELECT MAX(order_id) FROM orders), 3, 1, 29.95),
       ((SELECT MAX(order_id) FROM orders), 7, 2, 29.98);

-- Step 3: Update book stock
UPDATE books
SET stock = stock - 1
WHERE book_id = 3;
UPDATE books
SET stock = stock - 2
WHERE book_id = 7;

COMMIT;

-- =========================================================
-- Transaction 2: Cancel most recent order for Customer 5
-- Reverses book stock and deletes order + order details
-- =========================================================

BEGIN TRANSACTION;

-- Step 1: Restore stock by adding back the quantities
UPDATE books
SET stock = stock + (SELECT quantity
                     FROM order_details
                     WHERE order_details.book_id = books.book_id
                       AND order_details.order_id = (SELECT MAX(order_id)
                                                     FROM orders
                                                     WHERE customer_id = 5))
WHERE book_id IN (SELECT book_id
                  FROM order_details
                  WHERE order_id = (SELECT MAX(order_id) FROM orders WHERE customer_id = 5));

-- Step 2: Remove order details
DELETE
FROM order_details
WHERE order_id = (SELECT MAX(order_id) FROM orders WHERE customer_id = 5);

-- Step 3: Delete the order itself
DELETE
FROM orders
WHERE order_id = (SELECT MAX(order_id) FROM orders WHERE customer_id = 5);

COMMIT;

-- ===============================================================
-- Transaction 3: Update quantity of Book 3 in Customer 5's order
-- Changes quantity to 3, updates stock and order_details table
-- ===============================================================

BEGIN TRANSACTION;

-- Step 1: Capture previous quantity
WITH previous_qty AS (SELECT quantity
                      FROM order_details
                      WHERE order_id = (SELECT MAX(order_id) FROM orders WHERE customer_id = 5)
                        AND book_id = 3),
     qty_diff AS (SELECT 3 - quantity AS diff
                  FROM previous_qty -- New quantity is 3
     )

-- Step 2: Adjust stock by difference
UPDATE books
SET stock = stock - (SELECT diff FROM qty_diff)
WHERE book_id = 3;

-- Step 3: Update order detail with new quantity and price
UPDATE order_details
SET quantity = 3,
    price    = 3 * 29.95
WHERE order_id = (SELECT MAX(order_id) FROM orders WHERE customer_id = 5)
  AND book_id = 3;

COMMIT;
