# Contributing — CALENDARIUM

**English** · [Română](CONTRIBUTING.ro.md) · [Français](CONTRIBUTING.fr.md) · [Italiano](CONTRIBUTING.it.md) · [Español](CONTRIBUTING.es.md) · [Português](CONTRIBUTING.pt.md) · [Deutsch](CONTRIBUTING.de.md) · [Magyar](CONTRIBUTING.hu.md)

Version: 0.2.0 · Last updated: 2026-11-17

1. Fork this repository.
2. Copy `data/calendars/example.json` into `data/calendars/` and edit it.
3. Run `python scripts/validate.py`.
4. Open a pull request — data contributions need no coding.

## Rules

- One entry = one file.
- Always cite a source.
- Contribute only material you may legally share (no copied copyrighted text).
- Be kind: see the Code of Conduct.

## Adding a calendar plugin

1. Add `data/calendars/<id>.json` (schema in `schema.json`) and run `python scripts/validate.py`.
2. Write `plugins/<id>.js` as an ES module (ES2017 syntax, no imports) that exports `id`, `fields` and:
   - `toJD(...fields)`: the Julian Day at 0h UT of the date, or `NaN` if the date does not exist or is out of range;
   - `fromJD(jd)`: an object with the same fields (numeric fields are `NaN` outside the supported range);
   - `format(date, L)`: the display string; `L.month(n)`, `L.era(year)`, `L.date(d, m, y)`, `L.t(key)` and `L.list(key)` come from the interface;
   - optionally `monthList(year, L)` → `[{v, n}]` and `monthTitle(year, month, leap, L)`.
3. Add the id to `ORDER` and `GROUPS` in `src/engine.mjs`, and the texts `cal_<id>`, `reg_<id>` and `rule_<id>` in all eight languages in `src/i18n.mjs`.
4. Write tests in `test/`: round trips over a long range and known dates from a cited source; run `npm test`.
5. Run `node scripts/build.mjs` and commit the regenerated `index.html` together with `src/`.
