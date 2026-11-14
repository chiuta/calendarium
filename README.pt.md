# CALENDARIUM

[English](README.md) · [Română](README.ro.md) · [Français](README.fr.md) · [Italiano](README.it.md) · [Español](README.es.md) · **Português** · [Deutsch](README.de.md) · [Magyar](README.hu.md)

Versão: 0.1.0 · Última atualização: 2026-11-14

🌐 https://calendarium.chiuta.ro

> Atlas e conversor dos calendários do mundo, um plugin por calendário.

Trade-free: sem rastreamento, sem anúncios, sem contas, funciona offline.

## Estado

Alfa: o repositório contém a estrutura, o esquema de dados ou os primeiros exemplos e os guias de contribuição. O âmbito abaixo é o plano, não o que funciona hoje.

## Âmbito previsto

- Um plugin por calendário, cada um com os seus testes: gregoriano (verificado face ao juliano por volta de 1582-10-04/15), hijri (tabular), hebraico, lunissolar chinês, etíope e copta.
- A Contagem Longa, o Tzolkin e o Haab maias, e o sol marciano (MSD).
- Notas sobre as datas históricas romenas (estilo antigo / estilo novo, a mudança de 1919).
- Uma interface de conversão: escolhe dois calendários, escreve uma data e vê a outra.
- Um executor de testes (`node --test`) que verifica as idas e voltas `toJD`/`fromJD`.

Nada disto está ainda implementado: cada ponto é uma tarefa preparada em `ISSUES_GOOD_FIRST.md`.

## Contribua em 5 minutos

1. Faça um fork deste repositório.
2. Copie `data/calendars/example.json` para `data/calendars/` e edite-o.
3. Execute `python scripts/validate.py`.
4. Abra um pull request — para dados não é preciso programar.

## Boas primeiras tarefas

Veja `ISSUES_GOOD_FIRST.md` para tarefas prontas.

## Licença

Código: MIT. Dados contribuídos: indique a fonte; são publicados sob a mesma licença, salvo indicação em contrário.

## Apoio

Se o projeto lhe for útil, pode [oferecer-me um café](https://buymeacoffee.com/echo.of.the.strings).
