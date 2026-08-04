---
kind: build
title: Dynamics AX to Odoo Migration
summary: "Rebuilding a business unit's operations on Odoo 16 after moving off Microsoft Dynamics AX, one workflow at a time."
context: Akasha Wira International
year: "2026"
stack: [Odoo, Python, PostgreSQL, XML-RPC]
visibility: internal
weight: 90
---

## The problem

The unit ran on Microsoft Dynamics AX. Moving to Odoo 16 meant that every workflow
the business depended on had to exist there before anyone could switch, and standard
Odoo covers maybe half of them. The other half were the ones the business actually
argues about: how a credit limit is decided, when an invoice may be reprinted, what
counts as a valid load.

## Approach

Not one migration project, but a running list of workflows rebuilt one at a time,
each shipped and used before the next was started. Eighteen so far, including:

- **Order to cash.** Delivery-driven invoicing on a strict one-delivery-one-invoice basis, sale order validation on processing, and cancellation reasons captured per line.
- **Credit control.** Credit limits generated from a configurable formula master rather than set by hand, with an approval flow above them.
- **Receivables.** AR and AP aging reported per branch, and cheque status monitored from collection through to clearing so an invoice cannot read as paid before the money exists.
- **Warehouse.** Available stock exposed next to on-hand, a multi-line scrap journal, and load matrix validation on purchase orders.
- **Expenses.** Petty cash handled on top of the native expense flow, routed to the right branch account.
- **Documents.** Invoice, delivery and monitoring reports rebuilt to the business templates, with reprints watermarked so the original stays distinguishable.

## Outcome

The unit runs its day-to-day on Odoo rather than AX, and the workflows that were
specific to how this business operates survived the move instead of being flattened
into whatever the software did by default.
