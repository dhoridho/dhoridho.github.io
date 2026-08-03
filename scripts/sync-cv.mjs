// Copies the built CV into public/ before every build, so the download link can
// never serve a stale PDF.
//
// The CV lives in a separate repository, so this has to be a no-op when that
// repository is absent. On CI only the committed copy in public/ exists, and
// failing the build over a missing source would be wrong.

import { copyFileSync, existsSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, '../../cv/cv.pdf');
const target = resolve(here, '../public/ridho-kurnia-putra-cv.pdf');

if (!existsSync(source)) {
  console.log('sync-cv: no CV source alongside this repo, keeping the committed copy');
  process.exit(0);
}

const sourceTime = statSync(source).mtimeMs;
const targetTime = existsSync(target) ? statSync(target).mtimeMs : 0;

if (sourceTime <= targetTime) {
  console.log('sync-cv: public copy is current');
  process.exit(0);
}

copyFileSync(source, target);
console.log(`sync-cv: copied CV built ${new Date(sourceTime).toISOString().slice(0, 10)}`);
