# Contribuer — CALENDARIUM

[English](CONTRIBUTING.md) · [Română](CONTRIBUTING.ro.md) · **Français** · [Italiano](CONTRIBUTING.it.md) · [Español](CONTRIBUTING.es.md) · [Português](CONTRIBUTING.pt.md) · [Deutsch](CONTRIBUTING.de.md) · [Magyar](CONTRIBUTING.hu.md)

Version : 0.2.0 · Dernière mise à jour : 2026-11-17

1. Forkez ce dépôt.
2. Copiez `data/calendars/example.json` dans `data/calendars/` et modifiez-le.
3. Lancez `python scripts/validate.py`.
4. Ouvrez une pull request — aucune programmation n'est nécessaire pour les données.

## Règles

- Une entrée = un fichier.
- Citez toujours une source.
- Ne contribuez qu'avec du matériel que vous pouvez légalement partager (pas de texte protégé copié).
- Soyez bienveillant : voir le Code de conduite.

## Ajouter un plugin de calendrier

1. Ajoutez `data/calendars/<id>.json` (schéma dans `schema.json`) et lancez `python scripts/validate.py`.
2. Écrivez `plugins/<id>.js` comme module ES (syntaxe ES2017, sans imports) qui exporte `id`, `fields` et :
   - `toJD(...fields)` : le jour julien à 0 h UT de la date, ou `NaN` si la date n’existe pas ou est hors plage ;
   - `fromJD(jd)` : un objet avec les mêmes champs (les champs numériques valent `NaN` hors de la plage prise en charge) ;
   - `format(date, L)` : la chaîne affichée ; `L.month(n)`, `L.era(year)`, `L.date(d, m, y)`, `L.t(key)` et `L.list(key)` viennent de l’interface ;
   - en option `monthList(year, L)` → `[{v, n}]` et `monthTitle(year, month, leap, L)`.
3. Ajoutez l’identifiant à `ORDER` et `GROUPS` dans `src/engine.mjs`, et les textes `cal_<id>`, `reg_<id>` et `rule_<id>` dans les huit langues de `src/i18n.mjs`.
4. Écrivez des tests dans `test/` : allers-retours sur une longue plage et dates connues d’une source citée ; lancez `npm test`.
5. Lancez `node scripts/build.mjs` et validez l’`index.html` régénéré avec `src/`.
