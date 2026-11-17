// Ziua solară marțiană: Mars Sol Date (MSD) și Mars Coordinated Time (MTC), după Allison și McEwen (2000), Mars24.
// MSD = (JD_TT - 2405522.0028779) / 1.0274912517. Un sol = 1,0274912517 zile terestre (24 h 39 min 35,244 s).
// Calendarul pivot dă ziua civilă la 00:00 UT; câmpul de intrare este MSD cu zecimale. Eroare tipică: sub un minut.
export const id = 'mars';
export const fields = ['msd'];

const fl = Math.floor;
export const SOL = 1.0274912517;
const MSD0 = 2405522.0028779;

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
function yearOfJD(jd) { return 2000 + (jd - 2451545) / 365.2425; }
export function toJD(msd) {
  const tt = msd * SOL + MSD0;
  return tt - deltaT(yearOfJD(tt)) / 86400;
}
export function fromJD(jd) {
  const tt = jd + deltaT(yearOfJD(jd)) / 86400;
  const msd = (tt - MSD0) / SOL;
  const sol = fl(msd);
  const mtcMin = Math.round((msd - sol) * 1440) % 1440;
  return { msd, sol, mtcHour: fl(mtcMin / 60), mtcMinute: mtcMin % 60 };
}
export function format(d) {
  const p = (n) => (n < 10 ? '0' : '') + n;
  return 'MSD ' + d.msd.toFixed(3) + ' · sol ' + d.sol + ' · MTC ' + p(d.mtcHour) + ':' + p(d.mtcMinute);
}
