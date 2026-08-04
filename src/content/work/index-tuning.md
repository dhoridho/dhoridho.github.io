---
kind: improvement
title: Query and Index Tuning
summary: "Cut database CPU by around 80% at peak by caching Odoo read paths in Redis and rebuilding the indexes behind the slowest queries."
context: Akasha Wira International
year: "2025"
stack: [PostgreSQL, Redis, Odoo]
visibility: internal
weight: 68
---

## The problem

At peak sales force traffic the database server ran hot enough to threaten
everything else on it. The instinct in that situation is to add hardware, which
buys time without answering why the load exists.

## Approach

Find the queries responsible, then remove the reason they were expensive.

- **Read the slow queries first**, rather than guessing which ones mattered.
- **Redis in front of Odoo's read paths**, so the repeated reads that dominated the load stopped reaching the database at all.
- **Indexes rebuilt** behind the queries that remained, designed around how they actually filter rather than around the columns that looked obvious.

## Outcome

Database CPU and query load dropped by roughly 80% at peak, on the same hardware.
