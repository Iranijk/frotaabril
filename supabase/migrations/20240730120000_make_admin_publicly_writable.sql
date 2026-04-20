-- WARNING: Este script torna a inserção de parceiros e o upload de imagens
-- uma ação pública, permitida para qualquer usuário (anônimo ou autenticado).
-- Isso é uma grande brecha de segurança. Use por sua conta e risco.

-- 1. Atualizar política da tabela 'parceiros' para permitir inserção pública
DROP POLICY IF EXISTS "Allow insert for authenticated users" ON public.parceiros;
DROP POLICY IF EXISTS "Allow public insert for partners" ON public.parceiros;

CREATE POLICY "Allow public insert for partners"
ON public.parceiros FOR INSERT
WITH CHECK (true);


-- 2. Atualizar políticas do Storage para permitir upload público na pasta 'parceiros'
-- Apaga políticas antigas
DROP POLICY IF EXISTS "Allow insert on parceiros folder for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Allow update on parceiros folder for authenticated users" ON storage.objects;
DROP POLICY IF EXISTS "Allow delete on parceiros folder for authenticated users" ON storage.objects;

DROP POLICY IF EXISTS "Allow public insert on parceiros folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow public update on parceiros folder" ON storage.objects;
DROP POLICY IF EXISTS "Allow public delete on parceiros folder" ON storage.objects;

DROP POLICY IF EXISTS "Allow public management on parceiros folder" ON storage.objects;

-- Permite que qualquer pessoa (público) gerencie arquivos na pasta 'parceiros'.
CREATE POLICY "Allow public management on parceiros folder"
ON storage.objects FOR ALL
USING ( bucket_id = 'images' AND starts_with(name, 'parceiros/') )
WITH CHECK ( bucket_id = 'images' AND starts_with(name, 'parceiros/') );