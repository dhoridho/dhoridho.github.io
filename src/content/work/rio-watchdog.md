---
kind: improvement
title: Integrity Watchdog
summary: Checks out of band whether ERP records are actually correct, independently of whatever system wrote them, and repairs a known class of corruption.
context: Akasha Wira International
year: "2026"
stack: [Go, PostgreSQL, SQLite]
visibility: public
repo: https://github.com/dhoridho/rio
weight: 90
---

## The problem

An ERP enforces most of its rules in application code. When another system writes
to the same tables directly, those rules never run: the check exists, it just does
not fire. The result is records that look fine to whoever wrote them and wrong to
everyone downstream.

## Approach

A watchdog that verifies the result instead of trusting the writer, running
outside the application entirely.

- **Push to register, poll to verify.** The ERP notifies RIO when a record is created. RIO holds that id on a short watch list and reads it back a few minutes later, so it sees the row as it ended up rather than as it was intended.
- **One batched read** covers every watched id, so the cost does not grow with the size of the list.
- **Alerts are coalesced** into one Discord and one email per tick, not one per anomaly.
- **Known corruption is repaired automatically**, and the rest is reported.
- **A dead-man switch** sends a heartbeat to an external receiver while healthy, because a dead process cannot alert anyone that it died.

## Outcome

A single static Go binary carrying its own scheduler, web dashboard, and state
store. It also watches for scheduled jobs that quietly stop running, which is a
failure with no error message and no crash, only work silently piling up.
