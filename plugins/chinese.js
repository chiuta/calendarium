// Calendarul chinezesc lunisolar, calculat astronomic după regulile moderne (Calendrical Calculations, cap. 19):
//  - luna începe în ziua lunii noi (fus Beijing: UTC+8 din 1929, ora medie locală 7 h 45 min 40 s înainte);
//  - luna 11 conține solstițiul de iarnă; între două solstiții există 12 sau 13 luni;
//  - într-un an cu 13 luni, prima lună fără «termen solar principal» (zhongqi) este lună bisectă (intercalară).
// Lungimea de undă solară: seria cu 49 de termeni din Calendrical Calculations; luna nouă: Meeus, cap. 49.
// Valabil în mod util pentru 1645-2500; înainte de 1645 rezultatul este o extindere proleptică, nu istoria oficială.
export const id = 'chinese';
export const fields = ['year', 'month', 'day', 'leap'];

const fl = Math.floor;
const RAD = Math.PI / 180;
const mod = (a, b) => a - b * fl(a / b);
const sinD = (x) => Math.sin(x * RAD);
const cosD = (x) => Math.cos(x * RAD);
export const STEMS = [['甲', 'Jiǎ'], ['乙', 'Yǐ'], ['丙', 'Bǐng'], ['丁', 'Dīng'], ['戊', 'Wù'], ['己', 'Jǐ'], ['庚', 'Gēng'], ['辛', 'Xīn'], ['壬', 'Rén'], ['癸', 'Guǐ']];
export const BRANCHES = [['子', 'Zǐ'], ['丑', 'Chǒu'], ['寅', 'Yín'], ['卯', 'Mǎo'], ['辰', 'Chén'], ['巳', 'Sì'], ['午', 'Wǔ'], ['未', 'Wèi'], ['申', 'Shēn'], ['酉', 'Yǒu'], ['戌', 'Xū'], ['亥', 'Hài']];
// cei 24 de termeni solari, în ordinea anului gregorian (începând cu Xiaohan, ~5 ianuarie); lungimea solară în grade
export const TERMS = [['小寒', 'Xiǎohán', 285], ['大寒', 'Dàhán', 300], ['立春', 'Lìchūn', 315], ['雨水', 'Yǔshuǐ', 330], ['惊蛰', 'Jīngzhé', 345], ['春分', 'Chūnfēn', 0],
  ['清明', 'Qīngmíng', 15], ['谷雨', 'Gǔyǔ', 30], ['立夏', 'Lìxià', 45], ['小满', 'Xiǎomǎn', 60], ['芒种', 'Mángzhòng', 75], ['夏至', 'Xiàzhì', 90],
  ['小暑', 'Xiǎoshǔ', 105], ['大暑', 'Dàshǔ', 120], ['立秋', 'Lìqiū', 135], ['处暑', 'Chǔshǔ', 150], ['白露', 'Báilù', 165], ['秋分', 'Qiūfēn', 180],
  ['寒露', 'Hánlù', 195], ['霜降', 'Shuāngjiàng', 210], ['立冬', 'Lìdōng', 225], ['小雪', 'Xiǎoxuě', 240], ['大雪', 'Dàxuě', 255], ['冬至', 'Dōngzhì', 270]];

/* ---------- timp ---------- */
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

function gregJDN(y, m, d) { // JDN gregorian proleptic
  const a = fl((14 - m) / 12), yy = y + 4800 - a, mm = m + 12 * a - 3;
  return d + fl((153 * mm + 2) / 5) + 365 * yy + fl(yy / 4) - fl(yy / 100) + fl(yy / 400) - 32045;
}
function gregYearOfJDN(J) {
  const f = J + 1401 + fl((fl((4 * J + 274277) / 146097) * 3) / 4) - 38;
  const e = 4 * f + 3;
  const g = fl((((e % 1461) + 1461) % 1461) / 4);
  const h = 5 * g + 2;
  const month = ((fl(h / 153) + 2) % 12) + 1;
  return fl(e / 1461) - 4716 + fl((14 - month) / 12);
}
const JD_1929 = gregJDN(1929, 1, 1) - 0.5;
const ZONE_OLD = 1397 / 4320;   // 7 h 45 min 40 s, în zile
const ZONE_NEW = 1 / 3;         // UTC+8
function zoneAtJD(jdUT) { return jdUT < JD_1929 ? ZONE_OLD : ZONE_NEW; }
function localDay(jdUT) { return fl(jdUT + zoneAtJD(jdUT) + 0.5); }
function dayStartUT(N) { const z = (N - 0.5) < JD_1929 ? ZONE_OLD : ZONE_NEW; return N - 0.5 - z; }
function yearOfJD(jd) { return 2000 + (jd - 2451545) / 365.2425; }

