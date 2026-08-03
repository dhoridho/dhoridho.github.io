---
kind: build
title: Realtime Sales Dashboard
summary: Field visits from every distributor instance stream through middleware into one live dashboard, with each instance kept isolated from the others.
context: Akasha Wira International
year: "2025"
stack: [Odoo, Middleware, PostgreSQL]
visibility: internal
weight: 80
---

## The problem

Field sales activity lived inside each distributor's own instance. Seeing what was
happening across the network meant asking for exports, and by the time they
arrived the day was over. There was no single view of visits actually being
completed.

## Approach

Stream visit activity out of every instance into one dashboard.

- **Middleware between the instances and the dashboard**, so the reporting side never queries a distributor's production database directly.
- **Per-instance isolation preserved** through the pipeline, so a distributor's data stays attributable to them.
- **A flat replica of visit lines** plus daily aggregates, because a dashboard reading raw transactional tables gets slower as the data grows.
- **Checkout events** captured as they happen rather than reconstructed later.

## Outcome

One live view across the network, refreshed continuously, without any instance
being exposed to the reporting layer.
