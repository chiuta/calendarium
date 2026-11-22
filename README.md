# CALENDARIUM

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Version: 0.2.1 · Last updated: 2026-11-22

🌐 https://calendarium.chiuta.ro

> An atlas and converter of the world's calendars, one plugin per calendar.

Trade-free: no tracking, no ads, no accounts, works offline.

## Status

Alpha, usable: the converter, the month view, the Romanian date notes and the atlas work in the single `index.html` (open it offline, no server). Eleven calendars are implemented as plugins with tests; the limits are listed below.

## What it does

- Type a date in any calendar and see the same day in all the others: Gregorian, Julian, Revised Julian (Milanković), Hebrew, Hijri (tabular), Persian (Solar Hijri), Coptic, Ethiopian, Chinese lunisolar (with leap months), Maya (Long Count, Tzolk’in, Haab’) and the Mars Sol Date.
- Julian Day, Modified Julian Day, weekday, ISO week, day of the year and days since 1970-01-01.
- Month view with a second calendar under each day; click a day to convert it.
- Romanian notes: old style / new style and the gap in days, the 1919 switch in the Old Kingdom, a note on Transylvania, Banat and Bukovina, Western and Orthodox Easter.
- Chinese solar terms and New Year for the chosen year; an atlas of the calendars built from `data/calendars/*.json`.
- Interface in eight languages, dark and light themes, keyboard accessible; no network, no tracking.
- Installable as an app and available offline after the first visit when served over HTTPS (a service worker keeps the page; nothing else is stored or sent). Opened from a downloaded file it works the same, without installation.

## How it works

- `plugins/<id>.js`: one ES module per calendar (`toJD`, `fromJD`, `format`, `fields`); the contract is described in `CONTRIBUTING.md`.
- `src/engine.mjs` is pure logic (no DOM); `src/ui.js`, `src/i18n.mjs` and `src/app.css` hold the interface.
- `node scripts/build.mjs` assembles everything into the single `index.html` (and `--check` verifies that it matches `src/`).
- `npm test` runs the tests: round trips over long ranges, known historical dates and the out-of-range guards. Development needs Node.js 24 or newer; the page itself needs only a browser with ES2017.
- `manifest.webmanifest`, `sw.js` and the icons are produced by `node scripts/build.mjs` through the shared kit (`pwa` in `src/app.json`); `--check` also verifies them, and `npm test` checks that the manifest, the service worker version and the CSP match the page.

## Limits, stated plainly

- The Hijri calendar is the TABULAR (arithmetic) one; the observed or Umm al-Qura calendar can differ by 1–2 days. Before year 1 AH it gives no result.
- The Persian calendar is computed astronomically (Meeus equinox, Tehran noon) for Gregorian years 1001–2999; outside that range it gives no result.
- The Chinese calendar uses Beijing time (local mean time before 1929) and is checked against 26 New Year dates (1984–2034) and 21 leap months (1984–2039); before 1645 it is a proleptic extension, not the official history; outside Gregorian years −1999 to 3000 it gives no result.
- The Maya calendar uses the GMT correlation (584283); other correlations exist in the literature. The Hebrew calendar is the arithmetic one (from year 1).
- The Mars Sol Date is shown for 00:00 UT of the chosen date; ΔT is approximated with polynomials (error under a minute for 1600–2100; the uncertainty grows outside that range).
- Adoption dates of the Gregorian calendar outside Romania are not included; those marked “unverified” must be confirmed in primary sources.

## Contribute in 5 minutes

1. Fork this repository.
2. Copy `data/calendars/example.json` into `data/calendars/` and edit it.
3. Run `python scripts/validate.py`.
4. Open a pull request — data contributions need no coding.
5. To add a calendar, write `plugins/<id>.js` and its tests, then run `npm test` and `node scripts/build.mjs` (see `CONTRIBUTING.md`).

## Good first issues

See `ISSUES_GOOD_FIRST.md` for ready-made tasks.

## License

Code: MIT. Contributed data: state its source; it is released under the same licence unless the file says otherwise.

## Support

If this project is useful, you can [buy me a coffee](https://buymeacoffee.com/echo.of.the.strings).

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

Add yourself with `@all-contributors please add @you for data` in your pull request.
