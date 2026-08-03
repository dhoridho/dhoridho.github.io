---
kind: build
title: Manufacturing ERP
summary: A full Odoo 16 system for a factory, covering manufacturing orders, waste tolerance, conversion cost, repacking, and cost structure reporting.
context: Akasha Wira International
year: "2026"
stack: [Odoo, Python, PostgreSQL]
visibility: internal
weight: 95
---

## The problem

A factory running its production on spreadsheets and a general-purpose ERP that
did not model how the plant actually worked. Costing in particular was the weak
point: what a finished product truly cost, once waste, repacking and conversion
were accounted for, was not something the system could answer.

## Approach

A full Odoo 16 build shaped around the plant rather than around the software.

- **Manufacturing orders** carrying the real bill of materials, including by-products.
- **Waste tolerance** modelled explicitly, so expected loss is planned rather than discovered at month end.
- **Conversion cost** applied per operation, so cost accumulates along the route.
- **Repacking** handled as its own flow rather than forced into a standard transfer.
- **Cost structure reporting** that shows how a finished unit arrived at its cost.

## Outcome

Production, inventory and accounting run off the same records, and cost structure
is answerable per manufacturing order instead of reconstructed afterwards.
