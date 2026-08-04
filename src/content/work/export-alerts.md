---
kind: improvement
title: Data Export Alerts
summary: "Every CSV and spreadsheet export raises a Discord notification with who exported what, so bulk data leaving the system is visible."
context: Akasha Wira International
year: "2025"
stack: [Odoo, Python, Discord]
visibility: internal
weight: 60
---

## The problem

Anyone with access to a list view can export it. That is a normal feature and a
real risk at the same time: bulk customer or pricing data can leave the system
without anyone noticing, and there was no record that it had happened.

## Approach

Make exports visible rather than blocking them.

- **Intercepts CSV and spreadsheet export requests** at the point they are made.
- **Sends a Discord notification** carrying the context that matters: who exported, from which model, and how much.
- **Reports rather than prevents**, because blocking exports breaks legitimate work, while silence is what makes the risk real.

## Outcome

Bulk data leaving the system is now something the team sees when it happens,
instead of something discovered afterwards or not at all.
