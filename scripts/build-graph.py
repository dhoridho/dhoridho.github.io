#!/usr/bin/env python3
"""Snapshot the Obsidian workstream graph into static data.

Run from anywhere:  python3 scripts/build-graph.py

Reads the vault, keeps only workstream-to-workstream links, lays the result out
with a deterministic force simulation, and writes src/data/graph.json holding
nothing but coordinates and degrees. No workstream names reach the output, so the
published page cannot leak internal project names.
"""

import json
import math
import random
import re
from pathlib import Path

VAULT = Path("/home/rkp/Obsidian/Obsidian-Vault/06_DevProjects/Projects")
OUT = Path(__file__).resolve().parent.parent / "src" / "data" / "graph.json"

ITERATIONS = 500
ATTRACTION = 0.08
SEED = 7


def collect():
    """Every note is a node, exactly as Obsidian draws it.

    Node identity is the path, not the filename, so the `current-state` note of one
    workstream is a different node from the next one's. Collapsing them by filename
    produces a handful of fake hubs and destroys the cluster shape.
    """
    files = sorted(VAULT.rglob("*.md"))
    by_path = {f.relative_to(VAULT).with_suffix("").as_posix(): f for f in files}

    # Index by trailing path segments, so [[overview]], [[Projects/x/overview]] and
    # [[x/overview]] can all resolve to the same note.
    suffixes = {}
    for key in by_path:
        parts = key.split("/")
        for i in range(len(parts)):
            suffixes.setdefault("/".join(parts[i:]), []).append(key)

    def resolve(link, source):
        target = link.strip().split("|")[0].split("#")[0].strip()
        target = target.removeprefix("Projects/")
        if target in by_path:
            return target
        # Prefer a match inside the same folder, which is how [[overview]] is meant.
        folder = source.rsplit("/", 1)[0] if "/" in source else ""
        local = f"{folder}/{target}" if folder else target
        if local in by_path:
            return local
        found = suffixes.get(target)
        if found and len(found) == 1:
            return found[0]
        if found:
            same = [f for f in found if f.startswith(folder + "/")] if folder else []
            return same[0] if same else None
        return None

    edges = set()
    for key, path in by_path.items():
        text = path.read_text(errors="ignore")
        for link in re.findall(r"\[\[([^\]]+)", text):
            target = resolve(link, key)
            if target and target != key:
                edges.add(tuple(sorted((key, target))))

    return sorted(by_path), sorted(edges)


def layout(names, edges):
    """Fruchterman-Reingold over the linked nodes only.

    Unlinked workstreams have no forces acting on them, so including them in the
    simulation just pushes the real clusters apart. They go on an outer ring
    instead, which is also how Obsidian draws them.
    """
    random.seed(SEED)
    index = {name: i for i, name in enumerate(names)}
    n = len(names)

    linked = sorted({name for edge in edges for name in edge})
    loose = [name for name in names if name not in set(linked)]

    pos = [[0.0, 0.0] for _ in range(n)]
    for name in linked:
        pos[index[name]] = [random.uniform(-0.5, 0.5), random.uniform(-0.5, 0.5)]

    links = [(index[a], index[b]) for a, b in edges]
    active = [index[name] for name in linked]

    # Leaves get a longer spring than hub-to-hub links. Without this, 175 degree-one
    # notes collapse onto their parents and the whole graph renders as one ball
    # instead of the branches the vault actually has.
    degree = [0] * n
    for a, b in links:
        degree[a] += 1
        degree[b] += 1
    slack = [1.0 + 2.6 / max(min(degree[a], degree[b]), 1) for a, b in links]

    k = math.sqrt(1.0 / max(len(active), 1)) * 6.0
    temperature = 0.12

    for step in range(ITERATIONS):
        disp = [[0.0, 0.0] for _ in range(n)]

        # Repulsion between every linked pair.
        for ai, i in enumerate(active):
            for j in active[ai + 1 :]:
                dx = pos[i][0] - pos[j][0]
                dy = pos[i][1] - pos[j][1]
                dist = max(math.hypot(dx, dy), 1e-4)
                force = (k * k) / dist
                ux, uy = dx / dist, dy / dist
                disp[i][0] += ux * force
                disp[i][1] += uy * force
                disp[j][0] -= ux * force
                disp[j][1] -= uy * force

        # Attraction along edges.
        for (a, b), give in zip(links, slack):
            dx = pos[a][0] - pos[b][0]
            dy = pos[a][1] - pos[b][1]
            dist = max(math.hypot(dx, dy), 1e-4)
            force = ((dist * dist) / (k * give)) * ATTRACTION
            ux, uy = dx / dist, dy / dist
            disp[a][0] -= ux * force
            disp[a][1] -= uy * force
            disp[b][0] += ux * force
            disp[b][1] += uy * force

        # Weak pull to the middle, so clusters stay on the canvas.
        for i in active:
            disp[i][0] -= pos[i][0] * 0.015
            disp[i][1] -= pos[i][1] * 0.015

        for i in active:
            d = max(math.hypot(*disp[i]), 1e-4)
            pos[i][0] += (disp[i][0] / d) * min(d, temperature)
            pos[i][1] += (disp[i][1] / d) * min(d, temperature)

        temperature *= 0.995

    # Ring the unlinked ones outside whatever radius the clusters settled at.
    spread = max((math.hypot(*pos[i]) for i in active), default=1.0)
    ring = spread * 1.18
    for slot, name in enumerate(loose):
        angle = (slot / max(len(loose), 1)) * math.tau
        pos[index[name]] = [math.cos(angle) * ring, math.sin(angle) * ring]

    return pos, index


def normalise(pos):
    xs = [p[0] for p in pos]
    ys = [p[1] for p in pos]
    minx, maxx = min(xs), max(xs)
    miny, maxy = min(ys), max(ys)
    spanx = max(maxx - minx, 1e-6)
    spany = max(maxy - miny, 1e-6)
    span = max(spanx, spany)

    # Centre inside a square, 0 to 1000, with a margin.
    offx = (span - spanx) / 2
    offy = (span - spany) / 2
    return [
        [
            round(((p[0] - minx + offx) / span) * 960 + 20, 1),
            round(((p[1] - miny + offy) / span) * 960 + 20, 1),
        ]
        for p in pos
    ]


def main():
    names, edges = collect()
    pos, index = layout(names, edges)
    coords = normalise(pos)

    degree = {name: 0 for name in names}
    for a, b in edges:
        degree[a] += 1
        degree[b] += 1

    data = {
        "counts": {
            "workstreams": len(names),
            "links": len(edges),
            "connected": len({n for e in edges for n in e}),
        },
        # Coordinates and degree only. Names stay in the vault.
        "nodes": [
            {"x": coords[index[name]][0], "y": coords[index[name]][1], "d": degree[name]}
            for name in names
        ],
        "edges": [[index[a], index[b]] for a, b in edges],
    }

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text(json.dumps(data, separators=(",", ":")))
    print(f"{OUT.name}: {data['counts']['workstreams']} nodes, {data['counts']['links']} links")


if __name__ == "__main__":
    main()
