# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · **Español** · [Português](README.pt.md) · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Versión: 0.1.0 · Última actualización: 2026-11-14

🌐 https://calendarium.chiuta.ro

> Atlas y conversor de los calendarios del mundo, un plugin por calendario.

Trade-free: sin rastreo, sin anuncios, sin cuentas, funciona sin conexión.

## Estado

Alfa: el repositorio contiene la estructura, el esquema de datos o los primeros ejemplos y las guías de contribución. El alcance de abajo es el plan, no lo que funciona hoy.

## Alcance previsto

- Un plugin por calendario, cada uno con sus pruebas: gregoriano (comprobado frente al juliano en torno a 1582-10-04/15), hijri (tabular), hebreo, lunisolar chino, etíope y copto.
- La Cuenta Larga, el Tzolkin y el Haab mayas, y el sol marciano (MSD).
- Notas sobre las fechas históricas rumanas (estilo antiguo / estilo nuevo, el cambio de 1919).
- Una interfaz de conversión: elige dos calendarios, escribe una fecha y mira la otra.
- Un ejecutor de pruebas (`node --test`) que comprueba las idas y vueltas `toJD`/`fromJD`.

Nada de esto está implementado todavía: cada punto es una tarea preparada en `ISSUES_GOOD_FIRST.md`.

## Contribuye en 5 minutos

1. Haz un fork de este repositorio.
2. Copia `data/calendars/example.json` en `data/calendars/` y edítalo.
3. Ejecuta `python scripts/validate.py`.
4. Abre un pull request: para los datos no hace falta programar.

## Buenas primeras tareas

Consulta `ISSUES_GOOD_FIRST.md` para tareas ya preparadas.

## Licencia

Código: MIT. Datos aportados: indica la fuente; se publican con la misma licencia salvo que el archivo diga otra cosa.

## Apoyo

Si el proyecto te resulta útil, puedes [invitarme a un café](https://buymeacoffee.com/echo.of.the.strings).
