// Teste pentru pluginurile de calendar: ancore, dus-întors și date cunoscute (surse în comentarii).
import test from 'node:test';
import assert from 'node:assert/strict';
import { reg, gIso, gJD, iso } from './_registry.mjs';

const ids = Object.keys(reg);

test('fiecare plugin exportă id, fields, toJD, fromJD și format', () => {
  assert.ok(ids.length >= 11, 'cel puțin 11 pluginuri');
  for (const id of ids) {
    const p = reg[id];
    assert.equal(p.id, id, `${id}: id diferit de numele fișierului`);
    assert.ok(Array.isArray(p.fields) && p.fields.length >= 1, `${id}: fields`);
    for (const fn of ['toJD', 'fromJD', 'format']) assert.equal(typeof p[fn], 'function', `${id}: lipsește ${fn}`);
  }
});

test('ancore: J2000, 1970-01-01 și trecerea gregorian/iulian din 1582', () => {
  assert.equal(gJD(2000, 1, 1), 2451544.5);              // J2000.0 = JD 2451545.0 la amiază
  assert.equal(gJD(1970, 1, 1), 2440587.5);
  assert.equal(reg.julian.toJD(1582, 10, 4), 2299159.5);
  assert.equal(gJD(1582, 10, 15), 2299160.5);            // ziua următoare celei iuliene 1582-10-04
  assert.deepEqual(reg.julian.fromJD(gJD(1582, 10, 15)), { year: 1582, month: 10, day: 5 });
  assert.equal(gIso(reg.julian.toJD(-4712, 1, 1) + 0), '-4713-11-24');  // JD 0 = 1 ianuarie 4713 î.Hr. iulian = 24 noiembrie 4714 î.Hr. gregorian
  assert.equal(reg.julian.toJD(-4712, 1, 1), -0.5);
});

test('trecerea din 1919 în România: 31 martie 1919 (iulian) = 13 aprilie 1919 (gregorian), apoi 14 aprilie', () => {
  assert.equal(gIso(reg.julian.toJD(1919, 3, 31)), '1919-04-13');
  assert.equal(gIso(reg.julian.toJD(1919, 3, 31) + 1), '1919-04-14');
  assert.equal(gIso(reg.julian.toJD(1900, 2, 28)), '1900-03-12');   // 1900 este bisect doar în calendarul iulian
  assert.equal(gIso(reg.julian.toJD(1900, 2, 29)), '1900-03-13');
  assert.equal(gIso(reg.julian.toJD(1900, 3, 1)), '1900-03-14');    // de aici diferența este de 13 zile
});

test('dus-întors pentru toate calendarele pe un interval lung', () => {
  for (const id of ids) {
    if (id === 'mars') continue;                         // fără zile întregi
    const p = reg[id];
    let lo = 1700000, hi = 2900000, step = 811;
    if (id === 'hebrew') lo = 1800000;
    if (id === 'hijri') lo = 1948440;                      // de la 1 Muharram 1 AH
    if (id === 'persian') { lo = gJD(1001, 1, 1) + 0.5; hi = gJD(2999, 12, 1); }  // ani gregorieni 1001-2999
    if (id === 'chinese') { lo = 2305448; hi = 2634167; step = 313; }  // 1645-2545
    for (let jdn = lo; jdn < hi; jdn += step) {
      const jd = jdn - 0.5, d = p.fromJD(jd);
      const args = p.fields.map((f) => d[f]);
      assert.equal(p.toJD(...args), jd, `${id}: JDN ${jdn} -> ${JSON.stringify(d)}`);
    }
  }
});

test('revizuit: coincide cu gregorianul între 1 martie 1900 și 28 februarie 2800, apoi diferă', () => {
  for (let jdn = gJD(1900, 3, 1) + 0.5; jdn < gJD(2800, 3, 1); jdn += 17) {
    const g = reg.gregorian.fromJD(jdn - 0.5), r = reg['revised-julian'].fromJD(jdn - 0.5);
    assert.deepEqual([r.year, r.month, r.day], [g.year, g.month, g.day]);
  }
  assert.equal(reg['revised-julian'].isLeap(2800), false);
  assert.equal(reg.gregorian.isLeap(2800), true);
  assert.equal(reg['revised-julian'].isLeap(2900), true);
  assert.equal(reg['revised-julian'].isLeap(2000), true);
  assert.equal(reg['revised-julian'].isLeap(1900), false);
  assert.deepEqual(reg['revised-julian'].fromJD(gJD(2800, 3, 1)), { year: 2800, month: 3, day: 2 });
});

