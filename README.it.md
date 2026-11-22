# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · **Italiano** · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Versione: 0.2.1 · Ultimo aggiornamento: 2026-11-22

🌐 https://calendarium.chiuta.ro

> Atlante e convertitore dei calendari del mondo, un plugin per calendario.

Trade-free: nessun tracciamento, nessuna pubblicità, nessun account, funziona offline.

## Stato

Alpha, utilizzabile: il convertitore, la vista mensile, le note sulle date romene e l’atlante funzionano nell’unico file `index.html` (si apre offline, senza server). Undici calendari sono implementati come plugin con test; i limiti sono elencati più sotto.

## Cosa fa

- Digita una data in qualsiasi calendario e vedi lo stesso giorno in tutti gli altri: gregoriano, giuliano, giuliano riveduto (Milanković), ebraico, egiriano (tabulare), persiano (Egira solare), copto, etiope, lunisolare cinese (con mesi intercalari), maya (Lungo Computo, Tzolk’in, Haab’) e data solare marziana.
- Giorno giuliano, giorno giuliano modificato, giorno della settimana, settimana ISO, giorno dell’anno e giorni dal 1970-01-01.
- Vista mensile con un secondo calendario sotto ogni giorno; un clic su un giorno lo converte.
- Note romene: stile vecchio / stile nuovo e differenza in giorni, il passaggio del 1919 nel Vecchio Regno, una nota su Transilvania, Banato e Bucovina, Pasqua occidentale e ortodossa.
- Termini solari cinesi e Capodanno dell’anno scelto; un atlante dei calendari costruito da `data/calendars/*.json`.
- Interfaccia in otto lingue, temi scuro e chiaro, accessibile da tastiera; senza rete, senza tracciamento.
- Installabile come app e disponibile offline dopo la prima visita quando è servita via HTTPS (un service worker conserva la pagina; nient’altro viene memorizzato o inviato). Aperta da un file scaricato funziona allo stesso modo, senza installazione.

## Come funziona

- `plugins/<id>.js`: un modulo ES per calendario (`toJD`, `fromJD`, `format`, `fields`); il contratto è descritto in `CONTRIBUTING.md`.
- `src/engine.mjs` è logica pura (senza DOM); `src/ui.js`, `src/i18n.mjs` e `src/app.css` contengono l’interfaccia.
- `node scripts/build.mjs` assembla tutto nell’unico `index.html` (e `--check` verifica che corrisponda a `src/`).
- `npm test` esegue i test: andata e ritorno su lunghi intervalli, date storiche note e protezioni fuori intervallo. Lo sviluppo richiede Node.js 24 o successivo; la pagina stessa richiede solo un browser con ES2017.
- `manifest.webmanifest`, `sw.js` e le icone sono prodotti da `node scripts/build.mjs` tramite il kit comune (sezione `pwa` di `src/app.json`); anche `--check` li verifica, e `npm test` controlla che il manifest, la versione del service worker e la CSP corrispondano alla pagina.

## Limiti, dichiarati con chiarezza

- Il calendario egiriano è quello TABULARE (aritmetico); quello osservato o Umm al-Qura può differire di 1–2 giorni. Prima dell’anno 1 dell’Egira non dà risultato.
- Il calendario persiano è calcolato astronomicamente (equinozio di Meeus, mezzogiorno a Teheran) per gli anni gregoriani 1001–2999; fuori da questo intervallo non dà risultato.
- Il calendario cinese usa l’ora di Pechino (ora locale media prima del 1929) ed è verificato su 26 date di Capodanno (1984–2034) e 21 mesi intercalari (1984–2039); prima del 1645 è un’estensione prolettica, non la storia ufficiale; fuori dagli anni gregoriani da −1999 a 3000 non dà risultato.
- Il calendario maya usa la correlazione GMT (584283); in letteratura ne esistono altre. Il calendario ebraico è quello aritmetico (dall’anno 1).
- La data solare marziana è mostrata per le 00:00 UT della data scelta; ΔT è approssimato con polinomi (errore inferiore a un minuto tra il 1600 e il 2100; fuori da questo intervallo l’incertezza cresce).
- Le date di adozione del calendario gregoriano fuori dalla Romania non sono incluse; quelle contrassegnate «non verificato» vanno confermate nelle fonti primarie.

## Contribuisci in 5 minuti

1. Fai il fork di questo repository.
2. Copia `data/calendars/example.json` in `data/calendars/` e modificalo.
3. Esegui `python scripts/validate.py`.
4. Apri una pull request: per i dati non serve programmare.
5. Per aggiungere un calendario, scrivi `plugins/<id>.js` e i suoi test, poi esegui `npm test` e `node scripts/build.mjs` (vedi `CONTRIBUTING.md`).

## Buone prime attività

Vedi `ISSUES_GOOD_FIRST.md` per attività già pronte.

## Licenza

Codice: MIT. Dati contribuiti: indica la fonte; sono pubblicati con la stessa licenza salvo diversa indicazione.

## Supporto

Se il progetto ti è utile, puoi [offrirmi un caffè](https://buymeacoffee.com/echo.of.the.strings).
