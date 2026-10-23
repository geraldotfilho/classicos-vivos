# 📚✨ Clássicos Vivos

> **Grandes histórias da humanidade reimaginadas para pequenos leitores.**

O **Clássicos Vivos** é uma biblioteca aberta de livros digitais interativos que adapta grandes obras da literatura mundial para crianças em fase de alfabetização (a partir de 6 anos). 

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
| 🛡️ **Dom Quixote de La Mancha** | Miguel de Cervantes | 🚧 Em produção | [Parte 1: O Grande Sonho do Cavaleiro](./dom-quixote/parte-1.html) |

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

Arquitetura, regras pedagógicas e fluxo de ilustração: [`AGENTS.md`](AGENTS.md). Próximos passos: [`docs/BACKLOG.md`](docs/BACKLOG.md) e [`docs/TODO-NANO-BANANA.md`](docs/TODO-NANO-BANANA.md).

---

## 🤝 Como Contribuir

Sugestões de melhorias pedagógicas, novas interações visuais, correções de pronúncia ou adaptações de novos clássicos são muito bem-vindas! Sinta-se à vontade para abrir uma *Issue* ou enviar um *Pull Request*.

---

## 📄 Licença

Este projeto é totalmente livre e aberto, distribuído sob licenciamento duplo para cobrir tanto o software quanto o conteúdo criativo:

- **Código-fonte (HTML/CSS/JS):** Licenciado sob a [MIT License](LICENSE).
- **Textos adaptados e ilustrações:** Licenciados sob a [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/deed.pt_BR) — você pode usar, compartilhar, imprimir em escolas e adaptar livremente para qualquer fim, bastando manter o crédito ao projeto **Clássicos Vivos**.