test('ebraic: Roș Hașana (1 Tishrei) 5779-5788', () => {
  const exp = { 5779: '2018-09-10', 5780: '2019-09-30', 5781: '2020-09-19', 5782: '2021-09-07', 5783: '2022-09-26', 5784: '2023-09-16', 5785: '2024-10-03', 5786: '2025-09-23', 5787: '2026-09-12', 5788: '2027-10-02' };
  for (const [y, g] of Object.entries(exp)) assert.equal(gIso(reg.hebrew.toJD(+y, 7, 1)), g, 'Roș Hașana ' + y);
});
test('ebraic: ani bisecți (ciclul de 19 ani), lungimi de an permise, luni imposibile', () => {
  const leap = [3, 6, 8, 11, 14, 17, 19];
  for (let y = 5780; y < 5799; y++) assert.equal(reg.hebrew.isLeap(y), leap.includes(((y - 1) % 19) + 1), 'bisect ' + y);
  const ok = new Set([353, 354, 355, 383, 384, 385]);
  for (let y = 5000; y < 6500; y++) assert.ok(ok.has(reg.hebrew.yearLength(y)), 'lungime ' + y + ': ' + reg.hebrew.yearLength(y));
  assert.ok(Number.isNaN(reg.hebrew.toJD(5785, 13, 1)));   // 5785 nu e bisect: nu există Adar II
  assert.ok(!Number.isNaN(reg.hebrew.toJD(5784, 13, 1)));  // 5784 e bisect (Adar I și Adar II în 2024)
  assert.ok(!Number.isNaN(reg.hebrew.toJD(5787, 13, 1)));  // 5787 e bisect
});

test('hijri tabelar: 1 Muharram 1446 = 8 iulie 2024 (tabelar), 1 Ramadan 1445', () => {
  assert.equal(gIso(reg.hijri.toJD(1446, 1, 1)), '2024-07-08');
  assert.equal(reg.hijri.monthLength(1445, 12), 30);       // 1445 este bisect în ciclul tabelar
  assert.equal(reg.hijri.isLeap(1445), true);
  assert.equal(reg.hijri.toJD(1, 1, 1), 1948439.5);       // epoca civilă: vineri 16 iulie 622 iulian
  assert.deepEqual(reg.julian.fromJD(reg.hijri.toJD(1, 1, 1)), { year: 622, month: 7, day: 16 });
});

test('copt și etiopian: Anul Nou', () => {
  assert.equal(gIso(reg.coptic.toJD(1741, 1, 1)), '2024-09-11');
  assert.equal(gIso(reg.ethiopian.toJD(2017, 1, 1)), '2024-09-11');
  assert.equal(gIso(reg.ethiopian.toJD(2016, 1, 1)), '2023-09-12');   // după Pagume cu 6 zile din 2015
  assert.equal(reg.ethiopian.monthLength(2015, 13), 6);
  assert.deepEqual(reg.julian.fromJD(reg.coptic.toJD(1, 1, 1)), { year: 284, month: 8, day: 29 });
  assert.deepEqual(reg.julian.fromJD(reg.ethiopian.toJD(1, 1, 1)), { year: 8, month: 8, day: 29 });
});

test('persan: Nowruz (1 Farvardin) 1380-1407 și echinocțiul lui Meeus', () => {
  const exp = { 1380: '2001-03-21', 1383: '2004-03-20', 1387: '2008-03-20', 1391: '2012-03-20', 1395: '2016-03-20', 1399: '2020-03-20', 1400: '2021-03-21', 1401: '2022-03-21', 1402: '2023-03-21', 1403: '2024-03-20', 1404: '2025-03-21', 1405: '2026-03-21', 1406: '2027-03-21', 1407: '2028-03-20' };
  for (const [y, g] of Object.entries(exp)) assert.equal(gIso(reg.persian.toJD(+y, 1, 1)), g, 'Nowruz ' + y);
  // momentul echinocțiului din 2024 (UTC): 20 martie, aproximativ 03:06
  const ut = reg.persian.marchEquinoxUT(2024);
  const hours = (ut + 0.5 - Math.floor(ut + 0.5)) * 24;
  assert.equal(Math.floor(ut + 0.5), 2460390);
  assert.ok(Math.abs(hours - 3.1) < 0.05, 'ora ' + hours);
  assert.equal(reg.persian.isLeap(1403), true);
  assert.equal(reg.persian.monthLength(1403, 12), 30);
  assert.equal(reg.persian.monthLength(1404, 12), 29);
  assert.ok(Number.isNaN(reg.persian.toJD(1404, 12, 30)));
});

