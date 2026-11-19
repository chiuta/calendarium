# Cum contribui — CALENDARIUM

[English](CONTRIBUTING.md) · **Română** · [Français](CONTRIBUTING.fr.md) · [Italiano](CONTRIBUTING.it.md) · [Español](CONTRIBUTING.es.md) · [Português](CONTRIBUTING.pt.md) · [Deutsch](CONTRIBUTING.de.md) · [Magyar](CONTRIBUTING.hu.md)

Versiune: 0.2.1 · Ultima actualizare: 2026-11-20

1. Fă fork acestui depozit.
2. Copiază `data/calendars/example.json` în `data/calendars/` și editează-l.
3. Rulează `python scripts/validate.py`.
4. Deschide un pull request — pentru date nu e nevoie de programare.

## Reguli

- O intrare = un fișier.
- Citează întotdeauna o sursă.
- Contribuie doar cu material pe care ai voie să-l partajezi (fără texte copiate protejate de drepturi de autor).
- Fii amabil: vezi Codul de conduită.

## Adăugarea unui plugin de calendar

1. Adaugă `data/calendars/<id>.json` (schema este în `schema.json`) și rulează `python scripts/validate.py`.
2. Scrie `plugins/<id>.js` ca modul ES (sintaxă ES2017, fără importuri) care exportă `id`, `fields` și:
   - `toJD(...fields)`: ziua iuliană la 0h UT a datei sau `NaN` dacă data nu există ori e în afara intervalului;
   - `fromJD(jd)`: un obiect cu aceleași câmpuri (câmpurile numerice sunt `NaN` în afara intervalului acceptat);
   - `format(date, L)`: șirul afișat; `L.month(n)`, `L.era(year)`, `L.date(d, m, y)`, `L.t(key)` și `L.list(key)` vin din interfață;
   - opțional `monthList(year, L)` → `[{v, n}]` și `monthTitle(year, month, leap, L)`.
3. Adaugă id-ul în `ORDER` și `GROUPS` din `src/engine.mjs`, iar textele `cal_<id>`, `reg_<id>` și `rule_<id>` în toate cele opt limbi din `src/i18n.mjs`.
4. Scrie teste în `test/`: dus-întors pe un interval lung și date cunoscute dintr-o sursă citată; rulează `npm test`.
5. Rulează `node scripts/build.mjs` și trimite `index.html` regenerat împreună cu `src/`.
