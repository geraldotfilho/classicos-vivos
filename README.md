# 📚✨ Clássicos Vivos

> **Grandes histórias da humanidade reimaginadas para pequenos leitores.**

O **Clássicos Vivos** é uma biblioteca aberta de livros digitais interativos que adapta grandes obras da literatura mundial para crianças em fase de alfabetização (5 a 8 anos), com fidelidade ao espírito da obra e cuidado com a proteção da infância.

Cada livro é construído como uma aplicação web leve e autônoma (HTML5, CSS3, Web Audio e Web Speech API), pensada especialmente para leitura em **tablets**, sem depender de servidores externos ou instalações complexas.

---

## 🎯 Pilares do Projeto

- **🎓 Apoio à Alfabetização:** Palavras-chave em `LETRAS MAIÚSCULAS` ao longo do texto que, ao serem tocadas, abrem um cartão pedagógico e pronunciam a palavra **sílaba por sílaba** de forma pausada.
- **🔊 Leitura Guiada em Voz Alta:** Narração frase por frase com destaque visual sincronizado para a criança acompanhar o ritmo da leitura.
- **✨ Ilustrações que Reagem ao Toque:** Cenários interativos e recursos visuais lúdicos — como a *Lente da Realidade vs. Lente da Imaginação* — que convidam a criança a participar da narrativa.
- **🪶 Fidelidade Literária Acessível:** Adaptações que respeitam a essência, o humor e os episódios marcantes das obras originais, traduzidos para uma linguagem acolhedora e envolvente.

---

## 📖 Acervo em Construção

| Obra | Autor Original | Status | Capítulos Disponíveis |
| :--- | :--- | :--- | :--- |
| 🛡️ **Dom Quixote de La Mancha** · primeiro volume (1605) | Miguel de Cervantes | ✅ Partes 1–3 ilustradas, narradas e traduzidas (en, fr, es) · 🔁 Parte 4 sendo refeita | [Parte 1](./dom-quixote/parte-1.html) · [Parte 2](./dom-quixote/parte-2.html) · [Parte 3](./dom-quixote/parte-3.html) · [Parte 4](./dom-quixote/parte-4.html) |
| 🛡️ **Dom Quixote de La Mancha** · segundo volume (1615) | Miguel de Cervantes | 🚧 Partes 5–7 em produção | — |

---

## 🚀 Como Usar

1. **Pelo navegador do tablet** (GitHub Pages): na primeira visita com internet, o livro é baixado por inteiro (~6 MB) e depois **abre mesmo sem conexão**. No Chrome Android, use *"Adicionar à tela inicial"* para instalar como aplicativo em tela cheia.
2. **Sem internet desde o início**: baixe o repositório (*Code → Download ZIP*), descompacte e abra `index.html`. Tudo é local: estilos, fontes, ícones e ilustrações. Nenhum CDN é usado.

## 🛠️ Para Desenvolvedores

O leitor não exige build. Os arquivos gerados ficam versionados em `assets/` e `sw.js`. Depois de editar um livro:

```bash
npm install          # uma vez
npm run build        # regenera CSS (Tailwind), fontes, ícones e o service worker
npm run build:images # converte novas ilustrações JPG/PNG para WebP
```

Cada livro é só configuração sobre o motor comum [`assets/js/livro.js`](assets/js/livro.js).

- **Agentes de IA e pessoas que vão trabalhar no projeto**: comecem por [`docs/RETOMADA.md`](docs/RETOMADA.md) (onde o trabalho parou) e [`AGENTS.md`](AGENTS.md) (filosofia, arquitetura, regras e ordem de leitura, §0).
- **Como se cria um livro**: a receita geral [`docs/RECEITA-CLASSICO-VIVO.md`](docs/RECEITA-CLASSICO-VIVO.md) e as receitas específicas de cada obra em [`docs/receitas/`](docs/receitas/).
- **Pendências e histórico**: [`docs/BACKLOG.md`](docs/BACKLOG.md) e [`docs/HISTORICO.md`](docs/HISTORICO.md).

---

## 🤝 Como Contribuir

Sugestões de melhorias pedagógicas, novas interações visuais, correções de pronúncia ou adaptações de novos clássicos são muito bem-vindas! Sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.

---

## 📄 Licença

Este projeto é totalmente livre e aberto, distribuído sob licenciamento duplo para cobrir tanto o software quanto o conteúdo criativo:

- **Código-fonte (HTML/CSS/JS):** Licenciado sob a [MIT License](LICENSE).
- **Textos adaptados e ilustrações:** Licenciados sob a [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.pt_BR) — completamente livres para usar, reproduzir, copiar, compartilhar, distribuir e readaptar para qualquer fim (livre como em liberdade!), bastando manter os créditos ao projeto **Clássicos Vivos**.
