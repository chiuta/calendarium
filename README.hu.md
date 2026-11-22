# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · **Magyar**

Verzió: 0.2.1 · Utolsó frissítés: 2026-11-22

🌐 https://calendarium.chiuta.ro

> A világ naptárainak atlasza és átváltója, naptáranként egy bővítménnyel.

Trade-free: nincs követés, nincs reklám, nincs fiók, offline is működik.

## Állapot

Alfa, használható: az átváltó, a havi nézet, a román dátumokról szóló jegyzetek és az atlasz az egyetlen `index.html` fájlban működik (offline nyitható, szerver nélkül). Tizenegy naptár van megvalósítva tesztelt bővítményként; a korlátok lent olvashatók.

## Mit tud

- Írj be egy dátumot bármelyik naptárban, és nézd meg ugyanazt a napot az összes többiben: Gergely, Julián, Javított Julián (Milanković), héber, hidzsra (táblázatos), perzsa (napéves hidzsra), kopt, etióp, kínai holdnaptár-napnaptár (szökőhónapokkal), maja (hosszú számolás, Tzolk’in, Haab’) és Mars-szoláris dátum.
- Julián-dátum, módosított Julián-dátum, a hét napja, ISO-hét, az év napja és az 1970-01-01 óta eltelt napok.
- Havi nézet, minden nap alatt egy második naptárral; egy napra kattintva átváltja.
- Román jegyzetek: régi / új időszámítás és a napokban mért eltérés, az 1919-es váltás a Régi Királyságban, megjegyzés Erdélyről, a Bánságról és Bukovináról, nyugati és ortodox húsvét.
- Kínai napévszakok és a választott év újéve; a naptárak atlasza a `data/calendars/*.json` fájlokból.
- Nyolc nyelvű felület, sötét és világos téma, billentyűzettel használható; hálózat és követés nélkül.
- Alkalmazásként telepíthető, és az első látogatás után offline is elérhető, ha HTTPS-en keresztül szolgálják ki (egy service worker megőrzi az oldalt; semmi mást nem tárol és nem küld). Letöltött fájlból megnyitva ugyanígy működik, telepítés nélkül.

## Hogyan működik

- `plugins/<id>.js`: naptáranként egy ES-modul (`toJD`, `fromJD`, `format`, `fields`); a szerződést a `CONTRIBUTING.md` írja le.
- A `src/engine.mjs` tiszta logika (DOM nélkül); a `src/ui.js`, `src/i18n.mjs` és `src/app.css` adja a felületet.
- A `node scripts/build.mjs` az egyetlen `index.html` fájlba állít össze mindent (a `--check` ellenőrzi, hogy egyezik-e a `src/` tartalmával).
- Az `npm test` futtatja a teszteket: oda-vissza átváltás hosszú tartományokon, ismert történelmi dátumok és a tartományon kívüli védelem. A fejlesztéshez Node.js 24 vagy újabb kell; maga az oldal csak ES2017-et tudó böngészőt igényel.
- A `manifest.webmanifest`, az `sw.js` és az ikonok a `node scripts/build.mjs` futtatásakor készülnek a közös kit révén (az `src/app.json` `pwa` szakasza); a `--check` is ellenőrzi őket, az `npm test` pedig azt, hogy a manifeszt, a service worker verziója és a CSP megegyezik az oldalval.

## Korlátok, őszintén

- A hidzsra-naptár a TÁBLÁZATOS (számtani); a megfigyelésen alapuló vagy az Umm al-Qura naptár 1–2 nappal eltérhet. Az 1. hidzsra év előtt nem ad eredményt.
- A perzsa naptár csillagászati számítás (Meeus-féle napéjegyenlőség, teheráni dél) az i. sz. 1001–2999 közötti évekre; ezen kívül nem ad eredményt.
- A kínai naptár a pekingi időt használja (1929 előtt helyi középidő), és 26 újévi dátumon (1984–2034) és 21 szökőhónapon (1984–2039) ellenőriztük; 1645 előtt prolektikus kiterjesztés, nem a hivatalos történet; a −1999 és 3000 közötti gregorián éveken kívül nem ad eredményt.
- A maja naptár a GMT-korrelációt (584283) használja; az irodalomban mások is vannak. A héber naptár a számtani (az 1. évtől).
- A Mars-szoláris dátum a választott nap 00:00 UT időpontjára vonatkozik; a ΔT polinomokkal közelített (1600 és 2100 között a hiba egy percnél kisebb; ezen kívül a bizonytalanság nő).
- A Gergely-naptár Romániától eltérő bevezetési dátumai nincsenek benne; az „ellenőrizetlen” jelzésűeket elsődleges forrásokban kell megerősíteni.

## Járulj hozzá 5 perc alatt

1. Forkold ezt a tárolót.
2. Másold a `data/calendars/example.json` fájlt a `data/calendars/` mappába, és szerkeszd.
3. Futtasd: `python scripts/validate.py`.
4. Nyiss egy pull requestet – adatokhoz nem kell programozni.
5. Új naptárhoz írd meg a `plugins/<id>.js` fájlt és a teszteit, majd futtasd az `npm test` és a `node scripts/build.mjs` parancsot (lásd `CONTRIBUTING.md`).

## Jó első feladatok

Kész feladatok: `ISSUES_GOOD_FIRST.md`.

## Licenc

Kód: MIT. A beküldött adatoknál add meg a forrást; azonos licenc alatt jelennek meg, ha a fájl mást nem mond.

## Támogatás

Ha hasznos a projekt, [meghívhatsz egy kávéra](https://buymeacoffee.com/echo.of.the.strings).
