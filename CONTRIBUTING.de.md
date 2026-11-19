# Mitmachen — CALENDARIUM

[English](CONTRIBUTING.md) · [Română](CONTRIBUTING.ro.md) · [Français](CONTRIBUTING.fr.md) · [Italiano](CONTRIBUTING.it.md) · [Español](CONTRIBUTING.es.md) · [Português](CONTRIBUTING.pt.md) · **Deutsch** · [Magyar](CONTRIBUTING.hu.md)

Version: 0.2.1 · Letzte Aktualisierung: 2026-11-20

1. Forke dieses Repository.
2. Kopiere `data/calendars/example.json` nach `data/calendars/` und bearbeite die Datei.
3. Führe `python scripts/validate.py` aus.
4. Öffne einen Pull Request – für Daten ist keine Programmierung nötig.

## Regeln

- Ein Eintrag = eine Datei.
- Gib immer eine Quelle an.
- Steuere nur Material bei, das du rechtmäßig teilen darfst (keine kopierten geschützten Texte).
- Sei freundlich: siehe Verhaltenskodex.

## Ein Kalender-Plugin hinzufügen

1. Lege `data/calendars/<id>.json` an (Schema in `schema.json`) und führe `python scripts/validate.py` aus.
2. Schreibe `plugins/<id>.js` als ES-Modul (ES2017-Syntax, ohne Imports), das `id`, `fields` und Folgendes exportiert:
   - `toJD(...fields)`: den Julianischen Tag um 0 Uhr UT des Datums oder `NaN`, wenn das Datum nicht existiert oder außerhalb des Bereichs liegt;
   - `fromJD(jd)`: ein Objekt mit denselben Feldern (numerische Felder sind außerhalb des unterstützten Bereichs `NaN`);
   - `format(date, L)`: den angezeigten Text; `L.month(n)`, `L.era(year)`, `L.date(d, m, y)`, `L.t(key)` und `L.list(key)` kommen von der Oberfläche;
   - optional `monthList(year, L)` → `[{v, n}]` und `monthTitle(year, month, leap, L)`.
3. Trage die ID in `ORDER` und `GROUPS` in `src/engine.mjs` ein und die Texte `cal_<id>`, `reg_<id>` und `rule_<id>` in allen acht Sprachen in `src/i18n.mjs`.
4. Schreibe Tests in `test/`: Hin-und-zurück über einen langen Bereich und bekannte Daten aus einer zitierten Quelle; führe `npm test` aus.
5. Führe `node scripts/build.mjs` aus und committe die neu erzeugte `index.html` zusammen mit `src/`.
