-- =======================================================
-- View: EmployeeInStore
-- Shows all employee names, email, & store department num
-- =======================================================

CREATE VIEW employee_in_store AS
SELECT
    e.name AS full_name,
    e.store_id AS department_number,
    e.email
FROM employees e;

