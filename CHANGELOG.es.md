# Registro de cambios

[English](CHANGELOG.md) · [Română](CHANGELOG.ro.md) · [Français](CHANGELOG.fr.md) · [Italiano](CHANGELOG.it.md) · **Español** · [Português](CHANGELOG.pt.md) · [Deutsch](CHANGELOG.de.md) · [Magyar](CHANGELOG.hu.md)

Formato: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · [SemVer](https://semver.org/).

## [Sin publicar]

### Corregido
- Vista mensual: tras escribir una fecha, la primera pulsación en ‹ › (o en un botón «Copiar») se perdía, porque al salir del campo se redibujaba la página entre la pulsación y la liberación; ahora la página solo se redibuja si la fecha ha cambiado de verdad.

## [0.2.0] - 2026-11-17

### Añadido
- Un conversor funcional entre once calendarios (gregoriano, juliano, juliano revisado, hebreo, hégira tabular, persa, copto, etíope, lunisolar chino, maya, fecha solar marciana), un plugin probado para cada uno.
- Vista mensual con un segundo calendario, notas sobre el estilo antiguo/nuevo en Rumanía, Pascua occidental y ortodoxa, términos solares y Año Nuevo chino, y un atlas construido a partir de `data/calendars/`.
- Interfaz en ocho idiomas (con el orden de fecha de cada idioma), temas oscuro y claro, compatibilidad con teclado y lectores de pantalla, diseño móvil.
- Pruebas: `node --test` para plugins, motor, datos y traducciones; pruebas de navegador en el hub (todos los idiomas, accesibilidad, entradas hostiles, fechas fuera de intervalo).
- `src/`, `plugins/` y `scripts/build.mjs`: el único `index.html` se construye ahora a partir de las fuentes, y `--check` lo verifica.
- ISSUES_GOOD_FIRST y CODE_OF_CONDUCT traducidos a los ocho idiomas.
- README en inglés, rumano, francés, italiano, español, portugués, alemán y húngaro: secciones de estado y de alcance previsto (derivadas de `ISSUES_GOOD_FIRST.md`).
- Instalable (PWA): `manifest.webmanifest`, `sw.js` y los iconos los genera el kit común (`fff-kit/pwa`); la página funciona sin conexión tras la primera visita por HTTPS.

### Cambiado
- `data/calendars/example.json` describe ahora el calendario republicano francés (aún sin plugin) como plantilla para colaboradores.
- El workflow se ejecuta en Ubuntu 26.04 con Node.js 26 y ejecuta también las pruebas y la comprobación de la compilación.

## [0.1.0] - 2026-11-13

### Añadido
- Esqueleto inicial: estructura, esquema de datos o primeros ejemplos, guías de contribución en ocho idiomas.
