// Calendarul ebraic (aritmetic, regula fixă a lui Hillel II). Anul începe la 1 Tishrei; luna Nisan are numărul 1.
// În anii bisecți (7 din 19) există Adar I (luna 12) și Adar II (luna 13). Algoritm: Calendrical Calculations
// (Reingold și Dershowitz): amânările dehiyyot, lungimea lui Cheshvan și Kislev după lungimea anului.
export const id = 'hebrew';
export const fields = ['year', 'month', 'day'];

const fl = Math.floor;
const mod = (a, b) => a - b * fl(a / b);
const RD_EPOCH = -1373427;       // 1 Tishrei 1 AM (luni, 7 octombrie 3761 î.Hr. iulian), în numărul de zi Rata Die
const RD_TO_JDN = 1721425;       // JDN = RD + 1721425
export const NAMES = ['Nisan', 'Iyar', 'Sivan', 'Tammuz', 'Av', 'Elul', 'Tishrei', 'Cheshvan', 'Kislev', 'Tevet', 'Shevat', 'Adar', 'Adar II'];

export function isLeap(y) { return mod(7 * y + 1, 19) < 7; }
function elapsedDays(y) {
  const months = fl((235 * y - 234) / 19);
  const parts = 12084 + 13753 * months;
  const days = 29 * months + fl(parts / 25920);
  return mod(3 * (days + 1), 7) < 3 ? days + 1 : days;
}
function correction(y) {
  const n0 = elapsedDays(y - 1), n1 = elapsedDays(y), n2 = elapsedDays(y + 1);
  if (n2 - n1 === 356) return 2;
  if (n1 - n0 === 382) return 1;
  return 0;
}
export function newYearRD(y) { return RD_EPOCH + elapsedDays(y) + correction(y); }
export function yearLength(y) { return newYearRD(y + 1) - newYearRD(y); }
export function monthLength(y, m) {
  if (m === 2 || m === 4 || m === 6 || m === 10 || m === 13) return 29;
  if (m === 12 && !isLeap(y)) return 29;
  if (m === 8 && mod(yearLength(y), 10) !== 5) return 29;   // Cheshvan scurt
  if (m === 9 && mod(yearLength(y), 10) === 3) return 29;   // Kislev scurt
  return 30;
}
const lastMonth = (y) => (isLeap(y) ? 13 : 12);
function toRD(y, m, d) {
  let n = newYearRD(y) + d - 1;
  if (m < 7) {
    for (let k = 7; k <= lastMonth(y); k++) n += monthLength(y, k);
    for (let k = 1; k < m; k++) n += monthLength(y, k);
  } else {
    for (let k = 7; k < m; k++) n += monthLength(y, k);
  }
  return n;
}
function fromRD(rd) {
  let y = fl((rd - RD_EPOCH) / (35975351 / 98496)) + 1 - 1;
  while (newYearRD(y + 1) <= rd) y++;
  while (newYearRD(y) > rd) y--;
  let m = rd < toRD(y, 1, 1) ? 7 : 1;
  while (rd > toRD(y, m, monthLength(y, m))) m++;
  return { year: y, month: m, day: rd - toRD(y, m, 1) + 1, leap: isLeap(y) };
}
export function toJD(year, month, day) {
  if (year < 1 || month < 1 || month > lastMonth(year) || day < 1 || day > monthLength(year, month)) return NaN;
  return toRD(year, month, day) + RD_TO_JDN - 0.5;
}
export function fromJD(jd) {
  const rd = fl(jd + 0.5) - RD_TO_JDN;
  if (!(rd >= newYearRD(1))) return { year: NaN, month: NaN, day: NaN, leap: false };   // calendarul aritmetic începe cu anul 1
  return fromRD(rd);
}
export function monthName(y, m) { return isLeap(y) ? (m === 12 ? 'Adar I' : NAMES[m - 1]) : NAMES[m - 1]; }
export function monthList(year) {
  const order = isLeap(year) ? [7, 8, 9, 10, 11, 12, 13, 1, 2, 3, 4, 5, 6] : [7, 8, 9, 10, 11, 12, 1, 2, 3, 4, 5, 6];
  return order.map((v) => ({ v, n: monthName(year, v) }));
}
export function format(d) { return d.day + ' ' + monthName(d.year, d.month) + ' ' + d.year + ' AM'; }
export function monthTitle(year, month) { return monthName(year, month) + ' ' + year + ' AM'; }