test('maya: 21 decembrie 2012 = 13.0.0.0.0 · 4 Ajaw · 3 K\'ank\'in și zile alăturate', () => {
  const d = reg.maya.fromJD(gJD(2012, 12, 21));
  assert.equal(reg.maya.longCount(d), '13.0.0.0.0');
  assert.equal(d.tzNumber, 4); assert.equal(reg.maya.TZOLKIN[d.tzName], 'Ajaw');
  assert.equal(d.haabDay, 3); assert.equal(reg.maya.HAAB[d.haabMonth], "K'ank'in");
  const n = reg.maya.fromJD(gJD(2012, 12, 22));
  assert.equal(reg.maya.longCount(n), '13.0.0.0.1'); assert.equal(n.tzNumber, 5); assert.equal(reg.maya.TZOLKIN[n.tzName], 'Imix'); assert.equal(n.haabDay, 4);
  const z = reg.maya.fromJD(reg.maya.toJD(0, 0, 0, 0, 0));
  assert.equal(z.tzNumber, 4); assert.equal(reg.maya.TZOLKIN[z.tzName], 'Ajaw'); assert.equal(z.haabDay, 8); assert.equal(reg.maya.HAAB[z.haabMonth], "Kumk'u");
  assert.equal(gIso(reg.maya.toJD(0, 0, 0, 0, 0)), '-3113-08-11');   // 11 august 3114 î.Hr. gregorian proleptic (an astronomic -3113)
});

test('Marte: MSD la J2000 și lungimea solului', () => {
  const d = reg.mars.fromJD(gJD(2000, 1, 6));
  assert.ok(Math.abs(d.msd - 44796) < 0.001, 'MSD 2000-01-06: ' + d.msd);
  const a = reg.mars.fromJD(gJD(2026, 11, 17)), b = reg.mars.fromJD(gJD(2026, 11, 18));
  assert.ok(Math.abs((b.msd - a.msd) - 1 / 1.0274912517) < 1e-6);
  assert.ok(Math.abs(reg.mars.toJD(reg.mars.fromJD(2461000.25).msd) - 2461000.25) < 1e-6);
});

test('ΔT este aceeași funcție în cele trei fișiere care o conțin', () => {
  for (let y = -600; y < 2300; y += 7) {
    const a = reg.mars.deltaT(y), b = reg.persian.deltaT(y), c = reg.chinese.deltaT(y);
    assert.equal(a, b, 'mars/persian ' + y); assert.equal(a, c, 'mars/chinese ' + y);
  }
  assert.ok(Math.abs(reg.mars.deltaT(2000) - 63.8) < 0.5);
});

test('chinez: longitudinea solară coincide cu echinocțiul lui Meeus (sub 1 minut)', () => {
  for (let y = 1900; y <= 2100; y += 5) {
    const lon = reg.chinese.solarLongitude(reg.persian.marchEquinoxUT(y));
    const d = ((lon + 180) % 360) - 180;
    assert.ok(Math.abs(d / 0.9856474 * 1440) < 1.0, 'echinocțiu ' + y + ': ' + (d / 0.9856474 * 1440).toFixed(2) + ' min');
  }
});
test('chinez: lunile noi (UTC) față de valori cunoscute', () => {
  const t = (k) => new Date((reg.chinese.newMoonUT(k) - 2440587.5) * 86400000).toISOString().slice(0, 16);
  assert.equal(t(0), '2000-01-06T18:13');   // 18:14 UTC rotunjit în almanahuri
  assert.equal(t(300), '2024-04-08T18:20');
  assert.equal(t(310), '2025-01-29T12:35');
});
test('chinez: Anul Nou 1984-2034 (26 de date verificate) și lunile bisecte', () => {
  const cny = { 1984: '1984-02-02', 1985: '1985-02-20', 1990: '1990-01-27', 1995: '1995-01-31', 2000: '2000-02-05', 2008: '2008-02-07', 2010: '2010-02-14', 2012: '2012-01-23', 2014: '2014-01-31', 2015: '2015-02-19', 2016: '2016-02-08', 2017: '2017-01-28', 2018: '2018-02-16', 2019: '2019-02-05', 2020: '2020-01-25', 2021: '2021-02-12', 2022: '2022-02-01', 2023: '2023-01-22', 2024: '2024-02-10', 2025: '2025-01-29', 2026: '2026-02-17', 2027: '2027-02-06', 2028: '2028-01-26', 2029: '2029-02-13', 2030: '2030-02-03', 2034: '2034-02-19' };
  for (const [y, g] of Object.entries(cny)) assert.equal(gIso(reg.chinese.toJD(+y, 1, 1, false)), g, 'Anul Nou ' + y);
  const leap = { 1984: 10, 1987: 6, 1990: 5, 1993: 3, 1995: 8, 1998: 5, 2001: 4, 2004: 2, 2006: 7, 2009: 5, 2012: 4, 2014: 9, 2017: 6, 2020: 4, 2023: 2, 2025: 6, 2028: 5, 2031: 3, 2033: 11, 2036: 6, 2039: 5 };
  for (const [y, m] of Object.entries(leap)) {
    assert.ok(!Number.isNaN(reg.chinese.toJD(+y, m, 1, true)), `${y}: lună bisectă ${m}`);
    for (let k = 1; k <= 12; k++) if (k !== m) assert.ok(Number.isNaN(reg.chinese.toJD(+y, k, 1, true)), `${y}: nu există lună bisectă ${k}`);
  }
});
test('chinez: ani fără lună bisectă au 12 luni, cei cu au 13; anul 2033 (11 bisect) este cel cu regula neobișnuită', () => {
  let leapYears = 0;
  for (let y = 1900; y <= 2100; y++) {
    let months = 0;
    for (let m = 1; m <= 12; m++) { if (!Number.isNaN(reg.chinese.toJD(y, m, 1, false))) months++; if (!Number.isNaN(reg.chinese.toJD(y, m, 1, true))) { months++; leapYears++; } }
    assert.ok(months === 12 || months === 13, y + ': ' + months);
  }
  assert.ok(leapYears >= 70 && leapYears <= 80, 'în 201 de ani: ' + leapYears);   // ~7 din 19 ani
});
test('chinez: ciclul de 60 de ani și termenii solari', () => {
  const d = reg.chinese.fromJD(gJD(2024, 2, 10));
  assert.equal(reg.chinese.STEMS[d.stem][0] + reg.chinese.BRANCHES[d.branch][0], '甲辰');   // 2024 = Dragon de lemn
  assert.equal(d.eraYear, 4721);
  const terms = reg.chinese.solarTerms(2024);
  assert.equal(terms.length, 24);
  const lichun = terms.find((x) => x.pinyin === 'Lìchūn');
  assert.equal(gIso(lichun.jdn - 0.5), '2024-02-04');
  const dz = terms.find((x) => x.pinyin === 'Dōngzhì');
  assert.equal(gIso(dz.jdn - 0.5), '2024-12-21');
  const cf = terms.find((x) => x.pinyin === 'Chūnfēn');
  assert.equal(gIso(cf.jdn - 0.5), '2024-03-20');
});

