-- Este script cria a tabela 'parceiros' com a estrutura correta para a aplicação.
-- Nota: Este schema foi atualizado para corresponder às necessidades da UI.

CREATE TABLE IF NOT EXISTS public.parceiros (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  nome TEXT NOT NULL,
  imagem TEXT,
  endereco TEXT,
  site TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Habilita a Segurança em Nível de Linha (RLS) se ainda não estiver habilitada.
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;

-- Cria políticas de acesso se elas não existirem.
-- Esta política permite acesso público de leitura para todos.
CREATE POLICY "Public read access for partners"
ON public.parceiros FOR SELECT USING (true);

-- Esta política permite que qualquer pessoa (anônima ou autenticada) insira novos parceiros.
CREATE POLICY "Allow public insert for partners"
ON public.parceiros FOR INSERT WITH CHECK (true);
