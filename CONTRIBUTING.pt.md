# Como contribuir — CALENDARIUM

[English](CONTRIBUTING.md) · [Română](CONTRIBUTING.ro.md) · [Français](CONTRIBUTING.fr.md) · [Italiano](CONTRIBUTING.it.md) · [Español](CONTRIBUTING.es.md) · **Português** · [Deutsch](CONTRIBUTING.de.md) · [Magyar](CONTRIBUTING.hu.md)

Versão: 0.2.1 · Última atualização: 2026-11-20

1. Faça um fork deste repositório.
2. Copie `data/calendars/example.json` para `data/calendars/` e edite-o.
3. Execute `python scripts/validate.py`.
4. Abra um pull request — para dados não é preciso programar.

## Regras

- Uma entrada = um ficheiro.
- Cite sempre uma fonte.
- Contribua apenas com material que possa partilhar legalmente (sem texto protegido copiado).
- Seja gentil: veja o Código de Conduta.

## Acrescentar um plugin de calendário

1. Acrescente `data/calendars/<id>.json` (esquema em `schema.json`) e execute `python scripts/validate.py`.
2. Escreva `plugins/<id>.js` como módulo ES (sintaxe ES2017, sem imports) que exporte `id`, `fields` e:
   - `toJD(...fields)`: o dia juliano às 0 h UT da data, ou `NaN` se a data não existir ou estiver fora do intervalo;
   - `fromJD(jd)`: um objeto com os mesmos campos (os campos numéricos são `NaN` fora do intervalo suportado);
   - `format(date, L)`: o texto mostrado; `L.month(n)`, `L.era(year)`, `L.date(d, m, y)`, `L.t(key)` e `L.list(key)` vêm da interface;
   - opcionalmente `monthList(year, L)` → `[{v, n}]` e `monthTitle(year, month, leap, L)`.
3. Acrescente o id a `ORDER` e `GROUPS` em `src/engine.mjs`, e os textos `cal_<id>`, `reg_<id>` e `rule_<id>` nos oito idiomas de `src/i18n.mjs`.
4. Escreva testes em `test/`: idas e voltas num intervalo longo e datas conhecidas de uma fonte citada; execute `npm test`.
5. Execute `node scripts/build.mjs` e faça commit do `index.html` regenerado junto com `src/`.
