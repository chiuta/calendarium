# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Versão: 0.2.0 · Última atualização: 2026-11-17

🌐 https://calendarium.chiuta.ro

> Atlas e conversor dos calendários do mundo, um plugin por calendário.

Trade-free: sem rastreamento, sem anúncios, sem contas, funciona offline.

## Estado

Alfa, utilizável: o conversor, a vista mensal, as notas sobre datas romenas e o atlas funcionam no único ficheiro `index.html` (abre-se offline, sem servidor). Onze calendários estão implementados como plugins com testes; os limites estão listados abaixo.

## O que faz

- Escreva uma data em qualquer calendário e veja o mesmo dia em todos os outros: gregoriano, juliano, juliano revisto (Milanković), hebraico, hégira (tabular), persa (Hégira solar), copta, etíope, lunissolar chinês (com meses intercalares), maia (Contagem Longa, Tzolk’in, Haab’) e data solar marciana.
- Dia juliano, dia juliano modificado, dia da semana, semana ISO, dia do ano e dias desde 1970-01-01.
- Vista mensal com um segundo calendário sob cada dia; um clique num dia converte-o.
- Notas romenas: estilo antigo / estilo novo e diferença em dias, a mudança de 1919 no Velho Reino, uma nota sobre a Transilvânia, o Banato e a Bucovina, Páscoa ocidental e ortodoxa.
- Termos solares chineses e Ano Novo do ano escolhido; um atlas dos calendários construído a partir de `data/calendars/*.json`.
- Interface em oito idiomas, temas escuro e claro, acessível por teclado; sem rede, sem rastreamento.
- Instalável como aplicação e disponível offline após a primeira visita quando servida por HTTPS (um service worker guarda a página; nada mais é guardado ou enviado). Aberta a partir de um ficheiro descarregado funciona da mesma forma, sem instalação.

## Como funciona

- `plugins/<id>.js`: um módulo ES por calendário (`toJD`, `fromJD`, `format`, `fields`); o contrato está descrito em `CONTRIBUTING.md`.
- `src/engine.mjs` é lógica pura (sem DOM); `src/ui.js`, `src/i18n.mjs` e `src/app.css` contêm a interface.
- `node scripts/build.mjs` monta tudo no único `index.html` (e `--check` verifica que coincide com `src/`).
- `npm test` executa os testes: idas e voltas em intervalos longos, datas históricas conhecidas e proteções fora do intervalo. O desenvolvimento exige Node.js 24 ou posterior; a página só precisa de um navegador com ES2017.
- `manifest.webmanifest`, `sw.js` e os ícones são produzidos por `node scripts/build.mjs` através do kit comum (secção `pwa` de `src/app.json`); `--check` também os verifica, e `npm test` confirma que o manifesto, a versão do service worker e a CSP correspondem à página.

## Limites, ditos com clareza

- O calendário hégira é o TABULAR (aritmético); o observado ou Umm al-Qura pode diferir 1–2 dias. Antes do ano 1 da Hégira não dá resultado.
- O calendário persa é calculado astronomicamente (equinócio de Meeus, meio-dia em Teerão) para os anos gregorianos 1001–2999; fora desse intervalo não dá resultado.
- O calendário chinês usa a hora de Pequim (hora local média antes de 1929) e está verificado com 26 datas de Ano Novo (1984–2034) e 21 meses intercalares (1984–2039); antes de 1645 é uma extensão proléptica, não a história oficial; fora dos anos gregorianos −1999 a 3000 não dá resultado.
- O calendário maia usa a correlação GMT (584283); existem outras na literatura. O calendário hebraico é o aritmético (desde o ano 1).
- A data solar marciana é mostrada para as 00:00 UT da data escolhida; ΔT é aproximado por polinómios (erro inferior a um minuto entre 1600 e 2100; fora desse intervalo a incerteza aumenta).
- As datas de adoção do calendário gregoriano fora da Roménia não estão incluídas; as marcadas «por verificar» devem ser confirmadas em fontes primárias.

## Contribua em 5 minutos

1. Faça um fork deste repositório.
2. Copie `data/calendars/example.json` para `data/calendars/` e edite-o.
3. Execute `python scripts/validate.py`.
4. Abra um pull request — para dados não é preciso programar.
5. Para acrescentar um calendário, escreva `plugins/<id>.js` e os seus testes, depois execute `npm test` e `node scripts/build.mjs` (veja `CONTRIBUTING.md`).

## Boas primeiras tarefas

Veja `ISSUES_GOOD_FIRST.md` para tarefas prontas.

## Licença

Código: MIT. Dados contribuídos: indique a fonte; são publicados sob a mesma licença, salvo indicação em contrário.

## Apoio

Se o projeto lhe for útil, pode [oferecer-me um café](https://buymeacoffee.com/echo.of.the.strings).
