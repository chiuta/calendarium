# Közreműködés — CALENDARIUM

[English](CONTRIBUTING.md) · [Română](CONTRIBUTING.ro.md) · [Français](CONTRIBUTING.fr.md) · [Italiano](CONTRIBUTING.it.md) · [Español](CONTRIBUTING.es.md) · [Português](CONTRIBUTING.pt.md) · [Deutsch](CONTRIBUTING.de.md) · **Magyar**

Verzió: 0.2.0 · Utolsó frissítés: 2026-11-17

1. Forkold ezt a tárolót.
2. Másold a `data/calendars/example.json` fájlt a `data/calendars/` mappába, és szerkeszd.
3. Futtasd: `python scripts/validate.py`.
4. Nyiss egy pull requestet – adatokhoz nem kell programozni.

## Szabályok

- Egy bejegyzés = egy fájl.
- Mindig add meg a forrást.
- Csak olyan anyagot küldj, amelyet jogszerűen megoszthatsz (nincs másolt, védett szöveg).
- Légy kedves: lásd az Etikai kódexet.

## Naptár-bővítmény hozzáadása

1. Add hozzá a `data/calendars/<id>.json` fájlt (séma: `schema.json`), és futtasd: `python scripts/validate.py`.
2. Írd meg a `plugins/<id>.js` fájlt ES-modulként (ES2017 szintaxis, importok nélkül), amely exportálja az `id`, `fields` elemeket és ezeket:
   - `toJD(...fields)`: a dátum Julián-napja 0 órakor UT, vagy `NaN`, ha a dátum nem létezik vagy tartományon kívül esik;
   - `fromJD(jd)`: ugyanezekkel a mezőkkel rendelkező objektum (a támogatott tartományon kívül a numerikus mezők `NaN`-ek);
   - `format(date, L)`: a megjelenített szöveg; az `L.month(n)`, `L.era(year)`, `L.date(d, m, y)`, `L.t(key)` és `L.list(key)` a felülettől jön;
   - opcionálisan `monthList(year, L)` → `[{v, n}]` és `monthTitle(year, month, leap, L)`.
3. Vedd fel az azonosítót a `src/engine.mjs` `ORDER` és `GROUPS` listáiba, a `cal_<id>`, `reg_<id>` és `rule_<id>` szövegeket pedig mind a nyolc nyelven a `src/i18n.mjs` fájlba.
4. Írj teszteket a `test/` mappába: oda-vissza átváltás hosszú tartományon és ismert dátumok idézett forrásból; futtasd: `npm test`.
5. Futtasd a `node scripts/build.mjs` parancsot, és commitold az újragenerált `index.html` fájlt a `src/` mappával együtt.
