// Teste pentru motorul aplicației (src/engine.mjs): pivot JD, zile, săptămâna ISO, Paște, stil vechi/nou, grila lunii.
import test from 'node:test';
import assert from 'node:assert/strict';
import { reg } from './_registry.mjs';
import * as E from '../src/engine.mjs';

const g = (y, m, d) => reg.gregorian.toJD(y, m, d);

test('JDN și ziua săptămânii (0 = duminică)', () => {
  assert.equal(g(2000, 1, 1), 2451544.5);
  assert.equal(E.jdnOf(g(2000, 1, 1)), 2451545);
  assert.equal(E.weekdayOf(E.jdnOf(g(2000, 1, 1))), 6);     // sâmbătă
  assert.equal(E.weekdayOf(E.jdnOf(g(2026, 11, 17))), 2);   // marți
  assert.equal(E.weekdayOf(E.jdnOf(g(1969, 7, 20))), 0);    // duminică
  assert.equal(E.mjdOf(g(1858, 11, 17)), 0);
});

test('zile Unix și ziua din an', () => {
  assert.equal(E.unixDays(g(1970, 1, 1)), 0);
  assert.equal(E.unixDays(g(2000, 1, 1)), 10957);
  assert.equal(E.dayOfYear(reg, g(2024, 12, 31)), 366);
  assert.equal(E.dayOfYear(reg, g(2023, 12, 31)), 365);
  assert.equal(E.dayOfYear(reg, g(2026, 11, 17)), 321);
});

test('săptămâna ISO 8601', () => {
  const w = (y, m, d) => { const r = E.isoWeek(reg, g(y, m, d)); return r.year + '-W' + r.week; };
  assert.equal(w(2026, 1, 1), '2026-W1');
  assert.equal(w(2021, 1, 3), '2020-W53');
  assert.equal(w(2024, 12, 30), '2025-W1');
  assert.equal(w(2026, 11, 17), '2026-W47');
  assert.equal(w(2015, 12, 31), '2015-W53');
});

test('Paștele occidental și ortodox (computus)', () => {
  const west = (y) => { const d = E.easterGregorian(y); return d.year + '-' + d.month + '-' + d.day; };
  const east = (y) => { const d = E.orthodoxEasterGregorian(reg, y); return d.year + '-' + d.month + '-' + d.day; };
  assert.equal(west(2024), '2024-3-31');
  assert.equal(west(2025), '2025-4-20');
  assert.equal(west(2026), '2026-4-5');
  assert.equal(west(2027), '2027-3-28');
  assert.equal(east(2023), '2023-4-16');
  assert.equal(east(2024), '2024-5-5');
  assert.equal(east(2025), '2025-4-20');
  assert.equal(east(2026), '2026-4-12');
  assert.equal(east(2027), '2027-5-2');
});

test('reforma gregoriană și trecerea României la stilul nou', () => {
  // 4 octombrie 1582 (iulian) a fost urmată de 15 octombrie 1582 (gregorian)
  assert.equal(reg.julian.toJD(1582, 10, 5), g(1582, 10, 15));
  assert.equal(reg.julian.toJD(1582, 10, 4), g(1582, 10, 14));
  // Vechiul Regat: 31 martie 1919 (stil vechi) = 13 aprilie 1919 gregorian; ziua următoare = 14 aprilie 1919
  assert.equal(reg.julian.toJD(1919, 3, 31), g(1919, 4, 13));
  const before = E.romanianStyle(reg, g(1919, 4, 13)), after = E.romanianStyle(reg, g(1919, 4, 14));
  assert.equal(before.civilIsOld, true);
  assert.equal(after.civilIsOld, false);
  assert.equal(before.oldDate.day, 31);
  assert.equal(before.oldDate.month, 3);
  assert.equal(after.newDate.day, 14);
  assert.equal(E.julianGregorianGap(reg, g(1919, 4, 14)), 13);
  assert.equal(E.julianGregorianGap(reg, g(2026, 11, 17)), 13);
  // diferența crește în ziua iuliană de 1 martie a anilor 1700, 1800, 1900 (nu la 1 martie gregorian)
  assert.equal(E.julianGregorianGap(reg, g(1582, 10, 15)), 10);
  assert.equal(E.julianGregorianGap(reg, g(1700, 3, 1)), 10);    // = 19 februarie 1700 iulian
  assert.equal(E.julianGregorianGap(reg, g(1700, 3, 12)), 11);   // = 1 martie 1700 iulian
  assert.equal(E.julianGregorianGap(reg, g(1800, 3, 12)), 11);   // = 29 februarie 1800 iulian
  assert.equal(E.julianGregorianGap(reg, g(1800, 3, 13)), 12);   // = 1 martie 1800 iulian
  assert.equal(E.julianGregorianGap(reg, g(1900, 3, 1)), 12);
  assert.equal(E.julianGregorianGap(reg, g(1900, 3, 14)), 13);   // = 1 martie 1900 iulian
  assert.equal(E.julianGregorianGap(reg, g(2100, 3, 14)), 13);   // = 29 februarie 2100 iulian (2100 e bisect iulian, nu gregorian)
  assert.equal(E.julianGregorianGap(reg, g(2100, 3, 15)), 14);   // = 1 martie 2100 iulian
});

