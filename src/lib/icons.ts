import * as si from 'simple-icons';

// Maps a stack label to a simple-icons slug. Anything absent renders as a plain
// badge, which is correct: PgBouncer, Patroni and "query tuning" have no logo,
// and inventing one would be worse than showing none.
const SLUGS: Record<string, string> = {
  python: 'Python',
  postgresql: 'Postgresql',
  mysql: 'Mysql',
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

// SQL is a language, not a product, so simple-icons has nothing for it. A generic
// database glyph is honest here in a way that borrowing a vendor logo would not be.
const LOCAL: Record<string, Icon> = {
  sql: {
    title: 'SQL',
    hex: '#9aa0a6',
    path: 'M12 2c4.42 0 8 1.34 8 3v14c0 1.66-3.58 3-8 3s-8-1.34-8-3V5c0-1.66 3.58-3 8-3zm0 2c-3.87 0-6 1.01-6 1s2.13 1 6 1 6-1.01 6-1-2.13-1-6-1zm6 4.13C16.55 8.68 14.44 9 12 9s-4.55-.32-6-.87v3.24c1.45.55 3.56.87 6 .87s4.55-.32 6-.87V8.13zm0 6C16.55 14.68 14.44 15 12 15s-4.55-.32-6-.87v3.24c.6.4 2.7 1.13 6 1.13s5.4-.73 6-1.13v-3.24z',
  },
};

export interface Icon {
  path: string;
  title: string;
  hex: string;
}

export function iconFor(label: string): Icon | null {
  const key = label.toLowerCase();
  if (LOCAL[key]) return LOCAL[key];

  const slug = SLUGS[key];
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