/* ---------- longitudinea solară aparentă (grade), jdUT -> [0, 360) ---------- */
const SC = [403406, 195207, 119433, 112392, 3891, 2819, 1721, 660, 350, 334, 314, 268, 242, 234, 158, 132, 129, 114, 99, 93, 86, 78, 72, 68, 64, 46, 38, 37, 32, 29, 28, 27, 27, 25, 24, 21, 21, 20, 18, 17, 14, 13, 13, 13, 12, 10, 10, 10, 10];
const SX = [270.54861, 340.19128, 63.91854, 331.26220, 317.843, 86.631, 240.052, 310.26, 247.23, 260.87, 297.82, 343.14, 166.79, 81.53, 3.50, 132.75, 182.95, 162.03, 29.8, 266.4, 249.2, 157.6, 257.8, 185.1, 69.9, 8.0, 197.1, 250.4, 65.3, 162.7, 341.5, 291.6, 98.5, 146.7, 110.0, 5.2, 342.6, 230.9, 256.1, 45.3, 242.9, 115.2, 151.8, 285.3, 53.3, 126.6, 205.7, 85.9, 146.1];
const SY = [0.9287892, 35999.1376958, 35999.4089666, 35998.7287385, 71998.20261, 71998.4403, 36000.35726, 71997.4812, 32964.4678, -19.4410, 445267.1117, 45036.8840, 3.1008, 22518.4434, -19.9739, 65928.9345, 9038.0293, 3034.7684, 33718.148, 3034.448, -2280.773, 29929.992, 31556.493, 149.588, 9037.750, 107997.405, -4444.176, 151.771, 67555.316, 31556.080, -4561.540, 107996.706, 1221.655, 62894.167, 31437.369, 14578.298, -31931.757, 34777.243, 1221.775, 62894.511, -4442.039, 107997.909, 119.066, 16859.071, -4.578, 26895.292, -39.127, 12297.536, 90073.778];
export function solarLongitude(jdUT) {
  const jdTT = jdUT + deltaT(yearOfJD(jdUT)) / 86400;
  const c = (jdTT - 2451545) / 36525;
  let sigma = 0;
  for (let i = 0; i < 49; i++) sigma += SC[i] * sinD(SX[i] + SY[i] * c);
  const lon = 282.7771834 + 36000.76953744 * c + 0.000005729577951308232 * sigma;
  const aberration = 0.0000974 * cosD(177.63 + 35999.01848 * c) - 0.005575;
  const nutation = -0.004778 * sinD(124.90 - 1934.134 * c + 0.002063 * c * c) - 0.0003667 * sinD(201.11 + 72001.5377 * c + 0.00057 * c * c);
  return mod(lon + aberration + nutation, 360);
}

