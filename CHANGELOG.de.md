# Änderungsprotokoll

[English](CHANGELOG.md) · [Română](CHANGELOG.ro.md) · [Français](CHANGELOG.fr.md) · [Italiano](CHANGELOG.it.md) · [Español](CHANGELOG.es.md) · [Português](CHANGELOG.pt.md) · **Deutsch** · [Magyar](CHANGELOG.hu.md)

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · [SemVer](https://semver.org/).

## [Unveröffentlicht]

### Behoben
- Monatsansicht: Nach dem Eintippen eines Datums ging der erste Klick auf ‹ › (oder auf eine Schaltfläche „Kopieren“) verloren, weil das Verlassen des Feldes die Seite zwischen Drücken und Loslassen neu zeichnete; die Seite wird jetzt nur neu gezeichnet, wenn sich das Datum wirklich geändert hat.

## [0.2.0] - 2026-11-17

### Hinzugefügt
- Ein funktionierender Umrechner zwischen elf Kalendern (gregorianisch, julianisch, revidiert julianisch, hebräisch, Hidschri tabellarisch, persisch, koptisch, äthiopisch, chinesisch lunisolar, Maya, Marssol-Datum), je ein getestetes Plugin.
- Monatsansicht mit zweitem Kalender, Hinweise zu altem/neuem Stil in Rumänien, westliches und orthodoxes Ostern, chinesische Sonnenjahrpunkte und Neujahr sowie ein Atlas aus `data/calendars/`.
- Oberfläche in acht Sprachen (mit der Datumsreihenfolge jeder Sprache), dunkles und helles Design, Tastatur- und Screenreader-Unterstützung, mobiles Layout.
- Tests: `node --test` für Plugins, Engine, Daten und Übersetzungen; Browsertests im Hub (alle Sprachen, Barrierefreiheit, feindliche Eingaben, Daten außerhalb des Bereichs).
- `src/`, `plugins/` und `scripts/build.mjs`: Die eine `index.html` wird jetzt aus Quellen gebaut, `--check` prüft sie.
- ISSUES_GOOD_FIRST und CODE_OF_CONDUCT in alle acht Sprachen übersetzt.
- README auf Englisch, Rumänisch, Französisch, Italienisch, Spanisch, Portugiesisch, Deutsch und Ungarisch: Abschnitte zu Status und geplantem Umfang (abgeleitet aus `ISSUES_GOOD_FIRST.md`).
- Installierbar (PWA): `manifest.webmanifest`, `sw.js` und die Symbole werden vom gemeinsamen Kit (`fff-kit/pwa`) erzeugt; die Seite funktioniert nach dem ersten Besuch über HTTPS offline.

### Geändert
- `data/calendars/example.json` beschreibt jetzt den französischen Revolutionskalender (noch ohne Plugin) als Vorlage für Beitragende.
- Der Workflow läuft auf Ubuntu 26.04 mit Node.js 26 und führt auch die Tests und die Build-Prüfung aus.

## [0.1.0] - 2026-11-13

### Hinzugefügt
- Erstes Gerüst: Struktur, Datenschema oder erste Beispiele, Beitragsanleitungen in acht Sprachen.
