# CALENDARIUM

**English** · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Version: 0.1.0 · Last updated: 2026-11-14

🌐 https://calendarium.chiuta.ro

> An atlas and converter of the world's calendars, one plugin per calendar.

Trade-free: no tracking, no ads, no accounts, works offline.

## Status

Alpha: the repository holds the structure, the data schema or the first examples and the contribution guides. The scope below is the plan, not what works today.

## Planned scope

- One plugin per calendar, each with tests: Gregorian (checked against the Julian one around 1582-10-04/15), Hijri (tabular), Hebrew, Chinese lunisolar, Ethiopian and Coptic.
- Mayan Long Count, Tzolkin and Haab, and the Mars sol (MSD).
- Notes on Romanian historical dates (old style / new style, the 1919 switch).
- A converter interface: pick two calendars, type a date and see the other.
- A test runner (`node --test`) that checks `toJD`/`fromJD` round trips.

None of this is implemented yet: each item is a ready-made task in `ISSUES_GOOD_FIRST.md`.

## Contribute in 5 minutes

1. Fork this repository.
2. Copy `data/calendars/example.json` into `data/calendars/` and edit it.
3. Run `python scripts/validate.py`.
4. Open a pull request — data contributions need no coding.

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
