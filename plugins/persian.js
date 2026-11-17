// Calendarul persan (solar hijri, calendarul oficial al Iranului și al Afganistanului în variante apropiate).
// Regula: anul începe în ziua echinocțiului de primăvară dacă acesta cade înainte de amiaza de la Teheran (UTC+3:30),
// altfel a doua zi. Luni: 6 × 31, 5 × 30 și Esfand de 29 sau 30 de zile. Echinocțiul: formula lui Meeus (cap. 27),
// valabilă pentru anii gregorieni 1000-3000; în afara lor întoarce NaN. Anul persan = anul gregorian - 621 (martie).
export const id = 'persian';
export const fields = ['year', 'month', 'day'];

const fl = Math.floor;
export const NAMES = ['Farvardin', 'Ordibehesht', 'Khordad', 'Tir', 'Mordad', 'Shahrivar', 'Mehr', 'Aban', 'Azar', 'Dey', 'Bahman', 'Esfand'];
const TERMS = [[485, 324.96, 1934.136], [203, 337.23, 32964.467], [199, 342.08, 20.186], [182, 27.85, 445267.112], [156, 73.14, 45036.886], [136, 171.52, 22518.443],
  [77, 222.54, 65928.934], [74, 296.72, 3034.906], [70, 243.58, 9037.513], [58, 119.81, 33718.147], [52, 297.17, 150.678], [50, 21.02, 2281.226],
  [45, 247.54, 29929.562], [44, 325.15, 31555.956], [29, 60.93, 4443.417], [18, 155.12, 67555.328], [17, 288.79, 4562.452], [16, 198.04, 62894.029],
  [14, 199.76, 31436.921], [12, 95.39, 14577.848], [12, 287.11, 31931.756], [12, 320.81, 34777.259], [9, 227.73, 1222.114], [8, 15.45, 16859.074]];

