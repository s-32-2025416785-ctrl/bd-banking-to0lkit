# BD Banking Toolkit

A small project built by a Banking & Insurance student at the University of Dhaka. It has two parts: a loan calculator and a SQL practice set.

## 1. Loan EMI Calculator

Enter a loan amount, yearly interest rate and period. It shows the monthly EMI, total interest, total payable and a full month-by-month repayment schedule, all in taka.

**Live site:** PASTE_YOUR_LIVE_LINK_HERE

Built with plain HTML, CSS and JavaScript, hosted free on GitHub Pages.

## 2. SQL Banking Practice Set

A made-up bank database with four tables: customers, accounts, loans and transactions.

- `sql/setup.sql` creates the tables and fills them with sample data
- `sql/queries.sql` has 14 solved queries, from easy to hard

Topics covered: WHERE, ORDER BY, JOINs, GROUP BY, HAVING, subqueries, CTEs and window functions (RANK and running totals).

**How to run it:** open sqliteonline.com, choose SQLite, run `setup.sql`, then run the queries one at a time.

## EMI formula

EMI = P × r × (1+r)^n ÷ ((1+r)^n − 1)

P is the loan amount, r is the monthly interest rate and n is the number of months.

All customer names and numbers are made up for practice.