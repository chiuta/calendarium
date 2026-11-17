# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Versión: 0.2.0 · Última actualización: 2026-11-17

🌐 https://calendarium.chiuta.ro

> Atlas y conversor de los calendarios del mundo, un plugin por calendario.

Trade-free: sin rastreo, sin anuncios, sin cuentas, funciona sin conexión.

## Estado

Alfa, utilizable: el conversor, la vista mensual, las notas sobre fechas rumanas y el atlas funcionan en el único archivo `index.html` (se abre sin conexión, sin servidor). Once calendarios están implementados como plugins con pruebas; los límites se enumeran más abajo.

## Qué hace

- Escribe una fecha en cualquier calendario y mira el mismo día en todos los demás: gregoriano, juliano, juliano revisado (Milanković), hebreo, hégira (tabular), persa (Hégira solar), copto, etíope, lunisolar chino (con meses intercalares), maya (Cuenta Larga, Tzolk’in, Haab’) y fecha solar marciana.
- Día juliano, día juliano modificado, día de la semana, semana ISO, día del año y días desde 1970-01-01.
- Vista mensual con un segundo calendario bajo cada día; un clic en un día lo convierte.
- Notas rumanas: estilo antiguo / estilo nuevo y diferencia en días, el cambio de 1919 en el Viejo Reino, una nota sobre Transilvania, el Banato y Bucovina, Pascua occidental y ortodoxa.
- Términos solares chinos y Año Nuevo del año elegido; un atlas de los calendarios construido a partir de `data/calendars/*.json`.
- Interfaz en ocho idiomas, temas oscuro y claro, accesible por teclado; sin red, sin rastreo.
- Instalable como aplicación y disponible sin conexión tras la primera visita cuando se sirve por HTTPS (un service worker conserva la página; no se guarda ni se envía nada más). Abierta desde un archivo descargado funciona igual, sin instalación.

## Cómo funciona

- `plugins/<id>.js`: un módulo ES por calendario (`toJD`, `fromJD`, `format`, `fields`); el contrato se describe en `CONTRIBUTING.md`.
- `src/engine.mjs` es lógica pura (sin DOM); `src/ui.js`, `src/i18n.mjs` y `src/app.css` contienen la interfaz.
- `node scripts/build.mjs` ensambla todo en el único `index.html` (y `--check` verifica que coincide con `src/`).
- `npm test` ejecuta las pruebas: idas y vueltas en intervalos largos, fechas históricas conocidas y protecciones fuera de intervalo. El desarrollo requiere Node.js 24 o posterior; la página solo necesita un navegador con ES2017.
- `manifest.webmanifest`, `sw.js` y los iconos los produce `node scripts/build.mjs` mediante el kit común (sección `pwa` de `src/app.json`); `--check` también los verifica, y `npm test` comprueba que el manifiesto, la versión del service worker y la CSP coincidan con la página.

## Límites, dichos con claridad

- El calendario hégira es el TABULAR (aritmético); el observado o Umm al-Qura puede diferir en 1–2 días. Antes del año 1 de la Hégira no da resultado.
- El calendario persa se calcula astronómicamente (equinoccio de Meeus, mediodía en Teherán) para los años gregorianos 1001–2999; fuera de ese intervalo no da resultado.
- El calendario chino usa la hora de Pekín (hora local media antes de 1929) y está comprobado con 26 fechas de Año Nuevo (1984–2034) y 21 meses intercalares (1984–2039); antes de 1645 es una extensión proléptica, no la historia oficial; fuera de los años gregorianos −1999 a 3000 no da resultado.
- El calendario maya usa la correlación GMT (584283); en la literatura existen otras. El calendario hebreo es el aritmético (desde el año 1).
- La fecha solar marciana se muestra para las 00:00 UT de la fecha elegida; ΔT se aproxima con polinomios (error inferior a un minuto entre 1600 y 2100; fuera de ese intervalo la incertidumbre crece).
- No se incluyen las fechas de adopción del calendario gregoriano fuera de Rumanía; las marcadas «sin verificar» deben confirmarse en fuentes primarias.

## Contribuye en 5 minutos

1. Haz un fork de este repositorio.
2. Copia `data/calendars/example.json` en `data/calendars/` y edítalo.
3. Ejecuta `python scripts/validate.py`.
4. Abre un pull request: para los datos no hace falta programar.
5. Para añadir un calendario, escribe `plugins/<id>.js` y sus pruebas, y ejecuta `npm test` y `node scripts/build.mjs` (consulta `CONTRIBUTING.md`).

## Buenas primeras tareas

Consulta `ISSUES_GOOD_FIRST.md` para tareas ya preparadas.

## Licencia

Código: MIT. Datos aportados: indica la fuente; se publican con la misma licencia salvo que el archivo diga otra cosa.

## Apoyo

Si el proyecto te resulta útil, puedes [invitarme a un café](https://buymeacoffee.com/echo.of.the.strings).
