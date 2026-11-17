// Calendarul iulian (proleptic). A fost calendarul civil al Principatelor Române până la 31 martie 1919 (stil vechi).
// JD pivot: zi civilă întreagă = JD la 0h UT (x.5). An astronomic: 1 î.Hr. = 0.
// Algoritm: Meeus, Astronomical Algorithms, cap. 7, în aritmetică întreagă (valabil și la ani negativi).
export const id = 'julian';
export const fields = ['year', 'month', 'day'];

const fl = Math.floor;
export function isLeap(y) { return y % 4 === 0; }
export function monthLength(y, m) { return m === 2 ? (isLeap(y) ? 29 : 28) : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1]; }

export function toJD(year, month, day) {
  const a = fl((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + fl((153 * m + 2) / 5) + 365 * y + fl(y / 4) - 32083 - 0.5;
}
export function fromJD(jd) {
  const J = fl(jd + 0.5);
  const f = J + 1401;
  const e = 4 * f + 3;
  const g = fl((((e % 1461) + 1461) % 1461) / 4);
  const h = 5 * g + 2;
  const day = fl((h % 153) / 5) + 1;
  const month = ((fl(h / 153) + 2) % 12) + 1;
  const year = fl(e / 1461) - 4716 + fl((14 - month) / 12);
  return { year, month, day };
}
export function monthList(year, L) {
  const out = [];
  for (let m = 1; m <= 12; m++) out.push({ v: m, n: L.month(m) });
  return out;
}
export function format(d, L) { return L.date ? L.date(d.day, L.month(d.month), L.era(d.year)) : d.day + ' ' + L.month(d.month) + ' ' + L.era(d.year); }
export function monthTitle(year, month, leap, L) { return L.mtitle ? L.mtitle(L.month(month), L.era(year)) : L.month(month) + ' ' + L.era(year); }
