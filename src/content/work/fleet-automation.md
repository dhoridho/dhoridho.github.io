---
kind: improvement
title: Fleet Automation
summary: "One command operates every instance across all production servers, replacing work that used to be done by hand on each server."
context: Akasha Wira International
year: "2026"
stack: [Ansible, Docker, PostgreSQL, Prometheus, Grafana]
visibility: public
repo: https://github.com/dhoridho/ansible-odoo-automation
weight: 95
---

## The problem

Over a hundred Odoo instances spread across several servers, each one needing
backups, restarts, module upgrades and health checks. Doing that by hand does not
scale, and doing it inconsistently is worse than not doing it.

## Approach

Ansible playbooks that treat the fleet as one target instead of many.

- **Backups** run nightly, dumping the database and packing the filestore in a format the Odoo web interface can restore directly.
- **Health checks** curl every domain and stay quiet unless something is actually down, so the alert channel keeps meaning something.
- **Upgrades** pull from git, run the module upgrade, and report the real Odoo error lines when one fails rather than a generic failure.
- **Everything runs async and in parallel** rather than one server at a time, which turned a fleet-wide operation from hours into minutes.
- **Alerts are batched** into one message per server instead of one per instance, which is the difference between a useful notification and a flooded channel.

## Outcome

Running in production. Metrics land in Prometheus and Grafana, and failures reach
Discord with enough context to act on without opening a terminal first.
