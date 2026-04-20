-- Cria a tabela 'associados' com a estrutura correta e políticas de segurança.
CREATE TABLE public.associados (
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

-- Habilita a Segurança em Nível de Linha (RLS)
ALTER TABLE public.associados ENABLE ROW LEVEL SECURITY;

-- Cria políticas de acesso
-- Permite que qualquer pessoa (usuários anônimos) insira um novo associado.
-- Isso é necessário para o formulário público de associação.
CREATE POLICY "Public insert access for new associados"
ON public.associados FOR INSERT WITH CHECK (true);

-- Permite que usuários autenticados (administradores) leiam os dados dos associados.
-- Isso será útil para uma futura página de administração de associados.
CREATE POLICY "Allow read access for authenticated users"
ON public.associados FOR SELECT
USING (auth.role() = 'authenticated');
