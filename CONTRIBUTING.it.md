# Come contribuire — CALENDARIUM

[English](CONTRIBUTING.md) · [Română](CONTRIBUTING.ro.md) · [Français](CONTRIBUTING.fr.md) · **Italiano** · [Español](CONTRIBUTING.es.md) · [Português](CONTRIBUTING.pt.md) · [Deutsch](CONTRIBUTING.de.md) · [Magyar](CONTRIBUTING.hu.md)

Versione: 0.2.1 · Ultimo aggiornamento: 2026-11-20

1. Fai il fork di questo repository.
2. Copia `data/calendars/example.json` in `data/calendars/` e modificalo.
3. Esegui `python scripts/validate.py`.
4. Apri una pull request: per i dati non serve programmare.

## Regole

- Una voce = un file.
- Cita sempre una fonte.
- Contribuisci solo con materiale che puoi condividere legalmente (niente testi protetti copiati).
- Sii gentile: vedi il Codice di condotta.

## Aggiungere un plugin di calendario

1. Aggiungi `data/calendars/<id>.json` (schema in `schema.json`) ed esegui `python scripts/validate.py`.
2. Scrivi `plugins/<id>.js` come modulo ES (sintassi ES2017, senza import) che esporta `id`, `fields` e:
   - `toJD(...fields)`: il giorno giuliano alle 0h UT della data, oppure `NaN` se la data non esiste o è fuori intervallo;
   - `fromJD(jd)`: un oggetto con gli stessi campi (i campi numerici sono `NaN` fuori dall’intervallo supportato);
   - `format(date, L)`: la stringa mostrata; `L.month(n)`, `L.era(year)`, `L.date(d, m, y)`, `L.t(key)` e `L.list(key)` arrivano dall’interfaccia;
   - facoltativi `monthList(year, L)` → `[{v, n}]` e `monthTitle(year, month, leap, L)`.
3. Aggiungi l’id a `ORDER` e `GROUPS` in `src/engine.mjs`, e i testi `cal_<id>`, `reg_<id>` e `rule_<id>` nelle otto lingue di `src/i18n.mjs`.
4. Scrivi test in `test/`: andata e ritorno su un lungo intervallo e date note da una fonte citata; esegui `npm test`.
5. Esegui `node scripts/build.mjs` e fai il commit dell’`index.html` rigenerato insieme a `src/`.
