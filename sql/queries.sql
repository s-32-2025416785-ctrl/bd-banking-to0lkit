-- BD Banking Toolkit: solved queries, easy to hard
-- Run setup.sql first. Run one query at a time.

-- ===== EASY =====

-- 1. Customers living in Dhaka
SELECT * FROM customers WHERE city = 'Dhaka';

-- 2. Accounts with more than 100,000 taka, biggest first
SELECT account_id, type, balance
FROM accounts
WHERE balance > 100000
ORDER BY balance DESC;

-- 3. How many customers does the bank have?
SELECT COUNT(*) AS total_customers FROM customers;

-- ===== JOINS =====

-- 4. Each customer's accounts with the owner's name
SELECT c.name, a.type, a.balance
FROM customers c
JOIN accounts a ON a.customer_id = c.customer_id
ORDER BY c.name;

-- 5. Overdue loans with customer name and city
SELECT c.name, c.city, l.amount, l.start_date
FROM loans l
JOIN customers c ON c.customer_id = l.customer_id
WHERE l.status = 'overdue';

-- ===== GROUP BY =====

-- 6. Total deposits held in each city
SELECT c.city, SUM(a.balance) AS total_balance
FROM customers c
JOIN accounts a ON a.customer_id = c.customer_id
GROUP BY c.city
ORDER BY total_balance DESC;

-- 7. Number of accounts and average balance by account type
SELECT type, COUNT(*) AS accounts, ROUND(AVG(balance)) AS avg_balance
FROM accounts
GROUP BY type;

-- 8. Customers whose total balance is above 200,000 (HAVING filters groups)
SELECT c.name, SUM(a.balance) AS total_balance
FROM customers c
JOIN accounts a ON a.customer_id = c.customer_id
GROUP BY c.customer_id, c.name
HAVING SUM(a.balance) > 200000
ORDER BY total_balance DESC;

-- ===== SUBQUERIES =====

-- 9. Customers who have never taken a loan
SELECT name, city
FROM customers
WHERE customer_id NOT IN (SELECT customer_id FROM loans);

-- 10. Loan amount and number of loans by status
SELECT status, COUNT(*) AS loans, SUM(amount) AS total_amount
FROM loans
GROUP BY status;

-- ===== HARD =====

-- 11. Top 3 depositors by total money deposited
SELECT c.name, SUM(t.amount) AS total_deposited
FROM transactions t
JOIN accounts a ON a.account_id = t.account_id
JOIN customers c ON c.customer_id = a.customer_id
WHERE t.type = 'deposit'
GROUP BY c.customer_id, c.name
ORDER BY total_deposited DESC
LIMIT 3;

-- 12. Rank customers by total balance inside their own city (window function)
WITH totals AS (
  SELECT c.name, c.city, SUM(a.balance) AS total_balance
  FROM customers c
  JOIN accounts a ON a.customer_id = c.customer_id
  GROUP BY c.customer_id, c.name, c.city
)
SELECT city, name, total_balance,
       RANK() OVER (PARTITION BY city ORDER BY total_balance DESC) AS rank_in_city
FROM totals
ORDER BY city, rank_in_city;

-- 13. Running net movement (deposits minus withdrawals) for account 103
SELECT txn_date, type, amount,
       SUM(CASE WHEN type = 'deposit' THEN amount ELSE -amount END)
         OVE