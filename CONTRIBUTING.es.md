# Cómo contribuir — CALENDARIUM

[English](CONTRIBUTING.md) · [Română](CONTRIBUTING.ro.md) · [Français](CONTRIBUTING.fr.md) · [Italiano](CONTRIBUTING.it.md) · **Español** · [Português](CONTRIBUTING.pt.md) · [Deutsch](CONTRIBUTING.de.md) · [Magyar](CONTRIBUTING.hu.md)

Versión: 0.2.0 · Última actualización: 2026-11-17

1. Haz un fork de este repositorio.
2. Copia `data/calendars/example.json` en `data/calendars/` y edítalo.
3. Ejecuta `python scripts/validate.py`.
4. Abre un pull request: para los datos no hace falta programar.

## Reglas

- Una entrada = un archivo.
- Cita siempre una fuente.
- Aporta solo material que puedas compartir legalmente (sin texto protegido copiado).
- Sé amable: consulta el Código de conducta.

## Añadir un plugin de calendario

1. Añade `data/calendars/<id>.json` (esquema en `schema.json`) y ejecuta `python scripts/validate.py`.
2. Escribe `plugins/<id>.js` como módulo ES (sintaxis ES2017, sin imports) que exporte `id`, `fields` y:
   - `toJD(...fields)`: el día juliano a las 0 h UT de la fecha, o `NaN` si la fecha no existe o está fuera de intervalo;
   - `fromJD(jd)`: un objeto con los mismos campos (los campos numéricos son `NaN` fuera del intervalo admitido);
   - `format(date, L)`: la cadena que se muestra; `L.month(n)`, `L.era(year)`, `L.date(d, m, y)`, `L.t(key)` y `L.list(key)` vienen de la interfaz;
   - opcionalmente `monthList(year, L)` → `[{v, n}]` y `monthTitle(year, month, leap, L)`.
3. Añade el id a `ORDER` y `GROUPS` en `src/engine.mjs`, y los textos `cal_<id>`, `reg_<id>` y `rule_<id>` en los ocho idiomas de `src/i18n.mjs`.
4. Escribe pruebas en `test/`: idas y vueltas en un intervalo largo y fechas conocidas de una fuente citada; ejecuta `npm test`.
5. Ejecuta `node scripts/build.mjs` y haz commit del `index.html` regenerado junto con `src/`.