test('evenimentele românești au chei i18n și o dată verificată sau marcată', () => {
  assert.ok(E.RO_EVENTS.length >= 3);
  for (const e of E.RO_EVENTS) {
    assert.match(e.key, /^ro_ev_\d{4}$/);
    assert.equal(typeof e.verified, 'boolean');
    assert.ok(isFinite(reg[e.cal].toJD(e.y, e.m, e.d)));
  }
  assert.equal(E.RO_EVENTS.filter((e) => !e.verified).length, 1, 'doar data din 1924 este marcată neverificată');
});

test('toJDChecked respinge datele inexistente', () => {
  assert.equal(E.toJDChecked(reg, 'gregorian', [2024, 2, 29]).ok, true);
  assert.equal(E.toJDChecked(reg, 'gregorian', [2023, 2, 29]).ok, false);
  assert.equal(E.toJDChecked(reg, 'gregorian', [2023, 4, 31]).ok, false);
  assert.equal(E.toJDChecked(reg, 'gregorian', [2023, 13, 1]).ok, false);
  assert.equal(E.toJDChecked(reg, 'julian', [1900, 2, 29]).ok, true);       // 1900 este bisect în calendarul iulian
  assert.equal(E.toJDChecked(reg, 'gregorian', [1900, 2, 29]).ok, false);
  assert.equal(E.toJDChecked(reg, 'hebrew', [5785, 13, 1]).ok, false);     // 5785 nu e bisect
  assert.equal(E.toJDChecked(reg, 'hebrew', [5784, 13, 1]).ok, true);      // 5784 e bisect (Adar II)
  assert.equal(E.toJDChecked(reg, 'gregorian', [NaN, 1, 1]).ok, false);
  assert.equal(E.toJDChecked(reg, 'nu-exista', [1, 1, 1]).ok, false);
});

test('convertAll acoperă toate calendarele și restul zilei rămâne consistent', () => {
  const jd = g(2026, 11, 17), all = E.convertAll(reg, jd);
  assert.deepEqual(Object.keys(all), E.ORDER);
  assert.deepEqual([all.gregorian.year, all.gregorian.month, all.gregorian.day], [2026, 11, 17]);
  assert.deepEqual([all.julian.year, all.julian.month, all.julian.day], [2026, 11, 4]);
  for (const id of E.ORDER) {
    assert.ok(all[id], id + ' lipsește');
    const back = reg[id].toJD(...reg[id].fields.map((f) => all[id][f]));
    assert.ok(Math.abs(back - jd) < 1e-6 || id === 'mars', id + ' nu face dus-întors');
  }
});

test('grila lunii: lungimi, deplasare, calendar secundar', () => {
  const nov = E.monthGrid(reg, 'gregorian', 2026, 11, false, 'julian');
  assert.equal(nov.days.length, 30);
  assert.equal(nov.startOffset, 6);                       // 1 noiembrie 2026 este duminică (coloana a 7-a, luni = 0)
  assert.equal(nov.days[0].other.day, 19);                // 1 noiembrie gregorian = 19 octombrie iulian
  assert.equal(E.monthGrid(reg, 'gregorian', 2024, 2, false, null).days.length, 29);
  assert.equal(E.monthGrid(reg, 'gregorian', 2023, 2, false, null).days.length, 28);
  const cn = E.monthGrid(reg, 'chinese', 2026, 1, false, 'gregorian');
  assert.ok(cn.days.length === 29 || cn.days.length === 30);
  assert.equal(cn.first, g(2026, 2, 17));                 // Anul Nou chinezesc 2026
  const he = E.monthGrid(reg, 'hebrew', 5785, 7, false, 'gregorian');
  assert.equal(he.days.length, 30);                       // Tishrei are 30 de zile
  assert.equal(he.first, g(2024, 10, 3));                 // 1 Tishrei 5785
  assert.equal(E.monthGrid(reg, 'gregorian', 2026, 14, false, null), null);
});

test('parseLongCount', () => {
  assert.deepEqual(E.parseLongCount('9.12.3.4.2'), [9, 12, 3, 4, 2]);
  assert.deepEqual(E.parseLongCount('12.3'), [0, 0, 0, 12, 3]);
  assert.equal(E.parseLongCount('a.b'), null);
  assert.equal(E.parseLongCount('1.2.3.4.5.6'), null);
  assert.deepEqual(E.parseLongCount('1.5.2'), [0, 0, 1, 5, 2]);
  assert.deepEqual(E.parseLongCount(' 13 . 0 . 13 . 4 . 2 '.replace(/ \. /g, '.')), [13, 0, 13, 4, 2]);
});
