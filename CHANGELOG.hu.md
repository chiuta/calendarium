# Változásnapló

[English](CHANGELOG.md) · [Română](CHANGELOG.ro.md) · [Français](CHANGELOG.fr.md) · [Italiano](CHANGELOG.it.md) · [Español](CHANGELOG.es.md) · [Português](CHANGELOG.pt.md) · [Deutsch](CHANGELOG.de.md) · **Magyar**

Formátum: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · [SemVer](https://semver.org/).

## [Kiadatlan]

## [0.2.1] - 2026-11-20

### Javítva
- Havi nézet: dátum begépelése után a ‹ › (vagy a „Másolás” gomb) első megnyomása elveszett, mert a mező elhagyása a lenyomás és az elengedés között újrarajzolta az oldalt; az oldal mostantól csak akkor rajzolódik újra, ha a dátum valóban megváltozott.

### Módosítva
- fff-kit 1.8.1: ha a böngésző blokkolja a tárolást vagy nincs tárolója (a `localStorage`/`sessionStorage` hibát dob vagy hiányzik), az oldal ideiglenes, memóriabeli tárolóval indul ahelyett, hogy leállna; az adatok az oldal bezárása után nem maradnak meg.
- fff-kit 1.8.1: a kis vezérlőket 44 px-re növelő segéd mostantól az oldal törzsének és a szülőelemnek a szélességét is méri, így a gombsor már nem lóghat ki a képernyőről (a csoport érintetlen marad, ha a növelés túl szélessé tenné).

## [0.2.0] - 2026-11-17

### Hozzáadva
- Működő átváltó tizenegy naptár között (Gergely, Julián, Javított Julián, héber, táblázatos hidzsra, perzsa, kopt, etióp, kínai holdnaptár-napnaptár, maja, Mars-szoláris dátum), mindegyikhez egy tesztelt bővítmény.
- Havi nézet második naptárral, jegyzetek a romániai régi/új időszámításról, nyugati és ortodox húsvét, kínai napévszakok és újév, valamint a `data/calendars/` fájlokból épülő atlasz.
- Nyolc nyelvű felület (nyelvenként a dátum szokásos sorrendjével), sötét és világos téma, billentyűzet- és képernyőolvasó-támogatás, mobil elrendezés.
- Tesztek: `node --test` a bővítményekhez, a motorhoz, az adatokhoz és a fordításokhoz; böngészőtesztek a hubban (minden nyelv, akadálymentesség, ellenséges bemenetek, tartományon kívüli dátumok).
- `src/`, `plugins/` és `scripts/build.mjs`: az egyetlen `index.html` mostantól forrásokból épül, és a `--check` ellenőrzi.
- Az ISSUES_GOOD_FIRST és a CODE_OF_CONDUCT lefordítva mind a nyolc nyelvre.
- README angolul, románul, franciául, olaszul, spanyolul, portugálul, németül és magyarul: állapot- és tervezett terjedelem-szakaszok (az `ISSUES_GOOD_FIRST.md` alapján).
- Telepíthető (PWA): a `manifest.webmanifest`, az `sw.js` és az ikonok a közös kitből (`fff-kit/pwa`) készülnek; az oldal az első HTTPS-látogatás után offline is működik.

### Módosítva
- A `data/calendars/example.json` mostantól a francia forradalmi naptárat írja le (még bővítmény nélkül), sablonként a közreműködőknek.
- A munkafolyamat Ubuntu 26.04 és Node.js 26 alatt fut, és a teszteket meg a build-ellenőrzést is futtatja.

## [0.1.0] - 2026-11-13

### Hozzáadva
- Kezdeti váz: szerkezet, adatséma vagy első példák, hozzájárulási útmutatók nyolc nyelven.