/* ---------- luna nouă (Meeus, cap. 49): k = 0 la 6 ianuarie 2000 ---------- */
export function newMoonJDE(k) {
  const T = k / 1236.85;
  let jde = 2451550.09766 + 29.530588861 * k + 0.00015437 * T * T - 0.000000150 * T * T * T + 0.00000000073 * T * T * T * T;
  const E = 1 - 0.002516 * T - 0.0000074 * T * T;
  const M = mod(2.5534 + 29.10535670 * k - 0.0000014 * T * T - 0.00000011 * T * T * T, 360);
  const Mp = mod(201.5643 + 385.81693528 * k + 0.0107582 * T * T + 0.00001238 * T * T * T - 0.000000058 * T * T * T * T, 360);
  const F = mod(160.7108 + 390.67050284 * k - 0.0016118 * T * T - 0.00000227 * T * T * T + 0.000000011 * T * T * T * T, 360);
  const Om = mod(124.7746 - 1.56375588 * k + 0.0020672 * T * T + 0.00000215 * T * T * T, 360);
  jde += -0.40720 * sinD(Mp) + 0.17241 * E * sinD(M) + 0.01608 * sinD(2 * Mp) + 0.01039 * sinD(2 * F) + 0.00739 * E * sinD(Mp - M) - 0.00514 * E * sinD(Mp + M) +
    0.00208 * E * E * sinD(2 * M) - 0.00111 * sinD(Mp - 2 * F) - 0.00057 * sinD(Mp + 2 * F) + 0.00056 * E * sinD(2 * Mp + M) - 0.00042 * sinD(3 * Mp) +
    0.00042 * E * sinD(M + 2 * F) + 0.00038 * E * sinD(M - 2 * F) - 0.00024 * E * sinD(2 * Mp - M) - 0.00017 * sinD(Om) - 0.00007 * sinD(Mp + 2 * M) +
    0.00004 * sinD(2 * Mp - 2 * F) + 0.00004 * sinD(3 * M) + 0.00003 * sinD(Mp + M - 2 * F) + 0.00003 * sinD(2 * Mp + 2 * F) - 0.00003 * sinD(Mp + M + 2 * F) +
    0.00003 * sinD(Mp - M + 2 * F) - 0.00002 * sinD(Mp - M - 2 * F) - 0.00002 * sinD(3 * Mp + M) + 0.00002 * sinD(4 * Mp);
  const A = [[299.77 + 0.107408 * k - 0.009173 * T * T, 0.000325], [251.88 + 0.016321 * k, 0.000165], [251.83 + 26.651886 * k, 0.000164], [349.42 + 36.412478 * k, 0.000126],
    [84.66 + 18.206239 * k, 0.000110], [141.74 + 53.303771 * k, 0.000062], [207.14 + 2.453732 * k, 0.000060], [154.84 + 7.306860 * k, 0.000056], [34.52 + 27.261239 * k, 0.000047],
    [207.19 + 0.121824 * k, 0.000042], [291.34 + 1.844379 * k, 0.000040], [161.72 + 24.198154 * k, 0.000037], [239.56 + 25.513099 * k, 0.000035], [331.55 + 3.592518 * k, 0.000023]];
  for (let i = 0; i < A.length; i++) jde += A[i][1] * sinD(A[i][0]);
  return jde;
}
export function newMoonUT(k) { const j = newMoonJDE(k); return j - deltaT(yearOfJD(j)) / 86400; }
function newMoonDay(k) { return localDay(newMoonUT(k)); }
function firstMoonOnOrAfter(N) { let k = fl((N - 2451550.09766) / 29.530588861) - 2; while (newMoonDay(k) < N) k++; return k; }
function moonDayOnOrAfter(N) { return newMoonDay(firstMoonOnOrAfter(N)); }
function moonDayOnOrBefore(N) { const k = firstMoonOnOrAfter(N); const d = newMoonDay(k); return d === N ? d : newMoonDay(k - 1); }

/* ---------- termeni solari ---------- */
function zq(N) { return fl(solarLongitude(dayStartUT(N)) / 30); }   // câte 30° au trecut: schimbarea indică un termen principal în luna care se încheie
const solsticeCache = new Map();
function solsticeDay(Y) {   // ziua civilă (Beijing) a solstițiului de iarnă din decembrie Y
  if (solsticeCache.has(Y)) return solsticeCache.get(Y);
  let N = gregJDN(Y, 12, 14), found = NaN;
  for (let i = 0; i < 16; i++, N++) if (zq(N) === 8 && zq(N + 1) === 9) { found = N; break; }
  solsticeCache.set(Y, found);
  return found;
}
// momentul (JD UT) în care longitudinea solară atinge lambda, în jurul anului gregorian Y
export function termJD(Y, lambda) {
  let rel = lambda >= 285 ? lambda - 360 : lambda;
  let jd = gregJDN(Y, 3, 20) + rel / 360 * 365.2422;
  for (let i = 0; i < 12; i++) {
    const diff = mod(lambda - solarLongitude(jd) + 540, 360) - 180;
    jd += diff / 0.9856474;
    if (Math.abs(diff) < 1e-7) break;
  }
  return jd;
}
export function solarTerms(Y) {
  if (!(Y >= RANGE_YEARS[0] && Y <= RANGE_YEARS[1])) return [];
  return TERMS.map((t) => { const jd = termJD(Y, t[2]); return { hanzi: t[0], pinyin: t[1], lambda: t[2], jd, jdn: localDay(jd) }; });
}

