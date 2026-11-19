# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · **Deutsch** · [Magyar](README.hu.md)

Version: 0.2.1 · Letzte Aktualisierung: 2026-11-20

🌐 https://calendarium.chiuta.ro

> Atlas und Umrechner der Kalender der Welt, ein Plugin pro Kalender.

Trade-free: kein Tracking, keine Werbung, keine Konten, funktioniert offline.

## Status

Alpha, nutzbar: Umrechner, Monatsansicht, Hinweise zu rumänischen Daten und Atlas laufen in der einen Datei `index.html` (offline öffnen, ohne Server). Elf Kalender sind als Plugins mit Tests umgesetzt; die Grenzen stehen weiter unten.

## Was es kann

- Gib ein Datum in einem beliebigen Kalender ein und sieh denselben Tag in allen anderen: gregorianisch, julianisch, revidiert julianisch (Milanković), hebräisch, Hidschri (tabellarisch), persisch (Sonnen-Hidschra), koptisch, äthiopisch, chinesisch lunisolar (mit Schaltmonaten), Maya (Lange Zählung, Tzolk’in, Haab’) und Marssol-Datum.
- Julianisches Datum, modifiziertes Julianisches Datum, Wochentag, ISO-Woche, Tag des Jahres und Tage seit 1970-01-01.
- Monatsansicht mit einem zweiten Kalender unter jedem Tag; ein Klick auf einen Tag rechnet ihn um.
- Rumänien-Hinweise: alter / neuer Stil und die Differenz in Tagen, die Umstellung 1919 im Altreich, ein Hinweis zu Siebenbürgen, Banat und Bukowina, westliches und orthodoxes Ostern.
- Chinesische Sonnenjahrpunkte und Neujahr des gewählten Jahres; ein Kalenderatlas, aufgebaut aus `data/calendars/*.json`.
- Oberfläche in acht Sprachen, dunkles und helles Design, per Tastatur bedienbar; ohne Netz, ohne Tracking.
- Als App installierbar und nach dem ersten Besuch offline verfügbar, wenn sie über HTTPS ausgeliefert wird (ein Service Worker behält die Seite; sonst wird nichts gespeichert oder gesendet). Aus einer heruntergeladenen Datei geöffnet, funktioniert sie genauso, ohne Installation.

## Wie es funktioniert

- `plugins/<id>.js`: ein ES-Modul pro Kalender (`toJD`, `fromJD`, `format`, `fields`); der Vertrag steht in `CONTRIBUTING.md`.
- `src/engine.mjs` ist reine Logik (ohne DOM); `src/ui.js`, `src/i18n.mjs` und `src/app.css` enthalten die Oberfläche.
- `node scripts/build.mjs` setzt alles zur einen `index.html` zusammen (`--check` prüft, ob sie zu `src/` passt).
- `npm test` führt die Tests aus: Hin-und-zurück über lange Bereiche, bekannte historische Daten und Schutz außerhalb des Bereichs. Entwicklung braucht Node.js 24 oder neuer; die Seite selbst nur einen Browser mit ES2017.
- `manifest.webmanifest`, `sw.js` und die Symbole erzeugt `node scripts/build.mjs` über das gemeinsame Kit (Abschnitt `pwa` in `src/app.json`); `--check` prüft sie ebenfalls, und `npm test` stellt sicher, dass Manifest, Service-Worker-Version und CSP zur Seite passen.

## Grenzen, offen gesagt

- Der Hidschri-Kalender ist der TABELLARISCHE (arithmetische); der beobachtete oder Umm-al-Qura-Kalender kann um 1–2 Tage abweichen. Vor dem Jahr 1 AH gibt es kein Ergebnis.
- Der persische Kalender wird astronomisch berechnet (Meeus-Gleiche, Mittag in Teheran) für die gregorianischen Jahre 1001–2999; außerhalb liefert er kein Ergebnis.
- Der chinesische Kalender nutzt Pekinger Zeit (vor 1929 mittlere Ortszeit) und ist an 26 Neujahrsdaten (1984–2034) und 21 Schaltmonaten (1984–2039) geprüft; vor 1645 ist er eine proleptische Fortsetzung, nicht die amtliche Geschichte; außerhalb der gregorianischen Jahre −1999 bis 3000 liefert er kein Ergebnis.
- Der Maya-Kalender nutzt die GMT-Korrelation (584283); in der Literatur gibt es weitere. Der hebräische Kalender ist der arithmetische (ab Jahr 1).
- Das Marssol-Datum wird für 00:00 UT des gewählten Datums angezeigt; ΔT wird durch Polynome angenähert (Fehler unter einer Minute von 1600 bis 2100; außerhalb wächst die Unsicherheit).
- Einführungsdaten des gregorianischen Kalenders außerhalb Rumäniens sind nicht enthalten; als „ungeprüft“ markierte sind an Primärquellen zu bestätigen.

## In 5 Minuten mitmachen

1. Forke dieses Repository.
2. Kopiere `data/calendars/example.json` nach `data/calendars/` und bearbeite die Datei.
3. Führe `python scripts/validate.py` aus.
4. Öffne einen Pull Request – für Daten ist keine Programmierung nötig.
5. Für einen neuen Kalender schreibe `plugins/<id>.js` samt Tests und führe dann `npm test` und `node scripts/build.mjs` aus (siehe `CONTRIBUTING.md`).

## Gute erste Aufgaben

Siehe `ISSUES_GOOD_FIRST.md` für fertige Aufgaben.

## Lizenz

Code: MIT. Beigesteuerte Daten: Quelle angeben; sie stehen unter derselben Lizenz, sofern die Datei nichts anderes sagt.

## Unterstützung

Wenn dir das Projekt nützt, kannst du [mir einen Kaffee spendieren](https://buymeacoffee.com/echo.of.the.strings).
