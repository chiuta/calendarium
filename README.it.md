# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Versione: 0.1.0 · Ultimo aggiornamento: 2026-11-14

🌐 https://calendarium.chiuta.ro

> Atlante e convertitore dei calendari del mondo, un plugin per calendario.

Trade-free: nessun tracciamento, nessuna pubblicità, nessun account, funziona offline.

## Stato

Alpha: il repository contiene la struttura, lo schema dati o i primi esempi e le guide al contributo. L’ambito qui sotto è il piano, non ciò che funziona oggi.

## Ambito previsto

- Un plugin per calendario, ciascuno con i suoi test: gregoriano (verificato rispetto al giuliano intorno al 1582-10-04/15), hijri (tabulare), ebraico, lunisolare cinese, etiope e copto.
- Il Lungo Computo, il Tzolkin e l’Haab maya, e il sol marziano (MSD).
- Note sulle date storiche romene (stile vecchio / stile nuovo, il passaggio del 1919).
- Un’interfaccia di conversione: scegli due calendari, digita una data e vedi l’altra.
- Un esecutore di test (`node --test`) che verifica gli andata e ritorno `toJD`/`fromJD`.

Nulla di tutto ciò è ancora implementato: ogni voce è un compito pronto in `ISSUES_GOOD_FIRST.md`.

## Contribuisci in 5 minuti

1. Fai il fork di questo repository.
2. Copia `data/calendars/example.json` in `data/calendars/` e modificalo.
3. Esegui `python scripts/validate.py`.
4. Apri una pull request: per i dati non serve programmare.

## Buone prime attività

Vedi `ISSUES_GOOD_FIRST.md` per attività già pronte.

## Licenza

Codice: MIT. Dati contribuiti: indica la fonte; sono pubblicati con la stessa licenza salvo diversa indicazione.

## Supporto

Se il progetto ti è utile, puoi [offrirmi un caffè](https://buymeacoffee.com/echo.of.the.strings).
