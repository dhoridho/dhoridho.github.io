---
kind: build
title: Dynamics AX to Odoo Migration
summary: Moved a business unit off Microsoft Dynamics AX onto Odoo 16, rebuilding its order, invoicing, inventory, and reporting flows.
context: Akasha Wira International
year: "2026"
stack: [Odoo, Python, PostgreSQL, XML-RPC]
visibility: internal
weight: 90
---

## The problem

A business unit ran on Microsoft Dynamics AX while the rest of the group had moved
to Odoo. Two ERPs meant two sources of truth, reconciliation by hand, and reporting
that had to be stitched together before anyone could read it.

## Approach

Rebuild the unit's operational flows on Odoo 16 rather than attempt a
field-for-field copy of AX.

- **Order to invoice** rebuilt against Odoo's model, keeping the business rules and dropping the workarounds that existed only because of AX.
- **Inventory and warehouse movements** remapped, including the master data that did not have a direct equivalent.
- **Reporting** rebuilt on the new model so the numbers reconcile with the rest of the group.
- **Integration** kept alive during the transition, so both systems could run side by side rather than requiring a single cutover.

## Outcome

The unit reports on the same basis as everything else in the group, and there is
one ERP to maintain instead of two.
