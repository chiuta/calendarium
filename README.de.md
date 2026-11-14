# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · **Deutsch** · [Magyar](README.hu.md)

Version: 0.1.0 · Letzte Aktualisierung: 2026-11-14

🌐 https://calendarium.chiuta.ro

> Atlas und Umrechner der Kalender der Welt, ein Plugin pro Kalender.

Trade-free: kein Tracking, keine Werbung, keine Konten, funktioniert offline.

## Status

Alpha: Das Repository enthält die Struktur, das Datenschema oder die ersten Beispiele und die Beitragsleitfäden. Der Umfang unten ist der Plan, nicht das, was heute funktioniert.

## Geplanter Umfang

- Ein Plugin pro Kalender, jeweils mit Tests: gregorianisch (gegen den julianischen um 1582-10-04/15 geprüft), Hidschri (tabellarisch), hebräisch, chinesisch lunisolar, äthiopisch und koptisch.
- Maya-Lange-Zählung, Tzolkin und Haab sowie der Marstag (MSD).
- Hinweise zu rumänischen historischen Daten (alter Stil / neuer Stil, die Umstellung 1919).
- Eine Umrechnungsoberfläche: zwei Kalender wählen, ein Datum eingeben und das andere sehen.
- Ein Testläufer (`node --test`), der die Hin-und-zurück-Umrechnung `toJD`/`fromJD` prüft.

Nichts davon ist bisher umgesetzt: Jeder Punkt ist eine fertig vorbereitete Aufgabe in `ISSUES_GOOD_FIRST.md`.

## In 5 Minuten mitmachen

1. Forke dieses Repository.
2. Kopiere `data/calendars/example.json` nach `data/calendars/` und bearbeite die Datei.
3. Führe `python scripts/validate.py` aus.
4. Öffne einen Pull Request – für Daten ist keine Programmierung nötig.

## Gute erste Aufgaben

Siehe `ISSUES_GOOD_FIRST.md` für fertige Aufgaben.

## Lizenz

Code: MIT. Beigesteuerte Daten: Quelle angeben; sie stehen unter derselben Lizenz, sofern die Datei nichts anderes sagt.

## Unterstützung

Wenn dir das Projekt nützt, kannst du [mir einen Kaffee spendieren](https://buymeacoffee.com/echo.of.the.strings).
