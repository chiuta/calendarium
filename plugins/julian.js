// A calendar plugin exports two functions. Julian Day Number is the pivot between calendars.
// Algorithm: Meeus, Astronomical Algorithms, ch. 7 (Julian calendar variant).
export function toJD(year, month, day) {
  if (month <= 2) { year -= 1; month += 12; }
  return Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day - 1524.5;
}
export function fromJD(jd) {
  const z = Math.floor(jd + 0.5);
  const b = z + 1524;
  const c = Math.floor((b - 122.1) / 365.25);
  const d = Math.floor(365.25 * c);
  const e = Math.floor((b - d) / 30.6001);
  const day = b - d - Math.floor(30.6001 * e);
  const month = e < 14 ? e - 1 : e - 13;
  const year = month > 2 ? c - 4716 : c - 4715;
  return { year, month, day };
}
