-- Script para criação da tabela de associados
CREATE TABLE associados (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL UNIQUE,
  email TEXT NOT NULL UNIQUE,
  telefone TEXT,
  cep TEXT,
  logradouro TEXT,
  bairro TEXT,
  cidade TEXT,
  estado TEXT,
  numero_imovel TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Script para criação da tabela de parceiros
-- AVISO: O script abaixo irá apagar e recriar a tabela 'parceiros'.
DROP TABLE IF EXISTS public.parceiros;
CREATE TABLE public.parceiros (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome TEXT NOT NULL,
  imagem TEXT,
  endereco TEXT,
  site TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Habilita a Segurança em Nível de Linha (RLS)
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;

-- Cria políticas de acesso
-- Esta política permite acesso público de leitura para todos.
CREATE POLICY "Public read access for partners"
ON public.parceiros FOR SELECT USING (true);

-- Esta política permite que qualquer pessoa (anônima ou autenticada) insira novos parceiros.
CREATE POLICY "Allow public insert for partners"
ON public.parceiros FOR INSERT WITH CHECK (true);
