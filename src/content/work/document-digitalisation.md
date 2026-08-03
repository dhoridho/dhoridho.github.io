---
kind: build
title: Distributor Document Digitalisation
summary: "Three paper-and-Word processes turned into one system: partner onboarding, distributor agreements, and internal memos."
context: Akasha Wira International
year: "2025"
stack: [Odoo, Python, PostgreSQL, WeasyPrint, QWeb]
visibility: internal
weight: 100
---

## The problem

Three separate processes still ran on Word documents and mail merge: onboarding a
new distributor, issuing the distributor agreement, and circulating internal
memos. Each one produced files that lived on somebody's machine, with approval
happening over chat and signatures added by hand. Nothing connected the document
to the approval that authorised it.

## Approach

One system covering all three, each keeping its own flow.

- **Partner onboarding.** The master data form became a record with a multi-level approval chain, and the partner is created from the approved form rather than typed in again afterwards.
- **Agreements.** Contracts are generated as PDFs from templates, so the terms come from the record instead of from whichever copy of the document someone started from.
- **Memos.** Generated per recipient and stamped with the approval signatures that authorised them, replacing the mail-merge step entirely.

## Outcome

The document and the approval that produced it are now the same record. Reprinting
is deterministic, and there is no version of a contract circulating that the system
does not know about.
