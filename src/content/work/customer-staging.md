---
kind: improvement
title: Customer Staging Rework
summary: Rebuilt the partner and staging models behind customer sync, adding guards against malformed external references and alerts when a record fails to reach the systems downstream.
context: Akasha Wira International
year: "2026"
stack: [Odoo, PostgreSQL, Python]
visibility: internal
weight: 55
chart:
  caption: Staging records created per month, one outbound request each. The rework landed in January and February, and the duplicate records it removed took monthly volume down by around 86%.
  points:
    - { label: Dec, value: 335307 }
    - { label: Jan, value: 233010 }
    - { label: Feb, value: 45962 }
    - { label: Mar, value: 48739 }
---

## The problem

Customer records are written by more than one system, and the path that carried
them outward had grown organically. The same customer was staged again and again,
records could be sent with references that pointed nowhere useful, and a failed
send was silent, so a record could simply never arrive with nobody the wiser.

## Approach

Rebuild the models on both sides of that path.

- **The partner model was rewritten**, with the previous version kept alongside during the change rather than replaced blind.
- **Salesperson lookup was fixed** to resolve employees whose records had been deactivated.
- **The staging pipeline was split** into deciding whether a change is worth staging, preparing the payload, and inserting it, with a separate path for updates.
- **Duplicate staging was cut off at the source**: a write that had already been staged no longer runs the whole path again.
- **Failures now alert** over Discord and email instead of passing silently.

## Outcome

**Monthly volume fell by around 86%**, from 335,000 staging records in December to
46,000 by February. Each record is one outbound request, so most of that traffic
was the same customer being staged repeatedly: a write that had already been
staged triggering the whole path again.

The first fix went in on 8 January and stopped the duplicate creation. The rest
followed through February, and volume has stayed flat since.

Records that used to fail quietly now either arrive or announce that they did not.
The same records are checked independently from outside by the integrity watchdog,
listed separately here.