test('toate calendarele dau aceeași zi pentru JD-uri consecutive (monotonie)', () => {
  for (const id of ['gregorian', 'julian', 'revised-julian', 'hebrew', 'hijri', 'persian', 'coptic', 'ethiopian', 'chinese']) {
    const p = reg[id];
    let prev = p.toJD(...p.fields.map((f) => p.fromJD(2459000.5)[f]));
    for (let i = 1; i < 800; i++) {
      const jd = 2459000.5 + i, cur = p.toJD(...p.fields.map((f) => p.fromJD(jd)[f]));
      assert.equal(cur - prev, 1, id + ' la ' + jd);
      prev = cur;
    }
  }
  assert.equal(iso({ year: 1, month: 2, day: 3 }), '1-02-03');
});

test('în afara intervalului acoperit: câmpuri NaN și toJD NaN, nu valori absurde', () => {
  const nan = (d) => Object.values(d).filter((v) => typeof v === 'number').every((v) => Number.isNaN(v));
  assert.ok(nan(reg.hijri.fromJD(gJD(600, 1, 1))));                 // înainte de 1 AH
  assert.ok(Number.isNaN(reg.hijri.toJD(0, 1, 1)));
  assert.ok(!nan(reg.hijri.fromJD(gJD(622, 7, 20))));
  assert.ok(nan(reg.hebrew.fromJD(gJD(-3800, 1, 1))));              // înainte de anul ebraic 1 (= 3761 î.Hr.)
  assert.ok(Number.isNaN(reg.hebrew.toJD(0, 7, 1)));
  assert.ok(!nan(reg.hebrew.fromJD(gJD(-3700, 1, 1))));
  assert.ok(nan(reg.chinese.fromJD(gJD(-2100, 1, 1))));             // sub −1999
  assert.ok(nan(reg.chinese.fromJD(gJD(3100, 1, 1))));              // peste 3000
  assert.ok(!nan(reg.chinese.fromJD(gJD(-1990, 6, 1))));
  assert.ok(!nan(reg.chinese.fromJD(gJD(2990, 6, 1))));
  assert.ok(Number.isNaN(reg.chinese.toJD(-2000, 1, 1, false)));
  assert.ok(Number.isNaN(reg.chinese.toJD(3001, 1, 1, false)));
  assert.deepEqual(reg.chinese.solarTerms(3500), []);
  assert.equal(reg.chinese.solarTerms(2026).length, 24);
  assert.ok(nan(reg.persian.fromJD(gJD(500, 1, 1))));
  assert.ok(nan(reg.persian.fromJD(gJD(3500, 1, 1))));
});
