# Journal des modifications

[English](CHANGELOG.md) · [Română](CHANGELOG.ro.md) · **Français** · [Italiano](CHANGELOG.it.md) · [Español](CHANGELOG.es.md) · [Português](CHANGELOG.pt.md) · [Deutsch](CHANGELOG.de.md) · [Magyar](CHANGELOG.hu.md)

Format: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · [SemVer](https://semver.org/).

## [Non publié]

### Corrigé
- Vue mensuelle : après la saisie d'une date, le premier clic sur ‹ › (ou sur un bouton « Copier ») était perdu, car la sortie du champ redessinait la page entre l'appui et le relâchement ; la page n'est désormais redessinée que si la date a réellement changé.

## [0.2.0] - 2026-11-17

### Ajouté
- Un convertisseur fonctionnel entre onze calendriers (grégorien, julien, julien révisé, hébraïque, hégirien tabulaire, persan, copte, éthiopien, luni-solaire chinois, maya, date solaire martienne), un plugin testé pour chacun.
- Vue du mois avec un second calendrier, notes sur l’ancien/nouveau style en Roumanie, Pâques occidentales et orthodoxes, termes solaires et Nouvel An chinois, et un atlas construit à partir de `data/calendars/`.
- Interface en huit langues (avec l’ordre des dates propre à chaque langue), thèmes sombre et clair, prise en charge du clavier et des lecteurs d’écran, mise en page mobile.
- Tests : `node --test` pour les plugins, le moteur, les données et les traductions ; tests de navigateur dans le hub (toutes les langues, accessibilité, saisies hostiles, dates hors plage).
- `src/`, `plugins/` et `scripts/build.mjs` : l’unique `index.html` est désormais construit à partir des sources, et `--check` le vérifie.
- ISSUES_GOOD_FIRST et CODE_OF_CONDUCT traduits dans les huit langues.
- README en anglais, roumain, français, italien, espagnol, portugais, allemand et hongrois : sections d’état et de périmètre prévu (dérivées de `ISSUES_GOOD_FIRST.md`).
- Installable (PWA) : `manifest.webmanifest`, `sw.js` et les icônes sont générés par le kit commun (`fff-kit/pwa`) ; la page fonctionne hors ligne après la première visite en HTTPS.

### Modifié
- `data/calendars/example.json` décrit désormais le calendrier républicain français (pas encore de plugin) comme modèle pour les contributeurs.
- Le workflow s’exécute sur Ubuntu 26.04 avec Node.js 26 et lance aussi les tests et la vérification de la construction.

## [0.1.0] - 2026-11-13

### Ajouté
- Squelette initial : structure, schéma de données ou premiers exemples, guides de contribution en huit langues.
