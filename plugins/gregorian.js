// Calendarul gregorian (proleptic: regulile se aplică și înainte de 1582).
// JD pivot: zi civilă întreagă = JD la 0h UT (x.5). An astronomic: 1 î.Hr. = 0, 2 î.Hr. = -1.
// Algoritm: aritmetică de zile (Howard Hinnant, «civil_from_days»), fără probleme la ani negativi.
export const id = 'gregorian';
export const fields = ['year', 'month', 'day'];

const fl = Math.floor;
const MDAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export function isLeap(y) { return y % 4 === 0 && (y % 100 !== 0 || y % 400 === 0); }
export function monthLength(y, m) { return m === 2 && isLeap(y) ? 29 : MDAYS[m - 1]; }

// zile de la 1970-01-01
export function daysFromCivil(y, m, d) {
  y -= m <= 2 ? 1 : 0;
  const era = fl(y / 400);
  const yoe = y - era * 400;
  const doy = fl((153 * (m + (m > 2 ? -3 : 9)) + 2) / 5) + d - 1;
  const doe = yoe * 365 + fl(yoe / 4) - fl(yoe / 100) + doy;
  return era * 146097 + doe - 719468;
}
export function civilFromDays(z) {
  z += 719468;
  const era = fl(z / 146097);
  const doe = z - era * 146097;
  const yoe = fl((doe - fl(doe / 1460) + fl(doe / 36524) - fl(doe / 146096)) / 365);
  const doy = doe - (365 * yoe + fl(yoe / 4) - fl(yoe / 100));
  const mp = fl((5 * doy + 2) / 153);
  const d = doy - fl((153 * mp + 2) / 5) + 1;
  const m = mp < 10 ? mp + 3 : mp - 9;
  return { year: yoe + era * 400 + (m <= 2 ? 1 : 0), month: m, day: d };
}
export function toJD(year, month, day) { return daysFromCivil(year, month, day) + 2440587.5; }
export function fromJD(jd) { return civilFromDays(fl(jd + 0.5) - 2440588); }
export function monthList(year, L) {
  const out = [];
  for (let m = 1; m <= 12; m++) out.push({ v: m, n: L.month(m) });
  return out;
}
export function format(d, L) { return L.date ? L.date(d.day, L.month(d.month), L.era(d.year)) : d.day + ' ' + L.month(d.month) + ' ' + L.era(d.year); }
export function monthTitle(year, month, leap, L) { return L.mtitle ? L.mtitle(L.month(month), L.era(year)) : L.month(month) + ' ' + L.era(year); }
