-- Sample Transaction #1: Customer 5 places an order for Book 3 (1x) and Book 7 (2x)

BEGIN TRANSACTION;

-- Insert into Orders
INSERT INTO Orders (customer_id, order_date, total_amount, status)
VALUES (5, CURRENT_TIMESTAMP, 89.90, 'Pending');

-- Insert into OrderDetails using the latest order_id
INSERT INTO OrderDetails (order_id, book_id, quantity, price)
VALUES
    ((SELECT MAX(order_id) FROM Orders), 3, 1, 29.95),
    ((SELECT MAX(order_id) FROM Orders), 7, 2, 29.98);

-- Update book stock
UPDATE Books SET stock = stock - 1 WHERE book_id = 3;
UPDATE Books SET stock = stock - 2 WHERE book_id = 7;

COMMIT;




-- Sample Transaction #2: Cancel Most Recent Order for Customer 5
-- Reverses stock, removes order and its items

BEGIN TRANSACTION;

-- Step 1: Get latest order_id for customer 5
-- We'll use it in a subquery
-- Step 2: Restore book stock based on the order details
UPDATE Books
SET stock = stock + (
    SELECT quantity FROM OrderDetails
    WHERE OrderDetails.book_id = Books.book_id
      AND OrderDetails.order_id = (SELECT MAX(order_id) FROM Orders WHERE customer_id = 5)
)
WHERE book_id IN (
    SELECT book_id FROM OrderDetails
    WHERE order_id = (SELECT MAX(order_id) FROM Orders WHERE customer_id = 5)
);

-- Step 3: Delete from OrderDetails
DELETE FROM OrderDetails
WHERE order_id = (SELECT MAX(order_id) FROM Orders WHERE customer_id = 5);

-- Step 4: Delete the Order
DELETE FROM Orders
WHERE order_id = (SELECT MAX(order_id) FROM Orders WHERE customer_id = 5);

COMMIT;



-- Sample Transaction #3: Update Quantity of a book in existing order
-- Customer 5 wants 3 copies of Book 3 instead of 1

BEGIN TRANSACTION;

-- Step 1: Get current quantity for Book 3 in most recent order
-- This will be used to calculate the stock adjustment
WITH previous_qty AS (
    SELECT quantity FROM OrderDetails
    WHERE order_id = (SELECT MAX(order_id) FROM Orders WHERE customer_id = 5)
      AND book_id = 3
),
     qty_diff AS (
         SELECT 3 - quantity AS diff FROM previous_qty  -- 3 is the new quantity
     )

-- Step 2: Update the stock based on quantity difference
UPDATE Books
SET stock = stock - (
    SELECT diff FROM qty_diff
)
WHERE book_id = 3;

-- Step 3: Update the OrderDetails with the new quantity and price
UPDATE OrderDetails
SET quantity = 3,
    price = 29.95 * 3
WHERE order_id = (SELECT MAX(order_id) FROM Orders WHERE customer_id = 5)
  AND book_id = 3;

COMMIT;