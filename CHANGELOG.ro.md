# Jurnal de modificări

[English](CHANGELOG.md) · **Română** · [Français](CHANGELOG.fr.md) · [Italiano](CHANGELOG.it.md) · [Español](CHANGELOG.es.md) · [Português](CHANGELOG.pt.md) · [Deutsch](CHANGELOG.de.md) · [Magyar](CHANGELOG.hu.md)

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · [SemVer](https://semver.org/).

## [Nelansat]

## [0.2.1] - 2026-11-20

### Corectat
- Vederea lunară: după tastarea unei date, prima apăsare pe ‹ › (sau pe un buton «Copiază») se pierdea, fiindcă ieșirea din câmp redesena pagina între apăsare și eliberare; pagina se redesenează acum doar dacă data s-a schimbat cu adevărat.

### Modificat
- fff-kit 1.8.1: când browserul blochează sau nu are stocare (`localStorage`/`sessionStorage` aruncă sau lipsesc), pagina pornește cu o stocare temporară în memorie, în loc să se oprească; datele nu se păstrează după închiderea paginii.
- fff-kit 1.8.1: ghidajul care mărește controalele mici la 44 px măsoară acum și lățimea corpului paginii și a părintelui, deci un rând de butoane nu mai poate ieși din ecran (grupul rămâne neatins când mărirea l-ar depăși).

## [0.2.0] - 2026-11-17

### Adăugat
- Un convertor funcțional între unsprezece calendare (gregorian, iulian, iulian revizuit, ebraic, hijri tabelar, persan, copt, etiopian, lunisolar chinez, maya, ziua solară marțiană), câte un plugin testat pentru fiecare.
- Vedere lunară cu al doilea calendar, note despre stil vechi/nou în România, Paștele occidental și ortodox, termenii solari și Anul Nou chinezesc, plus un atlas construit din `data/calendars/`.
- Interfață în opt limbi (cu ordinea datei specifică fiecărei limbi), teme întunecată și luminoasă, suport pentru tastatură și cititoare de ecran, aspect pentru mobil.
- Teste: `node --test` pentru plugin-uri, motor, date și traduceri; teste de browser în hub (toate limbile, accesibilitate, intrări ostile, date în afara intervalelor).
- `src/`, `plugins/` și `scripts/build.mjs`: singurul `index.html` este acum construit din surse, iar `--check` îl verifică.
- ISSUES_GOOD_FIRST și CODE_OF_CONDUCT traduse în toate cele opt limbi.
- README în engleză, română, franceză, italiană, spaniolă, portugheză, germană și maghiară: secțiuni de stare și de domeniu planificat (derivate din `ISSUES_GOOD_FIRST.md`).
- Instalabilă (PWA): `manifest.webmanifest`, `sw.js` și pictogramele sunt generate de kitul comun (`fff-kit/pwa`); pagina funcționează offline după prima vizită prin HTTPS.

### Modificat
- `data/calendars/example.json` descrie acum calendarul republican francez (încă fără plugin) ca model pentru contribuitori.
- Fluxul de lucru rulează pe Ubuntu 26.04 cu Node.js 26 și rulează și testele, plus verificarea construcției.

## [0.1.0] - 2026-11-13

### Adăugat
- Schelet inițial: structură, schema de date sau primele exemple, ghiduri de contribuție în opt limbi.
