---
kind: improvement
title: Attachment Caching
summary: Field visit photos and inventory checks served from Redis instead of hitting the filestore on every read.
context: Akasha Wira International
year: "2025"
stack: [Odoo, Redis]
visibility: internal
weight: 65
---

## The problem

Field staff attach photos to every visit, and those images are read back constantly
by dashboards and checks. Each read went to the filestore, so a page showing many
visits meant many file reads for images that had not changed since they were
uploaded.

## Approach

Cache what does not change.

- **Visit photos served from Redis** after their first read.
- **Inventory check and visit route data cached** on the same layer, since they follow the same pattern of being written once and read repeatedly.
- **Invalidation tied to the record**, so an updated attachment is not served stale.

## Outcome

Repeat reads stopped touching the filestore, which took load off the parts of the
day when field staff are most active.
