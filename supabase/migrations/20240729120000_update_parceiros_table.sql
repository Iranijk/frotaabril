-- Este script atualiza a tabela 'parceiros' para corresponder às necessidades da aplicação.
-- AVISO: Este script irá apagar a tabela 'parceiros' existente e criar uma nova.
-- Isso resultará na perda de todos os dados de parceiros atuais.
-- Por favor, faça um backup dos seus dados antes de executar este script no SQL Editor do Supabase.

-- 1. Apaga a tabela antiga se ela existir
DROP TABLE IF EXISTS public.parceiros;

-- 2. Cria a nova tabela com as colunas corretas
CREATE TABLE public.parceiros (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome TEXT NOT NULL,
  imagem TEXT,
  endereco TEXT,
  site TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- 3. Habilita a Segurança em Nível de Linha (RLS)
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;

-- 4. Cria políticas de acesso
-- Esta política permite acesso público de leitura para todos.
CREATE POLICY "Public read access for partners"
ON public.parceiros FOR SELECT USING (true);

-- Esta política permite que qualquer pessoa (anônima ou autenticada) insira novos parceiros.
CREATE POLICY "Allow public insert for partners"
ON public.parceiros FOR INSERT WITH CHECK (true);