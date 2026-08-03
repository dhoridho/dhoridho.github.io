---
kind: build
title: Receivables Aging Notifications
summary: Computes accounts-receivable aging per customer, sends each one their own WhatsApp reminder, and keeps an audit trail of what went out to whom.
context: Akasha Wira International
year: "2025"
stack: [Odoo, Python, PostgreSQL, WhatsApp API]
visibility: internal
weight: 82
---

## The problem

Chasing overdue invoices was manual. Someone had to pull the aging report, work
out which customer owed what and for how long, then message each of them
individually. It happened when there was time for it, which is not the same as
when it was needed, and there was no record of who had actually been contacted.

## Approach

Compute the aging, generate the message, send it, and keep the receipt.

- **Aging is computed per customer** from invoice data into its own staging table, rather than read off a report.
- **Each customer gets their own message**, listing their own outstanding amounts by age bracket.
- **Delivery over WhatsApp**, which is where these conversations already happen.
- **An audit trail** of what was sent to whom and when, so the follow-up conversation can start from a fact rather than a guess.

## Outcome

Reminders go out on schedule instead of when someone remembers, and collections
has a record of every notice sent.
