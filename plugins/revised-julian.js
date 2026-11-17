// Calendarul iulian revizuit (Milanković, 1923): folosit de Biserica Ortodoxă Română pentru sărbătorile fixe din 1924.
// Anii seculari sunt bisecți doar dacă împărțiți la 900 dau restul 200 sau 600. Coincide cu cel gregorian între
// 1 martie 1900 și 28 februarie 2800. Ancora: 1 ianuarie 2000 are aceeași zi ca în calendarul gregorian.
export const id = 'revised-julian';
export const fields = ['year', 'month', 'day'];

const fl = Math.floor;
const MD = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export function isLeap(y) { return y % 4 === 0 && (y % 100 !== 0 || y % 900 === 200 || y % 900 === 600); }
export function monthLength(y, m) { return m === 2 && isLeap(y) ? 29 : MD[m - 1]; }
// zile scurse înainte de 1 ianuarie al anului y (numărând de la 1 ianuarie, anul 1)
function daysBeforeYear(y) {
  const p = y - 1;
  const c = fl(p / 100);
  return 365 * p + fl(p / 4) - c + fl((2 * c + 6) / 9);
}
function rawDays(y, m, d) {
  let n = daysBeforeYear(y) + d - 1;
  for (let i = 1; i < m; i++) n += monthLength(y, i);
  return n;
}
const ANCHOR = 2451545 - rawDays(2000, 1, 1); // JDN = rawDays + ANCHOR

export function toJD(year, month, day) { return rawDays(year, month, day) + ANCHOR - 0.5; }
export function fromJD(jd) {
  const n = fl(jd + 0.5) - ANCHOR;
  let y = fl(n / 365.2422) + 1;
  while (daysBeforeYear(y + 1) <= n) y++;
  while (daysBeforeYear(y) > n) y--;
  let r = n - daysBeforeYear(y);
  let m = 1;
  while (r >= monthLength(y, m)) { r -= monthLength(y, m); m++; }
  return { year: y, month: m, day: r + 1 };
}
export function monthList(year, L) {
  const out = [];
  for (let m = 1; m <= 12; m++) out.push({ v: m, n: L.month(m) });
  return out;
}
export function format(d, L) { return L.date ? L.date(d.day, L.month(d.month), L.era(d.year)) : d.day + ' ' + L.month(d.month) + ' ' + L.era(d.year); }
export function monthTitle(year, month, leap, L) { return L.mtitle ? L.mtitle(L.month(month), L.era(year)) : L.month(month) + ' ' + L.era(year); }
