# CALENDARIUM

[English](README.md) · **Română** · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Versiune: 0.1.0 · Ultima actualizare: 2026-11-14

🌐 https://calendarium.chiuta.ro

> Atlas și convertor al calendarelor lumii, câte un plugin pe calendar.

Fără comerț (trade-free): fără urmărire, fără reclame, fără conturi, funcționează offline.

## Stare

Alfa: depozitul conține structura, schema de date sau primele exemple și ghidurile de contribuție. Domeniul de mai jos este planul, nu ceea ce funcționează azi.

## Domeniu planificat

- Câte un plugin pentru fiecare calendar, cu teste: gregorian (verificat față de cel iulian în jurul datei 1582-10-04/15), hijri (tabelar), ebraic, lunisolar chinez, etiopian și copt.
- Calendarul maya Long Count, Tzolkin și Haab, și ziua solară marțiană (MSD).
- Note despre datele istorice românești (stil vechi / stil nou, trecerea din 1919).
- O interfață de conversie: alegi două calendare, scrii o dată și o vezi pe cealaltă.
- Un rulator de teste (`node --test`) care verifică dus-întors `toJD`/`fromJD`.

Nimic din asta nu este implementat încă: fiecare punct este o sarcină gata pregătită în `ISSUES_GOOD_FIRST.md`.

## Contribuie în 5 minute

1. Fă fork acestui depozit.
2. Copiază `data/calendars/example.json` în `data/calendars/` și editează-l.
3. Rulează `python scripts/validate.py`.
4. Deschide un pull request — pentru date nu e nevoie de programare.

## Sarcini bune pentru început

Vezi `ISSUES_GOOD_FIRST.md` pentru sarcini gata pregătite.

## Licență

Cod: MIT. Datele contribuite: indică sursa; sunt publicate sub aceeași licență, dacă fișierul nu spune altfel.

## Sprijin

Dacă proiectul îți este util, poți [să-mi oferi o cafea](https://buymeacoffee.com/echo.of.the.strings).
