# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · **Français** · [Italiano](README.it.md) · [Español](README.es.md) · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Version : 0.2.0 · Dernière mise à jour : 2026-11-17

🌐 https://calendarium.chiuta.ro

> Atlas et convertisseur des calendriers du monde, un plugin par calendrier.

Trade-free : sans suivi, sans publicité, sans compte, fonctionne hors ligne.

## État

Alpha, utilisable : le convertisseur, la vue du mois, les notes sur les dates roumaines et l’atlas fonctionnent dans l’unique fichier `index.html` (à ouvrir hors ligne, sans serveur). Onze calendriers sont implémentés sous forme de plugins avec tests ; les limites sont indiquées plus bas.

## Ce que fait l’application

- Saisissez une date dans n’importe quel calendrier et voyez le même jour dans tous les autres : grégorien, julien, julien révisé (Milanković), hébraïque, hégirien (tabulaire), persan (hégire solaire), copte, éthiopien, luni-solaire chinois (avec mois intercalaires), maya (Compte long, Tzolk’in, Haab’) et date solaire martienne.
- Jour julien, jour julien modifié, jour de la semaine, semaine ISO, jour de l’année et jours depuis 1970-01-01.
- Vue du mois avec un second calendrier sous chaque jour ; un clic sur un jour le convertit.
- Notes roumaines : ancien style / nouveau style et écart en jours, le passage de 1919 dans le Vieux Royaume, une note sur la Transylvanie, le Banat et la Bucovine, Pâques occidentales et orthodoxes.
- Termes solaires chinois et Nouvel An de l’année choisie ; un atlas des calendriers construit à partir de `data/calendars/*.json`.
- Interface en huit langues, thèmes sombre et clair, accessible au clavier ; sans réseau, sans suivi.
- Installable comme une application et disponible hors ligne après la première visite lorsqu’elle est servie en HTTPS (un service worker conserve la page ; rien d’autre n’est stocké ni envoyé). Ouverte depuis un fichier téléchargé, elle fonctionne de la même manière, sans installation.

## Comment ça marche

- `plugins/<id>.js` : un module ES par calendrier (`toJD`, `fromJD`, `format`, `fields`) ; le contrat est décrit dans `CONTRIBUTING.md`.
- `src/engine.mjs` est de la logique pure (sans DOM) ; `src/ui.js`, `src/i18n.mjs` et `src/app.css` contiennent l’interface.
- `node scripts/build.mjs` assemble le tout dans l’unique `index.html` (et `--check` vérifie qu’il correspond à `src/`).
- `npm test` lance les tests : allers-retours sur de longues plages, dates historiques connues et garde-fous hors plage. Le développement demande Node.js 24 ou plus récent ; la page elle-même n’exige qu’un navigateur compatible ES2017.
- `manifest.webmanifest`, `sw.js` et les icônes sont produits par `node scripts/build.mjs` via le kit commun (section `pwa` de `src/app.json`) ; `--check` les vérifie aussi, et `npm test` contrôle que le manifeste, la version du service worker et la CSP correspondent à la page.

## Limites, dites clairement

- Le calendrier hégirien est le TABULAIRE (arithmétique) ; le calendrier observé ou Umm al-Qura peut différer de 1 à 2 jours. Avant l’an 1 de l’hégire, aucun résultat.
- Le calendrier persan est calculé astronomiquement (équinoxe de Meeus, midi à Téhéran) pour les années grégoriennes 1001–2999 ; hors de cet intervalle il ne donne aucun résultat.
- Le calendrier chinois utilise l’heure de Pékin (heure moyenne locale avant 1929) et est vérifié sur 26 dates du Nouvel An (1984–2034) et 21 mois intercalaires (1984–2039) ; avant 1645 c’est une extension proleptique, non l’histoire officielle ; hors des années grégoriennes −1999 à 3000, aucun résultat.
- Le calendrier maya utilise la corrélation GMT (584283) ; d’autres corrélations existent dans la littérature. Le calendrier hébraïque est l’arithmétique (dès l’année 1).
- La date solaire martienne est affichée pour 00:00 UT de la date choisie ; ΔT est approché par des polynômes (erreur inférieure à une minute de 1600 à 2100 ; l’incertitude augmente en dehors).
- Les dates d’adoption du calendrier grégorien hors de Roumanie ne sont pas incluses ; celles marquées « non vérifié » doivent être confirmées dans les sources primaires.

## Contribuer en 5 minutes

1. Forkez ce dépôt.
2. Copiez `data/calendars/example.json` dans `data/calendars/` et modifiez-le.
3. Lancez `python scripts/validate.py`.
4. Ouvrez une pull request — aucune programmation n'est nécessaire pour les données.
5. Pour ajouter un calendrier, écrivez `plugins/<id>.js` et ses tests, puis lancez `npm test` et `node scripts/build.mjs` (voir `CONTRIBUTING.md`).

## Bonnes premières tâches

Voir `ISSUES_GOOD_FIRST.md` pour des tâches toutes prêtes.

## Licence

Code : MIT. Données contribuées : indiquez la source ; elles sont publiées sous la même licence sauf mention contraire.

## Soutien

Si ce projet vous est utile, vous pouvez [m'offrir un café](https://buymeacoffee.com/echo.of.the.strings).
