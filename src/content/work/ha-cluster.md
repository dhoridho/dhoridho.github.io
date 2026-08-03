---
kind: improvement
title: High Availability Cluster
summary: Three bare-metal servers where any single one can die without taking the ERP down. Automatic database failover, floating entry point, shared sessions.
context: Akasha Wira International
year: "2026"
stack: [PostgreSQL, Patroni, etcd, Keepalived, Docker Swarm, Traefik, MinIO]
visibility: public
repo: https://github.com/dhoridho/odoo-ha-stack
weight: 100
---

## The problem

The ERP ran on one machine. Any hardware fault, any kernel update, any disk
filling up meant the whole distribution network stopped until someone fixed it by
hand. Managed database services were not an option, so redundancy had to be built
on hardware we already owned.

## Approach

Three bare-metal servers, with every layer given its own way of surviving a node
loss rather than relying on one clever trick.

- **Database.** Patroni holds an election through etcd and promotes a replica. PgBouncer sits in front, so the application reconnects without knowing anything moved.
- **Entry point.** Keepalived carries a floating IP that follows whichever machine is actually serving, rather than always sitting on the first one.
- **Sessions.** Redis Sentinel across three nodes, so a logged-in user stays logged in through a failover.
- **Filestore.** A three-node MinIO quorum, which keeps serving with one node gone.
- **Application.** Odoo replicas on Docker Swarm behind Traefik, with health checks removing a dead replica from the pool.

## Outcome

Failover was tested by killing machines rather than by reading documentation. Any
single server can go down and the cluster keeps serving. Approved for production
rollout.

The repository is a documentation repo first: fifteen documents covering every
layer, the reasoning behind each choice, and the failure modes, alongside the
tuned configs themselves.
