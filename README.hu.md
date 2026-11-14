# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

Verzió: 0.1.0 · Utolsó frissítés: 2026-11-14

🌐 https://calendarium.chiuta.ro

> A világ naptárainak atlasza és átváltója, naptáranként egy bővítménnyel.

Trade-free: nincs követés, nincs reklám, nincs fiók, offline is működik.

## Állapot

Alfa: a tároló a szerkezetet, az adatsémát vagy az első példákat és a közreműködési útmutatókat tartalmazza. Az alábbi terjedelem a terv, nem a ma működő állapot.

## Tervezett terjedelem

- Naptáranként egy plugin, mindegyikhez tesztekkel: Gergely-naptár (a Julián-naptárral összevetve 1582-10-04/15 körül), hidzsra (táblázatos), héber, kínai holdnaptár, etióp és kopt.
- Maja hosszú számolás, Tzolkin és Haab, valamint a marsi szol (MSD).
- Jegyzetek a román történelmi dátumokról (régi stílus / új stílus, az 1919-es váltás).
- Átváltófelület: válassz két naptárt, írj be egy dátumot, és nézd meg a másikat.
- Tesztfuttató (`node --test`), amely a `toJD`/`fromJD` oda-vissza átváltásokat ellenőrzi.

Ezek közül még semmi sincs megvalósítva: minden pont kész feladat az `ISSUES_GOOD_FIRST.md` fájlban.

## Járulj hozzá 5 perc alatt

1. Forkold ezt a tárolót.
2. Másold a `data/calendars/example.json` fájlt a `data/calendars/` mappába, és szerkeszd.
3. Futtasd: `python scripts/validate.py`.
4. Nyiss egy pull requestet – adatokhoz nem kell programozni.

## Jó első feladatok

Kész feladatok: `ISSUES_GOOD_FIRST.md`.

## Licenc

Kód: MIT. A beküldött adatoknál add meg a forrást; azonos licenc alatt jelennek meg, ha a fájl mást nem mond.

## Támogatás

Ha hasznos a projekt, [meghívhatsz egy kávéra](https://buymeacoffee.com/echo.of.the.strings).
