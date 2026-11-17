# CALENDARIUM

[English](README.md) · **Română** · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Versiune: 0.2.0 · Ultima actualizare: 2026-11-17

🌐 https://calendarium.chiuta.ro

> Atlas și convertor al calendarelor lumii, câte un plugin pe calendar.

Fără comerț (trade-free): fără urmărire, fără reclame, fără conturi, funcționează offline.

## Stare

Alfa, utilizabil: convertorul, vederea lunară, notele despre datele românești și atlasul funcționează în singurul fișier `index.html` (îl deschizi offline, fără server). Unsprezece calendare sunt implementate ca plugin-uri cu teste; limitele sunt enumerate mai jos.

## Ce face

- Scrii o dată în orice calendar și vezi aceeași zi în toate celelalte: gregorian, iulian, iulian revizuit (Milanković), ebraic, hijri (tabelar), persan (hijri solar), copt, etiopian, lunisolar chinez (cu luni bisecte), maya (Long Count, Tzolk’in, Haab’) și ziua solară marțiană.
- Zi iuliană, zi iuliană modificată, ziua săptămânii, săptămâna ISO, ziua din an și zilele de la 1970-01-01.
- Vedere lunară cu al doilea calendar sub fiecare zi; un clic pe zi o convertește.
- Note românești: stil vechi / stil nou și diferența în zile, trecerea din 1919 în Vechiul Regat, o notă despre Transilvania, Banat și Bucovina, Paștele occidental și ortodox.
- Termenii solari chinezești și Anul Nou pentru anul ales; un atlas al calendarelor construit din `data/calendars/*.json`.
- Interfață în opt limbi, teme întunecată și luminoasă, accesibilă de la tastatură; fără rețea, fără urmărire.
- Se poate instala ca aplicație și funcționează offline după prima vizită, când e servită prin HTTPS (un service worker păstrează pagina; nu se stochează și nu se trimite nimic altceva). Deschisă dintr-un fișier descărcat, merge la fel, fără instalare.

## Cum funcționează

- `plugins/<id>.js`: un modul ES pe calendar (`toJD`, `fromJD`, `format`, `fields`); contractul este descris în `CONTRIBUTING.md`.
- `src/engine.mjs` este logică pură (fără DOM); `src/ui.js`, `src/i18n.mjs` și `src/app.css` conțin interfața.
- `node scripts/build.mjs` asamblează totul în singurul `index.html` (iar `--check` verifică dacă acesta corespunde cu `src/`).
- `npm test` rulează testele: dus-întors pe intervale lungi, date istorice cunoscute și protecțiile din afara intervalului. Dezvoltarea cere Node.js 24 sau mai nou; pagina în sine cere doar un browser cu ES2017.
- `manifest.webmanifest`, `sw.js` și pictogramele sunt produse de `node scripts/build.mjs` prin kitul comun (secțiunea `pwa` din `src/app.json`); `--check` le verifică și el, iar `npm test` verifică dacă manifestul, versiunea service worker-ului și CSP-ul corespund paginii.

## Limite, spuse deschis

- Calendarul hijri este cel TABELAR (aritmetic); calendarul observat sau Umm al-Qura poate diferi cu 1–2 zile. Înainte de anul 1 AH nu dă rezultat.
- Calendarul persan se calculează astronomic (echinocțiul lui Meeus, amiaza la Teheran) pentru anii gregorieni 1001–2999; dincolo de acest interval nu dă rezultat.
- Calendarul chinezesc folosește fusul Beijing (ora medie locală înainte de 1929) și este verificat pe 26 de date de An Nou (1984–2034) și 21 de luni bisecte (1984–2039); înainte de 1645 este o extindere proleptică, nu istoria oficială; în afara anilor gregorieni −1999…3000 nu dă rezultat.
- Calendarul maya folosește corelația GMT (584283); în literatură există și altele. Calendarul ebraic este cel aritmetic (de la anul 1).
- Ziua solară marțiană este afișată pentru ora 00:00 UT a datei alese; ΔT este aproximat cu polinoame (eroare sub un minut între 1600 și 2100; în afara acestui interval incertitudinea crește).
- Datele de adoptare a calendarului gregorian în afara României nu sunt incluse; cele marcate „neverificat” trebuie confirmate în surse primare.

## Contribuie în 5 minute

1. Fă fork acestui depozit.
2. Copiază `data/calendars/example.json` în `data/calendars/` și editează-l.
3. Rulează `python scripts/validate.py`.
4. Deschide un pull request — pentru date nu e nevoie de programare.
5. Pentru un calendar nou, scrie `plugins/<id>.js` și testele lui, apoi rulează `npm test` și `node scripts/build.mjs` (vezi `CONTRIBUTING.md`).

## Sarcini bune pentru început

Vezi `ISSUES_GOOD_FIRST.md` pentru sarcini gata pregătite.

## Licență

Cod: MIT. Datele contribuite: indică sursa; sunt publicate sub aceeași licență, dacă fișierul nu spune altfel.

## Sprijin

Dacă proiectul îți este util, poți [să-mi oferi o cafea](https://buymeacoffee.com/echo.of.the.strings).
