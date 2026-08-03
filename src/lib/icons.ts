import * as si from 'simple-icons';

// Maps a stack label to a simple-icons slug. Anything absent renders as a plain
// badge, which is correct: PgBouncer, Patroni and "query tuning" have no logo,
// and inventing one would be worse than showing none.
const SLUGS: Record<string, string> = {
  python: 'Python',
  postgresql: 'Postgresql',
  redis: 'Redis',
  docker: 'Docker',
  'docker swarm': 'Docker',
  ansible: 'Ansible',
  linux: 'Linux',
  prometheus: 'Prometheus',
  grafana: 'Grafana',
  loki: 'Grafana',
  alertmanager: 'Prometheus',
  django: 'Django',
  odoo: 'Odoo',
  go: 'Go',
  sqlite: 'Sqlite',
  traefik: 'Traefikproxy',
  git: 'Git',
  discord: 'Discord',
  minio: 'Minio',
  etcd: 'Etcd',
  patroni: 'Postgresql',
  pgbouncer: 'Postgresql',
  github: 'Github',
  obsidian: 'Obsidian',
  'claude code': 'Claude',
  claude: 'Claude',
  markdown: 'Markdown',
};

export interface Icon {
  path: string;
  title: string;
  hex: string;
}

export function iconFor(label: string): Icon | null {
  const slug = SLUGS[label.toLowerCase()];
  if (!slug) return null;

  const icon = (si as Record<string, unknown>)[`si${slug}`] as
    | { path: string; title: string; hex: string }
    | undefined;

  if (!icon) return null;
  return { path: icon.path, title: icon.title, hex: lift(icon.hex) };
}

// Some brand colours are near-black and vanish on a dark surface. Lift only those,
// leaving every other brand colour exactly as published.
function lift(hex: string): string {
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
  if (luminance > 0.32) return `#${hex}`;

  const scale = 0.32 / Math.max(luminance, 0.04);
  const clamp = (v: number) => Math.min(255, Math.round(v * scale));
  return `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
}
