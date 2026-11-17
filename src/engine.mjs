// CALENDARIUM · motorul aplicației (fără DOM). Primește registrul de pluginuri: {id: {toJD, fromJD, format, fields, ...}}.
// Pivotul între calendare este ziua iuliană (JD); ziua civilă întreagă = JD la 0h UT (x.5), JDN = floor(JD + 0.5).

export const ORDER = ['gregorian', 'julian', 'revised-julian', 'hebrew', 'hijri', 'persian', 'coptic', 'ethiopian', 'chinese', 'maya', 'mars'];
export const GROUPS = [
  ['g_civil', ['gregorian', 'julian', 'revised-julian']],
  ['g_religious', ['hebrew', 'hijri', 'persian', 'coptic', 'ethiopian']],
  ['g_lunisolar', ['chinese']],
  ['g_other', ['maya', 'mars']]
];
export const JD_UNIX_EPOCH = 2440587.5;
// Domeniul de lucru al aplicației (≈ anii −13000…+22000): în afara lui, intrările se resping, nu se calculează.
export const JD_MIN = -1000000;
export const JD_MAX = 10000000;
// o dată este validă dacă toate câmpurile numerice sunt finite (pluginurile întorc NaN în afara intervalului lor)
export function isValidDate(d) {
  if (!d || typeof d !== 'object') return false;
  const keys = Object.keys(d);
  for (let i = 0; i < keys.length; i++) { const v = d[keys[i]]; if (v === null || (typeof v === 'number' && !isFinite(v))) return false; }
  return keys.length > 0;
}

export function jdnOf(jd) { return Math.floor(jd + 0.5); }
export function weekdayOf(jdn) { return (((jdn + 1) % 7) + 7) % 7; }          // 0 = duminică ... 6 = sâmbătă
export function mjdOf(jd) { return jd - 2400000.5; }

// convertește valorile câmpurilor unui calendar în JD; întoarce {ok, jd} sau {ok:false}
export function toJDChecked(reg, id, values) {
  const p = reg[id];
  if (!p) return { ok: false, why: 'unknown' };
  for (let i = 0; i < values.length; i++) if (typeof values[i] === 'number' && !isFinite(values[i])) return { ok: false, why: 'nan' };
  const jd = p.toJD.apply(null, values);
  if (typeof jd !== 'number' || !isFinite(jd) || jd < JD_MIN || jd > JD_MAX) return { ok: false, why: 'range' };
  // dus-întors: respinge date inexistente (30 februarie, luna 13 într-un an obișnuit ...)
  const back = p.fromJD(jd);
  const want = p.fields.map(function (f, i) { return [f, values[i]]; });
  for (let i = 0; i < want.length; i++) {
    const f = want[i][0], v = want[i][1];
    if (f === 'leap') { if (!!back.leap !== !!v) return { ok: false, why: 'leap' }; continue; }
    if (f === 'msd') continue;
    if (back[f] !== v) return { ok: false, why: 'nodate' };
  }
  return { ok: true, jd };
}

// toate calendarele pentru o zi; pluginurile care nu acoperă data întorc null
export function convertAll(reg, jd) {
  const out = {};
  for (let i = 0; i < ORDER.length; i++) {
    const id = ORDER[i];
    if (!reg[id]) continue;
    let d = null;
    try { d = reg[id].fromJD(jd); } catch (e) { d = null; }
    out[id] = isValidDate(d) ? d : null;
  }
  return out;
}

// numărul zilei în an, săptămâna ISO, zile Unix
export function dayOfYear(reg, jd) {
  const g = reg.gregorian.fromJD(jd);
  return Math.round(jd - reg.gregorian.toJD(g.year, 1, 1)) + 1;
}
export function isoWeek(reg, jd) {
  const g = reg.gregorian;
  const jdn = jdnOf(jd);
  const wd = (weekdayOf(jdn) + 6) % 7;              // luni = 0
  const thursday = jdn - wd + 3;                    // joia săptămânii decide anul ISO
  const ty = g.fromJD(thursday - 0.5).year;
  const jan1 = jdnOf(g.toJD(ty, 1, 1));
  return { year: ty, week: Math.floor((thursday - jan1) / 7) + 1 };
}
export function unixDays(jd) { return Math.round(jd - JD_UNIX_EPOCH); }

