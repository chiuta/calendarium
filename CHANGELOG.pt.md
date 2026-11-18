# Registo de alterações

[English](CHANGELOG.md) · [Română](CHANGELOG.ro.md) · [Français](CHANGELOG.fr.md) · [Italiano](CHANGELOG.it.md) · [Español](CHANGELOG.es.md) · **Português** · [Deutsch](CHANGELOG.de.md) · [Magyar](CHANGELOG.hu.md)

Formato: [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) · [SemVer](https://semver.org/).

## [Não lançado]

### Corrigido
- Vista mensal: depois de digitar uma data, o primeiro clique em ‹ › (ou num botão «Copiar») perdia-se, porque a saída do campo redesenhava a página entre o premir e o soltar; agora a página só é redesenhada se a data tiver mesmo mudado.

## [0.2.0] - 2026-11-17

### Adicionado
- Um conversor funcional entre onze calendários (gregoriano, juliano, juliano revisto, hebraico, hégira tabular, persa, copta, etíope, lunissolar chinês, maia, data solar marciana), um plugin testado para cada um.
- Vista mensal com um segundo calendário, notas sobre o estilo antigo/novo na Roménia, Páscoa ocidental e ortodoxa, termos solares e Ano Novo chinês, e um atlas construído a partir de `data/calendars/`.
- Interface em oito idiomas (com a ordem da data de cada idioma), temas escuro e claro, suporte para teclado e leitores de ecrã, disposição para telemóvel.
- Testes: `node --test` para plugins, motor, dados e traduções; testes de navegador no hub (todos os idiomas, acessibilidade, entradas hostis, datas fora do intervalo).
- `src/`, `plugins/` e `scripts/build.mjs`: o único `index.html` é agora construído a partir das fontes, e `--check` verifica-o.
- ISSUES_GOOD_FIRST e CODE_OF_CONDUCT traduzidos para as oito línguas.
- README em inglês, romeno, francês, italiano, espanhol, português, alemão e húngaro: secções de estado e de âmbito previsto (derivadas de `ISSUES_GOOD_FIRST.md`).
- Instalável (PWA): `manifest.webmanifest`, `sw.js` e os ícones são gerados pelo kit comum (`fff-kit/pwa`); a página funciona offline após a primeira visita por HTTPS.

### Alterado
- `data/calendars/example.json` descreve agora o calendário republicano francês (ainda sem plugin) como modelo para colaboradores.
- O workflow corre em Ubuntu 26.04 com Node.js 26 e executa também os testes e a verificação da compilação.

## [0.1.0] - 2026-11-13

### Adicionado
- Esqueleto inicial: estrutura, esquema de dados ou primeiros exemplos, guias de contribuição em oito línguas.
