// Încarcă toate pluginurile din plugins/ într-un registru {id: modul}.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'plugins');
export const reg = {};
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.js')).sort()) {
  reg[f.replace(/\.js$/, '')] = await import(pathToFileURL(path.join(dir, f)).href);
}
export const iso = (d) => d.year + '-' + String(d.month).padStart(2, '0') + '-' + String(d.day).padStart(2, '0');
// data gregoriană (an, lună, zi) ca ISO pentru un JD
export const gIso = (jd) => iso(reg.gregorian.fromJD(jd));
export const gJD = (y, m, d) => reg.gregorian.toJD(y, m, d);
