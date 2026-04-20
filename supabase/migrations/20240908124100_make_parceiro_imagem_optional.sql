-- Torna o campo imagem opcional na tabela parceiros
ALTER TABLE public.parceiros ALTER COLUMN imagem DROP NOT NULL;