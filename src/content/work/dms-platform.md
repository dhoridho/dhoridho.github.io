---
kind: build
title: Distribution Management Platform
summary: The system distributors run on, from ordering and stock through to invoicing, deployed as its own instance per distributor.
context: Akasha Wira International
year: "2025"
stack: [Odoo, Docker, PostgreSQL, REST]
visibility: internal
weight: 85
---

## The problem

Distributors need their own system to sell, hold stock and invoice, but they are
separate businesses. One shared instance would mix their data; a hand-built
instance each would be impossible to maintain at over a hundred of them.

## Approach

One platform, deployed as an isolated instance per distributor.

- **Per-distributor isolation**, so one distributor's data and configuration never touch another's.
- **A common codebase** across every instance, so a fix ships everywhere rather than being reapplied by hand.
- **Containerised deployment**, which is what makes running that many instances tractable.
- **Sync with the central ERP** for the master data that has to stay consistent, such as products and pricelists.

## Outcome

Over a hundred instances in production, operated as a fleet rather than
individually. The automation that keeps them healthy is a separate piece of work,
listed alongside this one.
