// Calendarul maya: Numărătoarea Lungă (Long Count), Tzolk'in (260 de zile) și Haab' (365 de zile).
// Corelația GMT (Goodman-Martinez-Thompson), constanta 584283: 0.0.0.0.0 = JDN 584283 (11 august 3114 î.Hr. gregorian proleptic).
// Verificare: 21 decembrie 2012 = 13.0.0.0.0, 4 Ajaw, 3 K'ank'in. Alte corelații (de ex. 584285) există în literatură.
export const id = 'maya';
export const fields = ['baktun', 'katun', 'tun', 'uinal', 'kin'];

const fl = Math.floor;
const mod = (a, b) => a - b * fl(a / b);
export const CORRELATION = 584283;
export const TZOLKIN = ['Imix', "Ik'", "Ak'bal", "K'an", 'Chikchan', 'Kimi', "Manik'", 'Lamat', 'Muluk', 'Ok', 'Chuwen', 'Eb', 'Ben', 'Ix', 'Men', "K'ib'", 'Kaban', "Etz'nab'", 'Kawak', 'Ajaw'];
export const HAAB = ['Pop', "Wo'", 'Sip', "Sotz'", 'Sek', 'Xul', "Yaxk'in", 'Mol', "Ch'en", 'Yax', "Sak'", 'Keh', 'Mak', "K'ank'in", 'Muwan', 'Pax', "K'ayab", "Kumk'u", "Wayeb'"];

export function toJD(baktun, katun, tun, uinal, kin) {
  return CORRELATION + baktun * 144000 + katun * 7200 + tun * 360 + uinal * 20 + kin - 0.5;
}
export function fromJD(jd) {
  const days = fl(jd + 0.5) - CORRELATION;
  let r = days;
  const baktun = fl(r / 144000); r -= baktun * 144000;
  const katun = fl(r / 7200); r -= katun * 7200;
  const tun = fl(r / 360); r -= tun * 360;
  const uinal = fl(r / 20); r -= uinal * 20;
  const ord = mod(days + 348, 365);
  return {
    baktun, katun, tun, uinal, kin: r, days,
    tzNumber: mod(days + 3, 13) + 1, tzName: mod(days + 19, 20),
    haabDay: ord % 20, haabMonth: fl(ord / 20)
  };
}
export function longCount(d) { return [d.baktun, d.katun, d.tun, d.uinal, d.kin].join('.'); }
export function format(d) {
  return longCount(d) + ' · ' + d.tzNumber + ' ' + TZOLKIN[d.tzName] + ' · ' + d.haabDay + ' ' + HAAB[d.haabMonth];
}
