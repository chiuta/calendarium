// Teste pentru datele din data/calendars/ și pentru textele de interfață (opt limbi).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { reg } from './_registry.mjs';
import { ORDER, GROUPS } from '../src/engine.mjs';
import I18N from '../src/i18n.mjs';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const dir = path.join(root, 'data', 'calendars');
const files = fs.readdirSync(dir).filter((f) => f.endsWith('.json')).sort();
const read = (f) => JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
const expectedMonths = { gregorian: 12, julian: 12, 'revised-julian': 12, hebrew: 13, hijri: 12, persian: 12, coptic: 13, ethiopian: 13, chinese: 12, maya: 19, mars: 1 };

test('fiecare plugin are un fișier în data/calendars și invers (în afară de exemplu)', () => {
  const plugins = fs.readdirSync(path.join(root, 'plugins')).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')).sort();
  const ids = files.map((f) => f.replace(/\.json$/, '')).filter((i) => i !== 'example').sort();
  assert.deepEqual(ids, plugins);
  assert.deepEqual([...ORDER].sort(), plugins);
});

test('câmpurile fișierelor respectă schema (id, name, epoch_jd, months, leap_rule, plugin, sources)', () => {
  for (const f of files) {
    const d = read(f);
    if (f !== 'example.json') assert.equal(d.id, f.replace(/\.json$/, ''), f);
    assert.match(d.id, /^[a-z][a-z0-9-]*$/, f);
    for (const k of ['name', 'leap_rule', 'plugin']) assert.ok(typeof d[k] === 'string' && d[k].length > 3, f + ': ' + k);
    assert.ok(typeof d.epoch_jd === 'number' && isFinite(d.epoch_jd), f + ': epoch_jd');
    assert.ok(Array.isArray(d.months) && d.months.length >= 1, f + ': months');
    assert.ok(Array.isArray(d.sources) && d.sources.length >= 1, f + ': sources');
    for (const s of d.sources) assert.ok(typeof s === 'string' && s.length > 5, f + ': sursă goală');
  }
});

test('numărul de luni și epocile corespund pluginurilor', () => {
  for (const id of ORDER) {
    const d = read(id + '.json');
    assert.equal(d.months.length, expectedMonths[id], id);
    assert.ok(fs.existsSync(path.join(root, d.plugin)), id + ': ' + d.plugin);
  }
  const jdOf = (id, ...v) => reg[id].toJD(...v);
  assert.equal(read('gregorian.json').epoch_jd, jdOf('gregorian', 1, 1, 1));
  assert.equal(read('julian.json').epoch_jd, jdOf('julian', 1, 1, 1));
  assert.equal(read('hebrew.json').epoch_jd, jdOf('hebrew', 1, 7, 1));
  assert.equal(read('hijri.json').epoch_jd, jdOf('hijri', 1, 1, 1));
  assert.equal(read('coptic.json').epoch_jd, jdOf('coptic', 1, 1, 1));
  assert.equal(read('ethiopian.json').epoch_jd, jdOf('ethiopian', 1, 1, 1));
  assert.equal(read('persian.json').epoch_jd, jdOf('julian', 622, 3, 19));   // 1 Farvardin 1 AP = 19 martie 622 (iulian)
  assert.equal(read('maya.json').epoch_jd, 584282.5);                         // 0.0.0.0.0 în corelația GMT 584283
});

test('exemplul pentru contribuitori nu are plugin încă (și e marcat ca atare în fișier)', () => {
  const ex = read('example.json');
  assert.ok(!ORDER.includes(ex.id), 'exemplul descrie un calendar care nu există încă');
  assert.equal(fs.existsSync(path.join(root, ex.plugin)), false);
});

test('toate cele 8 limbi au aceleași chei și aceiași substituenți', () => {
  const langs = Object.keys(I18N);
  assert.deepEqual(langs, ['ro', 'en', 'fr', 'de', 'es', 'it', 'hu', 'pt']);
  const keys = Object.keys(I18N.en).sort();
  const ph = (s) => (s.match(/\{[0-9dmy]+\}/g) || []).sort().join(',');
  for (const l of langs) {
    assert.deepEqual(Object.keys(I18N[l]).sort(), keys, l);
    for (const k of keys) {
      assert.ok(typeof I18N[l][k] === 'string' && I18N[l][k].trim().length > 0, l + '.' + k + ' gol');
      assert.equal(ph(I18N[l][k]), ph(I18N.en[k]), l + '.' + k + ': substituenți diferiți');
    }
  }
});

test('listele (luni, zile, animale) au lungimea corectă în fiecare limbă', () => {
  for (const l of Object.keys(I18N)) {
    assert.equal(I18N[l].mon.split('|').length, 12, l + ' mon');
    assert.equal(I18N[l].wd.split('|').length, 7, l + ' wd');
    assert.equal(I18N[l].zod.split('|').length, 12, l + ' zod');
  }
});

test('fiecare calendar are nume, regiune și regulă în fiecare limbă; grupurile au etichete', () => {
  for (const l of Object.keys(I18N)) {
    for (const id of ORDER) for (const p of ['cal_', 'reg_', 'rule_']) assert.ok(I18N[l][p + id], l + ' ' + p + id);
    for (const [gk] of GROUPS) assert.ok(I18N[l][gk], l + ' ' + gk);
  }
});

test('modelul de dată localizat conține {d}, {m} și {y}', () => {
  for (const l of Object.keys(I18N)) for (const k of ['dfmt']) for (const ph of ['{d}', '{m}', '{y}']) assert.ok(I18N[l][k].includes(ph), l + ' ' + k);
  for (const l of Object.keys(I18N)) for (const ph of ['{m}', '{y}']) assert.ok(I18N[l].mfmt.includes(ph), l + ' mfmt');
});
