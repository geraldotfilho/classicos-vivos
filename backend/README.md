# Backend · Clássicos Vivos (Vercel + Supabase + GitHub Issues)

Ponte serverless mínima (zero dependências externas) que recebe:
- **Revisões do autor** → Issues no GitHub com etiqueta `revisao-autor`
- **Sugestões de leitores** → Issues no GitHub com etiqueta `sugestao-leitor`
- **Avaliações (0 a 5 estrelas) e comentários** → salvos no Supabase (`comentarios` nascem como `pendente`; `email` opcional fica privado)
- **Mini-painel de moderação** → servido na própria raiz `/` (ou `/admin`) deste projeto Vercel

---

## 1. Configurar o Supabase (1 vez)
1. Crie um projeto gratuito no [Supabase](https://supabase.com) (ou use um existente).
2. Abra **SQL Editor** e execute o arquivo [`supabase.sql`](./supabase.sql).
3. Em **Project Settings → API**, copie:
   - `Project URL` → `SUPABASE_URL`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY`

## 2. Criar o Token do GitHub (1 vez)
1. No GitHub: **Settings → Developer settings → Personal access tokens → Fine-grained tokens → Generate new token**.
2. Em **Repository access**, selecione **Only select repositories** → `geraldotfilho/classicos-vivos`.
3. Em **Repository permissions**, marque apenas **Issues: Read and write**.
4. Copie o token → `GITHUB_TOKEN`.

## 3. Publicar na Vercel
1. Na Vercel, importe o repositório `geraldotfilho/classicos-vivos`.
2. Em **Root Directory**, defina **`backend`**.
3. Em **Environment Variables**, cadastre as variáveis de [`.env.example`](./.env.example):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `GITHUB_TOKEN`
   - `GITHUB_OWNER` = `geraldotfilho`
   - `GITHUB_REPO` = `classicos-vivos`
   - `AUTHOR_KEY` = *(sua frase/senha secreta única para Modo Autor + Painel Admin)*
4. Faça o deploy. Se a URL gerada não for `https://classicos-vivos-api.vercel.app`, atualize `API_BASE_PADRAO` em `../assets/js/colaboracao.js` (e rode `npm run build` na raiz do repositório).

## 4. Como usar
- **No seu tablet**: abra qualquer livro (ou `sobre.html`), toque no botão de anotação (ou no bloco *Modo Autor* em `sobre.html`) e informe sua `AUTHOR_KEY` uma única vez. A partir daí, o botão abre direto sem trava infantil, suas notas vão como `revisao-autor` e até funcionam offline (ficam na fila até reconectar).
- **Para moderar comentários**: acesse `https://<sua-url-vercel>/admin` e entre com a mesma `AUTHOR_KEY`.
- **Com agentes de IA**: abra uma nova sessão e diga *"trate os pedidos de revisão que deixei no site"* (ou rode `npm run revisoes`).
