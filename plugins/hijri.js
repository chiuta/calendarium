// Calendarul hijri TABELAR (civil, epoca de vineri 16 iulie 622 iulian). Ciclu de 30 de ani cu 11 ani bisecți
// (2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29). NU este calendarul observat (Umm al-Qura sau vederea lunii noi):
// poate diferi cu 1-2 zile. Algoritm: Calendrical Calculations (Reingold și Dershowitz); aceeași formă ca la Fourmilab.
export const id = 'hijri';
export const fields = ['year', 'month', 'day'];

const fl = Math.floor;
const EPOCH = 1948439.5; // JD la 0h, 1 Muharram 1 AH civil
export const NAMES = ['Muharram', 'Safar', "Rabi' al-awwal", "Rabi' al-thani", 'Jumada al-awwal', 'Jumada al-thani', 'Rajab', "Sha'ban", 'Ramadan', 'Shawwal', "Dhu al-Qi'dah", 'Dhu al-Hijjah'];
export function isLeap(y) { return (((11 * y) + 14) % 30 + 30) % 30 < 11; }
export function monthLength(y, m) { return m === 12 ? (isLeap(y) ? 30 : 29) : (m % 2 === 1 ? 30 : 29); }
export function toJD(year, month, day) {
  if (!(year >= 1)) return NaN;   // calendarul tabelar este definit de la 1 Muharram 1 AH
  return day + Math.ceil(29.5 * (month - 1)) + (year - 1) * 354 + fl((3 + 11 * year) / 30) + EPOCH - 1;
}
export function fromJD(jd) {
  const j = fl(jd) + 0.5;
  if (!(j >= EPOCH)) return { year: NaN, month: NaN, day: NaN };
  const year = fl((30 * (j - EPOCH) + 10646) / 10631);
  const month = Math.min(12, Math.ceil((j - (29 + toJD(year, 1, 1))) / 29.5) + 1);
  const day = j - toJD(year, month, 1) + 1;
  return { year, month, day };
}
export function monthList() { return NAMES.map((n, i) => ({ v: i + 1, n })); }
export function format(d) { return d.day + ' ' + NAMES[d.month - 1] + ' ' + d.year + ' AH'; }
export function monthTitle(year, month) { return NAMES[month - 1] + ' ' + year + ' AH'; }
