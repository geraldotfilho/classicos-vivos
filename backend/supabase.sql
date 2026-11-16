-- Clássicos Vivos: esquema inicial no Supabase
-- Rode no SQL Editor do projeto Supabase. Idempotente (seguro rodar mais de uma vez).

create extension if not exists pgcrypto;

-- 1. Notas de 0 a 5 estrelas por parte do livro (1 voto por aparelho/navegador)
create table if not exists public.cv_avaliacoes (
    id uuid primary key default gen_random_uuid(),
    slug text not null,
    obra text not null,
    parte integer not null,
    device_id text not null,
    estrelas smallint not null check (estrelas >= 0 and estrelas <= 5),
    criado_em timestamptz not null default now(),
    atualizado_em timestamptz not null default now(),
    unique (slug, device_id)
);

create index if not exists idx_cv_avaliacoes_slug on public.cv_avaliacoes (slug);

-- 2. Comentários opcionais (nascem como 'pendente'; e-mail é privado e nunca vai para o endpoint público)
create table if not exists public.cv_comentarios (
    id uuid primary key default gen_random_uuid(),
    slug text not null,
    obra text not null,
    parte integer not null,
    device_id text not null,
    estrelas smallint check (estrelas >= 0 and estrelas <= 5),
    nome text not null default 'Leitor(a)',
    email text,
    comentario text not null,
    status text not null default 'pendente' check (status in ('pendente', 'aprovado', 'rejeitado')),
    criado_em timestamptz not null default now(),
    moderado_em timestamptz
);

create index if not exists idx_cv_comentarios_slug_status on public.cv_comentarios (slug, status, criado_em desc);

-- 3. Controle simples de taxa (anti-spam) por janela de 1 hora
create table if not exists public.cv_rate_limits (
    chave text primary key,
    contagem integer not null default 1,
    janela_inicio timestamptz not null default now()
);

-- Segurança: ativa RLS sem políticas públicas.
-- Apenas a chave service_role (usada exclusivamente na Vercel) acessa estas tabelas.
alter table public.cv_avaliacoes enable row level security;
alter table public.cv_comentarios enable row level security;
alter table public.cv_rate_limits enable row level security;