// ΔT = TT - UT în secunde (polinoame Espenak și Meeus; aceeași funcție în mars.js, persian.js și chinese.js, verificată de teste)
export function deltaT(y) {
  let t;
  if (y < -500 || y > 2150) { t = (y - 1820) / 100; return -20 + 32 * t * t; }
  if (y < 500) { t = y / 100; return 10583.6 - 1014.41 * t + 33.78311 * t * t - 5.952053 * t * t * t - 0.1798452 * t * t * t * t + 0.022174192 * t * t * t * t * t + 0.0090316521 * t * t * t * t * t * t; }
  if (y < 1600) { t = (y - 1000) / 100; return 1574.2 - 556.01 * t + 71.23472 * t * t + 0.319781 * t * t * t - 0.8503463 * t * t * t * t - 0.005050998 * t * t * t * t * t + 0.0083572073 * t * t * t * t * t * t; }
  if (y < 1700) { t = y - 1600; return 120 - 0.9808 * t - 0.01532 * t * t + t * t * t / 7129; }
  if (y < 1800) { t = y - 1700; return 8.83 + 0.1603 * t - 0.0059285 * t * t + 0.00013336 * t * t * t - t * t * t * t / 1174000; }
  if (y < 1860) { t = y - 1800; return 13.72 - 0.332447 * t + 0.0068612 * t * t + 0.0041116 * t * t * t - 0.00037436 * t * t * t * t + 0.0000121272 * t * t * t * t * t - 0.0000001699 * t * t * t * t * t * t + 0.000000000875 * t * t * t * t * t * t * t; }
  if (y < 1900) { t = y - 1860; return 7.62 + 0.5737 * t - 0.251754 * t * t + 0.01680668 * t * t * t - 0.0004473624 * t * t * t * t + t * t * t * t * t / 233174; }
  if (y < 1920) { t = y - 1900; return -2.79 + 1.494119 * t - 0.0598939 * t * t + 0.0061966 * t * t * t - 0.000197 * t * t * t * t; }
  if (y < 1941) { t = y - 1920; return 21.20 + 0.84493 * t - 0.076100 * t * t + 0.0020936 * t * t * t; }
  if (y < 1961) { t = y - 1950; return 29.07 + 0.407 * t - t * t / 233 + t * t * t / 2547; }
  if (y < 1986) { t = y - 1975; return 45.45 + 1.067 * t - t * t / 260 - t * t * t / 718; }
  if (y < 2005) { t = y - 2000; return 63.86 + 0.3345 * t - 0.060374 * t * t + 0.0017275 * t * t * t + 0.000651814 * t * t * t * t + 0.00002373599 * t * t * t * t * t; }
  if (y < 2050) { t = y - 2000; return 62.92 + 0.32217 * t + 0.005589 * t * t; }
  t = (y - 1820) / 100; return -20 + 32 * t * t - 0.5628 * (2150 - y);
}
// momentul echinocțiului de martie (JDE, timp dinamic) după Meeus
export function marchEquinoxJDE(year) {
  const Y = (year - 2000) / 1000;
  const jde0 = 2451623.80984 + 365242.37404 * Y + 0.05169 * Y * Y - 0.00411 * Y * Y * Y - 0.00057 * Y * Y * Y * Y;
  const T = (jde0 - 2451545.0) / 36525;
  const W = (35999.373 * T - 2.47) * Math.PI / 180;
  const dl = 1 + 0.0334 * Math.cos(W) + 0.0007 * Math.cos(2 * W);
  let S = 0;
  for (let i = 0; i < TERMS.length; i++) S += TERMS[i][0] * Math.cos((TERMS[i][1] + TERMS[i][2] * T) * Math.PI / 180);
  return jde0 + 0.00001 * S / dl;
}
export function marchEquinoxUT(year) { return marchEquinoxJDE(year) - deltaT(year) / 86400; }
// JDN al zilei de 1 Farvardin care începe în anul gregorian g
export function newYearJDN(g) {
  if (g < 1000 || g > 3000) return NaN;
  const ut = marchEquinoxUT(g);
  const x = ut + 3.5 / 24 + 0.5;       // timp local la Teheran, ca zi civilă + fracție
  const n = fl(x);
  return x - n < 0.5 ? n : n + 1;
}
export function isLeap(p) { return newYearJDN(p + 622) - newYearJDN(p + 621) === 366; }
export function monthLength(p, m) { return m <= 6 ? 31 : (m <= 11 ? 30 : (isLeap(p) ? 30 : 29)); }
const before = (m) => (m <= 7 ? 31 * (m - 1) : 186 + 30 * (m - 7));
export function toJD(year, month, day) {
  const ny = newYearJDN(year + 621);
  if (!(ny === ny) || month < 1 || month > 12 || day < 1 || day > monthLength(year, month)) return NaN;
  return ny + before(month) + day - 1 - 0.5;
}
function gYear(jdn) {   // an gregorian aproximativ al zilei JDN
  const z = jdn - 1721120;  // Gregorian 0000-03-01 ≈ JDN 1721120
  return fl((z - 0.25 * 0) / 365.2425) + 1;
}
export function fromJD(jd) {
  const jdn = fl(jd + 0.5);
  let g = gYear(jdn);
  let p = g - 621;
  for (let i = 0; i < 3 && newYearJDN(p + 621) > jdn; i++) p--;
  for (let i = 0; i < 3 && newYearJDN(p + 622) <= jdn; i++) p++;
  const ny = newYearJDN(p + 621);
  if (!(ny === ny)) return { year: NaN, month: NaN, day: NaN };
  const doy = jdn - ny;
  const month = doy < 186 ? fl(doy / 31) + 1 : fl((doy - 186) / 30) + 7;
  return { year: p, month, day: doy - before(month) + 1, leap: isLeap(p) };
}
export function monthList() { return NAMES.map((n, i) => ({ v: i + 1, n })); }
export function format(d) { return d.day + ' ' + NAMES[d.month - 1] + ' ' + d.year + ' AP'; }
export function monthTitle(year, month) { return NAMES[month - 1] + ' ' + year + ' AP'; }