/* ---------- structura unui an solstițiu-la-solstițiu ---------- */
const suiCache = new Map();
function sui(a) {   // luna 11 care conține solstițiul din decembrie a, până la luna 11 următoare
  if (suiCache.has(a)) return suiCache.get(a);
  const m0 = moonDayOnOrBefore(solsticeDay(a));
  const m1 = moonDayOnOrBefore(solsticeDay(a + 1));
  const starts = [m0];
  let k = firstMoonOnOrAfter(m0 + 1);
  for (let guard = 0; guard < 16; guard++, k++) { const d = newMoonDay(k); starts.push(d); if (d >= m1) break; }
  const n = starts.length - 1;
  let leapIdx = -1;
  if (n === 13) for (let i = 1; i < n; i++) if (zq(starts[i]) === zq(starts[i + 1])) { leapIdx = i; break; }
  const months = [];
  let num = 11, idx1 = -1;
  for (let i = 0; i < n; i++) {
    let leap = false;
    if (i > 0) { if (i === leapIdx) leap = true; else num = (num % 12) + 1; }
    if (idx1 < 0 && num === 1 && !leap) idx1 = i;
    months.push({ start: starts[i], len: starts[i + 1] - starts[i], num, leap, i });
  }
  for (const m of months) m.year = idx1 >= 0 && m.i < idx1 ? a : a + 1;
  const out = { a, months, end: starts[n], ok: starts[n] === m1 && (n === 12 || n === 13) };
  suiCache.set(a, out);
  return out;
}
// Intervalul în care pluginul dă rezultate: anii gregorieni −1999…3000 (domeniul polinoamelor ΔT Espenak–Meeus); în afară: NaN.
export const RANGE_YEARS = [-1999, 3000];
export function inRange(jd) { const N = fl(jd + 0.5); return N >= gregJDN(RANGE_YEARS[0], 1, 1) && N <= gregJDN(RANGE_YEARS[1], 12, 31); }
export function toJD(year, month, day, leap) {
  if (!(year >= RANGE_YEARS[0] && year <= RANGE_YEARS[1])) return NaN;
  const a = month >= 11 ? year : year - 1;
  const s = sui(a);
  for (const m of s.months) if (m.year === year && m.num === month && m.leap === !!leap) { const r = day >= 1 && day <= m.len ? m.start + day - 1 - 0.5 : NaN; return inRange(r) ? r : NaN; }
  return NaN;
}
export function fromJD(jd) {
  if (!inRange(jd)) return { year: NaN, month: NaN, day: NaN, leap: false, monthLength: NaN, stem: NaN, branch: NaN, eraYear: NaN };
  const N = fl(jd + 0.5);
  const Y = gregYearOfJDN(N);
  let s = sui(Y);
  if (N < s.months[0].start) s = sui(Y - 1);
  else if (N >= s.end) s = sui(Y + 1);
  let m = s.months[0];
  for (const x of s.months) if (x.start <= N) m = x;
  const year = m.year;
  const stem = mod(year - 4, 10), branch = mod(year - 4, 12);
  return { year, month: m.num, day: N - m.start + 1, leap: m.leap, monthLength: m.len, stem, branch, eraYear: year + 2697 };
}
export function newYearJDN(year) { return toJD(year, 1, 1, false) + 0.5; }
export function monthList() {
  const out = [];
  for (let m = 1; m <= 12; m++) out.push({ v: m, n: String(m) });
  return out;
}
export function monthTitle(year, month, leap, L) {
  const d = fromJD(toJD(year, month, 1, !!leap));
  if (!d || !isFinite(d.year) || !isFinite(d.stem)) return String(year);
  return d.year + ' ' + STEMS[d.stem][0] + BRANCHES[d.branch][0] + ' · ' + L.t('c_month') + ' ' + (leap ? L.t('c_leap') + ' ' : '') + month;
}
export function format(d, L) {
  const zh = STEMS[d.stem][0] + BRANCHES[d.branch][0];
  const py = STEMS[d.stem][1] + BRANCHES[d.branch][1].toLowerCase();
  return d.year + ' ' + zh + ' ' + py + ' (' + L.list('zod')[d.branch] + ') · ' + L.t('c_month') + ' ' + (d.leap ? L.t('c_leap') + ' ' : '') + d.month + ', ' + L.t('c_day') + ' ' + d.day;
}