/* ---------- Paștele (computus) ---------- */
export function easterGregorian(y) {          // data în calendarul gregorian (Meeus/Jones/Butcher)
  const a = y % 19, b = Math.floor(y / 100), c = y % 100, d = Math.floor(b / 4), e = b % 4;
  const f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30, i = Math.floor(c / 4), k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451);
  const t = h + l - 7 * m + 114;
  return { year: y, month: Math.floor(t / 31), day: (t % 31) + 1 };
}
export function easterJulianDate(y) {         // data în calendarul iulian (Paștele ortodox, computul alexandrin)
  const a = y % 4, b = y % 7, c = y % 19, d = (19 * c + 15) % 30, e = (2 * a + 4 * b - d + 34) % 7;
  const t = d + e + 114;
  return { year: y, month: Math.floor(t / 31), day: (t % 31) + 1 };
}
export function orthodoxEasterGregorian(reg, y) {
  const j = easterJulianDate(y);
  return reg.gregorian.fromJD(reg.julian.toJD(j.year, j.month, j.day));
}

/* ---------- date istorice românești ---------- */
// În Vechiul Regat ultima zi civilă în stil vechi a fost 31 martie 1919 (= 13 aprilie 1919 gregorian); ziua următoare s-a numit 14 aprilie 1919.
export const RO_EVENTS = [
  // cheia de text, data (în calendarul indicat), dacă data a fost verificată cu o sursă primară
  { key: 'ro_ev_1582', y: 1582, m: 10, d: 15, cal: 'gregorian', verified: true },
  { key: 'ro_ev_1919', y: 1919, m: 4, d: 14, cal: 'gregorian', verified: true },
  { key: 'ro_ev_1924', y: 1924, m: 10, d: 14, cal: 'gregorian', verified: false }
];
// diferența dintre etichetele iuliană și gregoriană pentru aceeași zi (zile)
export function julianGregorianGap(reg, jd) {
  const j = reg.julian.fromJD(jd), g = reg.gregorian.fromJD(jd);
  const jj = reg.gregorian.toJD(j.year, j.month, j.day);   // eticheta iuliană citită ca gregoriană
  return Math.round(jj - reg.gregorian.toJD(g.year, g.month, g.day)) * -1;
}
export function romanianStyle(reg, jd) {
  const oldDate = reg.julian.fromJD(jd), newDate = reg.gregorian.fromJD(jd);
  const civilIsOld = jd < reg.gregorian.toJD(1919, 4, 14);   // în Vechiul Regat, datele civile dinainte de 14 aprilie 1919 sunt în stil vechi
  return { civilIsOld, oldDate, newDate, gap: julianGregorianGap(reg, jd), revised: reg['revised-julian'] ? reg['revised-julian'].fromJD(jd) : null };
}

/* ---------- grila unei luni ---------- */
// întoarce zilele lunii (year, month) din calendarul id, cu eticheta zilei din calendarul secundar
export function monthGrid(reg, id, year, month, leap, otherId) {
  const p = reg[id];
  if (!p || !isFinite(year) || !isFinite(month)) return null;
  const first = p.toJD(year, month, 1, leap);
  if (!isFinite(first)) return null;
  const days = [];
  for (let k = 0; k < 40; k++) {
    const jd = first + k;
    const d = p.fromJD(jd);
    if (d.year !== year || d.month !== month || !!d.leap !== !!leap && id === 'chinese') break;
    if (k > 0 && d.day === 1) break;
    const o0 = otherId && reg[otherId] ? reg[otherId].fromJD(jd) : null;
    const o = isValidDate(o0) ? o0 : null;
    days.push({ jd, day: d.day, other: o, wd: weekdayOf(jdnOf(jd)) });
  }
  if (!days.length) return null;
  return { first, days, startOffset: ((weekdayOf(jdnOf(first)) + 6) % 7) };
}
export function parseLongCount(text) {
  const parts = String(text).trim().split(/[.\s,]+/).filter(Boolean).map(Number);
  if (parts.length < 1 || parts.length > 5 || parts.some(function (n) { return !isFinite(n) || Math.floor(n) !== n; })) return null;
  while (parts.length < 5) parts.unshift(0);
  return parts;
}
