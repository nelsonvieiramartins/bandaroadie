-- 1. Cria a Tabela "members"
CREATE TABLE IF NOT EXISTS public.members (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    image_url TEXT NOT NULL,
    full_name TEXT NOT NULL,
    favorite_style TEXT NOT NULL,
    presentation_text TEXT NOT NULL,
    gallery_urls TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Habilita RLS para a Tabela "members"
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Permitir tudo para members" ON public.members FOR ALL USING (true) WITH CHECK (true);

-- 3. Adiciona a coluna "youtube_url" na Tabela "videos" (caso ela ainda não exista)
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_schema='public' 
          AND table_name='videos' 
          AND column_name='youtube_url'
    ) THEN 
        ALTER TABLE public.videos ADD COLUMN youtube_url TEXT;

        -- Atualiza os vídeos existentes com um link placeholder (Rick Roll) para não quebrar a tela inicial
        UPDATE public.videos 
        SET youtube_url = 'https://www.youtube.com/embed/dQw4w9WgXcQ' 
        WHERE youtube_url IS NULL;
    END IF; 
END $$;
