# Registro delle modifiche

[English](CHANGELOG.md) · [Română](CHANGELOG.ro.md) · [Français](CHANGELOG.fr.md) · **Italiano** · [Español](CHANGELOG.es.md) · [Português](CHANGELOG.pt.md) · [Deutsch](CHANGELOG.de.md) · [Magyar](CHANGELOG.hu.md)

Formato: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · [SemVer](https://semver.org/).

## [Non rilasciato]

### Corretto
- Vista mensile: dopo aver digitato una data, la prima pressione su ‹ › (o su un pulsante «Copia») andava persa, perché l'uscita dal campo ridisegnava la pagina tra la pressione e il rilascio; ora la pagina viene ridisegnata solo se la data è davvero cambiata.

## [0.2.0] - 2026-11-17

### Aggiunto
- Un convertitore funzionante tra undici calendari (gregoriano, giuliano, giuliano riveduto, ebraico, egiriano tabulare, persiano, copto, etiope, lunisolare cinese, maya, data solare marziana), un plugin testato per ciascuno.
- Vista mensile con un secondo calendario, note sullo stile vecchio/nuovo in Romania, Pasqua occidentale e ortodossa, termini solari e Capodanno cinese, e un atlante costruito da `data/calendars/`.
- Interfaccia in otto lingue (con l’ordine della data di ciascuna lingua), temi scuro e chiaro, supporto per tastiera e lettori di schermo, layout mobile.
- Test: `node --test` per plugin, motore, dati e traduzioni; test del browser nell’hub (tutte le lingue, accessibilità, input ostili, date fuori intervallo).
- `src/`, `plugins/` e `scripts/build.mjs`: l’unico `index.html` è ora costruito dai sorgenti e `--check` lo verifica.
- ISSUES_GOOD_FIRST e CODE_OF_CONDUCT tradotti in tutte e otto le lingue.
- README in inglese, rumeno, francese, italiano, spagnolo, portoghese, tedesco e ungherese: sezioni di stato e di ambito previsto (derivate da `ISSUES_GOOD_FIRST.md`).
- Installabile (PWA): `manifest.webmanifest`, `sw.js` e le icone sono generati dal kit comune (`fff-kit/pwa`); la pagina funziona offline dopo la prima visita via HTTPS.

### Modificato
- `data/calendars/example.json` descrive ora il calendario repubblicano francese (ancora senza plugin) come modello per i contributori.
- Il workflow gira su Ubuntu 26.04 con Node.js 26 ed esegue anche i test e il controllo della build.

## [0.1.0] - 2026-11-13

### Aggiunto
- Scheletro iniziale: struttura, schema dei dati o primi esempi, guide al contributo in otto lingue.
