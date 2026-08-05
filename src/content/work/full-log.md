---
kind: improvement
title: Everything Else
summary: "The work that does not have a card of its own, from a single field on a form to a whole document flow. One line each."
year: 2024 to 2026
stack: []
visibility: internal
weight: -100
---

The cards above are the work worth telling a story about. This is the rest of it.
Each line is a workstream in my notes, with its own scope, decisions, and
commands behind it. No detail here, just the shape of the ground covered.

## Sales and distribution

- Receivables and payables aging report grouped per branch
- Customer credit limits generated daily from a configurable formula
- Credit limit approvals moved onto the shared approval engine
- Delivery-driven invoice automation, one delivery order per invoice
- Business unit dimensions carried from product master into orders and invoices
- Order validation rules applied at the point an order is processed
- Sale order form rebuilt around delivery and invoice addresses
- Cancellation reasons captured per order and per line, with stale order reminders
- Self-pickup orders with their own transporter master data
- Delivery cost calculated from partner address and product unit mapping
- Load matrix capacity validation on sales orders
- Load matrix validation for purchase orders
- Branch requisitions in the central ERP raising purchase orders in the branch system
- Available quantity exposed next to on-hand on product forms
- Multi-line scrap journal for stock written off
- Cheque monitoring from collection to clearing, blocking premature paid status
- Petty cash routed through expense sheets against the branch journal
- Pricelists and their items synced from the central ERP to store systems
- Invoice journal, delivery order and monitoring documents rebuilt to business templates
- First invoice print clean, every reprint marked as a copy
- Claim document receipt export driven from a read-only view
- Invoice line export to CSV by month range or full history

## Sales force

- Outlet visit surveys with a master question bank and per-visit answers
- Points awarded per visit activity as a gamification layer
- Flat replica and daily aggregates behind the visit dashboard
- Realtime visit dashboard brought into the branch system
- Visit dashboard logic migrated to the store system
- Dashboard writes moved to async processing through middleware

## Claims, agreements, documents

- Multi-claim memos claimable by different distributors and regions
- Claim notification and redirect widget behind single sign-on
- Document send flow reworked for agreement settlement
- Distributor agreements generated as PDF, replacing Word documents
- Distributor onboarding form with multi-level approval
- Memos generated per recipient with approval signatures, replacing mail merge
- Customer money flow: deposits, bank mutation grouping, bulk receipts

## Manufacturing

- Multi-level bills of material, work order types and quality checkpoints
- Bill of material structure and cost rollup report
- Cost structure report backported from a later Odoo edition
- Barcode scanning for material picking and finished goods registration
- Expected against actual waste on bills of material, with quality classification
- Work orders with visual instructions and checklists

## Data integrity, integrations, alerts

- Staging sync hardened with validation and alerting
- Every data export raising an alert with who exported what
- Generic on/off switch table and email parameter modules, reused across projects

## Infrastructure

- Central ERP containerised
- Store system containerised
- VPN client containerised with GUI forwarding
- Prometheus and Grafana monitoring across the distribution instances
