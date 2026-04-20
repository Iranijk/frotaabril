-- Este script adiciona as políticas necessárias para o bucket 'images' no Supabase Storage.
-- Ele permite o acesso público de leitura e que usuários autenticados gerenciem arquivos na pasta 'parceiros'.

-- Apaga políticas antigas, se existirem, para evitar conflitos.
DROP POLICY IF EXISTS "Public read access for images" ON storage.objects;
DROP POLICY IF EXISTS "Allow insert on parceiros folder for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Allow update on parceiros folder for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete on parceiros folder for authenticated users" ON storage.objects;

-- 1. Permite o acesso público de leitura a todos os arquivos no bucket 'images'.
-- Isso é necessário para que as páginas públicas (como a de Parceiros) exibam as imagens.
CREATE POLICY "Public read access for images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

DROP POLICY IF EXISTS "Allow public management on parceiros folder" ON storage.objects;

-- 2. Permite que qualquer pessoa (público) gerencie arquivos na pasta 'parceiros'.
CREATE POLICY "Allow public management on parceiros folder"
ON storage.objects FOR ALL
USING ( bucket_id = 'images' AND starts_with(name, 'parceiros/') )
WITH CHECK ( bucket_id = 'images' AND starts_with(name, 'parceiros/') );