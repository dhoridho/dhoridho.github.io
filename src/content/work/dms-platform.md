---
kind: build
title: Distribution Management Systems
summary: "Work across the systems distributors run on: a live view of field activity, exports finance needed, and the containers they all run in."
context: Akasha Wira International
year: "2025"
stack: [Odoo, Docker, PostgreSQL, REST]
visibility: internal
weight: 85
---

## The setup

Every distributor runs their own instance, isolated from the others. I work across
that estate: building what the business needed on top of it, and keeping it running.

## What I built

- **Realtime field visibility.** Visit activity streams out of every instance through middleware into one dashboard, with per-instance isolation preserved through the pipeline so a distributor's data stays theirs. Reporting never queries a production instance directly.
- **A flat replica instead of live queries.** Visit lines are replicated into a flat table with daily aggregates, because a dashboard reading transactional tables gets slower every month it runs.
- **Exports finance asked for.** Invoice line data out to CSV by month range or in full, from a menu next to the invoices themselves rather than a report someone has to request.
- **Containerised, so the fleet is operable.** Which is what makes running this many instances possible at all, and is covered separately by the automation that maintains them.

## Outcome

One live view across the network, and instances that can be operated as a fleet
rather than individually.
