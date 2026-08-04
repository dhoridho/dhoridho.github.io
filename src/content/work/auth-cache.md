---
kind: improvement
title: API Authentication Cache
summary: "An ORM-level Redis layer in front of the auth table, cutting the repeated lookups every external API call was making."
context: Akasha Wira International
year: "2025"
stack: [Odoo, Redis, PostgreSQL]
visibility: internal
weight: 70
---

## The problem

Every external API call authenticated first, and every authentication hit the same
small table through the ORM. The table was tiny and the answer barely changed, but
the lookup ran on every single request, so the database spent a meaningful share of
its time answering the same question.

## Approach

A caching layer at the ORM level rather than in each caller.

- **Intercepts `search` and `read`** on the auth model, so nothing calling it needed to change.
- **Redis holds the result**, keyed so a credential change invalidates cleanly.
- **Failure falls through to the database** rather than failing the request, since an unavailable cache should slow things down, not break them.

## Outcome

Repeated auth lookups stopped reaching PostgreSQL. The work happens once and is
answered from memory afterwards.
