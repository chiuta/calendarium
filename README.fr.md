# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Version : 0.1.0 · Dernière mise à jour : 2026-11-14

🌐 https://calendarium.chiuta.ro

> Atlas et convertisseur des calendriers du monde, un plugin par calendrier.

Trade-free : sans suivi, sans publicité, sans compte, fonctionne hors ligne.

## État

Alpha : le dépôt contient la structure, le schéma de données ou les premiers exemples et les guides de contribution. Le périmètre ci-dessous est le plan, pas ce qui fonctionne aujourd’hui.

## Périmètre prévu

- Un plugin par calendrier, chacun avec ses tests : grégorien (vérifié face au julien autour du 1582-10-04/15), hijri (tabulaire), hébraïque, luni-solaire chinois, éthiopien et copte.
- Le Compte long, le Tzolkin et le Haab mayas, et le sol martien (MSD).
- Des notes sur les dates historiques roumaines (ancien style / nouveau style, le passage de 1919).
- Une interface de conversion : choisir deux calendriers, saisir une date et voir l’autre.
- Un lanceur de tests (`node --test`) qui vérifie les allers-retours `toJD`/`fromJD`.

Rien de tout cela n’est encore implémenté : chaque point est une tâche prête dans `ISSUES_GOOD_FIRST.md`.

## Contribuer en 5 minutes

1. Forkez ce dépôt.
2. Copiez `data/calendars/example.json` dans `data/calendars/` et modifiez-le.
3. Lancez `python scripts/validate.py`.
4. Ouvrez une pull request — aucune programmation n'est nécessaire pour les données.

## Bonnes premières tâches

Voir `ISSUES_GOOD_FIRST.md` pour des tâches toutes prêtes.

## Licence

Code : MIT. Données contribuées : indiquez la source ; elles sont publiées sous la même licence sauf mention contraire.

## Soutien

Si ce projet vous est utile, vous pouvez [m'offrir un café](https://buymeacoffee.com/echo.of.the.strings).
