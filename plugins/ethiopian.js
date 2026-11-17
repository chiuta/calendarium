// Calendarul etiopian (Ge'ez): aceeași structură ca cel copt, cu epoca la 29 august 8 d.Hr. iulian (Amete Mihret).
// 12 luni de 30 de zile + Pagume (5 sau 6 zile); an bisect când anul mod 4 = 3.
export const id = 'ethiopian';
export const fields = ['year', 'month', 'day'];

const fl = Math.floor;
const EPOCH = 1724220.5;
export const NAMES = ['Meskerem', 'Tikimt', 'Hidar', 'Tahsas', 'Tir', 'Yekatit', 'Megabit', 'Miazia', 'Genbot', 'Sene', 'Hamle', 'Nehase', 'Pagume'];
export function isLeap(y) { return ((y % 4) + 4) % 4 === 3; }
export function monthLength(y, m) { return m < 13 ? 30 : (isLeap(y) ? 6 : 5); }
export function toJD(year, month, day) { return EPOCH - 1 + 365 * (year - 1) + fl(year / 4) + 30 * (month - 1) + day; }
export function fromJD(jd) {
  const j = fl(jd) + 0.5;
  const year = fl((4 * (j - EPOCH) + 1463) / 1461);
  const month = fl((j - toJD(year, 1, 1)) / 30) + 1;
  const day = j + 1 - toJD(year, month, 1);
  return { year, month, day };
}
export function monthList() { return NAMES.map((n, i) => ({ v: i + 1, n })); }
export function format(d) { return d.day + ' ' + NAMES[d.month - 1] + ' ' + d.year + ' E.C.'; }
export function monthTitle(year, month) { return NAMES[month - 1] + ' ' + year + ' E.C.'; }
