-- Script de Criação do Banco de Dados para Banda Roadie (Supabase)

-- 1. Criação das Tabelas
CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    image_url TEXT NOT NULL,
    title TEXT NOT NULL,
    alt_text TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.videos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    video_thumb_url TEXT NOT NULL,
    title TEXT NOT NULL,
    meta TEXT NOT NULL,
    duration TEXT NOT NULL,
    accent TEXT NOT NULL CHECK (accent IN ('primary', 'secondary')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.discography (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    cover_url TEXT NOT NULL,
    title TEXT NOT NULL,
    meta TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.agenda (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    event_date TIMESTAMP WITH TIME ZONE NOT NULL,
    location TEXT NOT NULL,
    venue TEXT NOT NULL,
    ticket_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Configuração de RLS (Row Level Security)
-- Por enquanto, vamos permitir acesso anonimo para LEITURA, INSERÇÃO, ATUALIZAÇÃO e DELEÇÃO (Para facilitar o AdminPanel)
-- Aviso: Em produção, o painel /admin deveria ter autenticação!

ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discography ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agenda ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir tudo para gallery" ON public.gallery FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo para videos" ON public.videos FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo para discography" ON public.discography FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Permitir tudo para agenda" ON public.agenda FOR ALL USING (true) WITH CHECK (true);

-- 3. Inserção de Dados Iniciais (Hardcoded do HTML Original)

INSERT INTO public.gallery (image_url, title, alt_text) VALUES 
('https://lh3.googleusercontent.com/aida-public/AB6AXuDxIGYq8kTI7hV3g4vIXfXqHiD8OJ0Q7FlGE8JnsJA9B8pY2H_vUvaXxEpB4WWldJYahe3iBAjOoddTJwWkysaxM0j_qdzvL_pBxdcznnmua0eUK9rEtunMavetSISSiJ6-4wrN-7kxwdxA-IuMDQGk-Zm7mppw3h6qAzeTIJs6o-X6VJOaX1BM8QENbKuMaWcfEwCNXcSfvgSJJw6siSGK19WmnKOoekhcpZcf4E-2VOzzy7SnwSis4ma_IHcBCw6m6nrE2Iv0p1U', 'London Arena 2024', 'Singer performing under purple stage lights'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuA02yoLLeODvs9dgmkHpylf1mPSGyIbJqf-3AVRr_mAUiDjbFXDAJh2UFEiL35zUHbapn4YYndbNeeQ2vXYQX5yeAMVGgvVkC_fost8XbsVeNIRPX7WOIoU0Zj7JqKGVPXPbnJ_dgtFtX1f7UZtTEnq2BS-_NvfG2Ionc9fdSMQjn4RfUdh7D4LRuQa3Rz7pNBbosi6cnem0mE0HeDYB95R5EZWlQtx5Saejq5eRAFS7WxPvl5ENdZW9LBIFJdPaUMfQUI717Gzisk', 'Midnight Tour', 'Crowd at a rock concert with green lasers'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuAMhblV0lyVE3tywyIEL5VEGGap156JCfq9xDBEfBf7QskoAigrRWzJOvyiC7Sxl3YdsPpcdnqih60BG6P-PnAdnfcVD1rTeKNRfjEriOHZLpMILz0k_gWLYz5S6Wqo2Faq1FV3X2n41Zzz3Z2OmnnhMHirVPPI1vuiXNeSAEAEosQiqNYUtVbsFuINpFQ8rzHd4FSQmnEatiHhVLoQ5-_9aV00mHTcGQuatr5KOAepcNkUzK6Tr7hZ_BzCFDMyvLHRP4U9AUZAE9A', 'Tokyo Dome', 'Guitarist soloing on stage with smoke'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuDJtmP1Bkpvtz86IjTQliCoP_yNnwgkor9OBUjjqSzEmr5-CvfM_RQiLIi7SOVT1yIsJxp-s_9GGB0r7dbz0xDUGe-hGp1R0_336kHb3QAisZmcMHyXp8sZYG4uyRTm4vsfko2KCrUN21uzessH-3Ji_YWDT8muLlYY3uwzb5GImGgX81BhI-bh_l_DyKZpAo6A7sYKwyQpPS34jzgOkngf1vDxfNUA-AsHNPIPJR8SiHO2uOYr-69hCvccQgoQTIOnsx9Cahc83eE', 'Backstage Moments', 'Drummer performing in high contrast lighting');

INSERT INTO public.videos (video_thumb_url, title, meta, duration, accent) VALUES
('https://lh3.googleusercontent.com/aida-public/AB6AXuDbNdKDWUyh3oCx7cH2HYQen7N56u3TBbdKwZBBKRZMo0g0ulKUmYYQSpMwP_3nukhkGVHaaLPcNCG8KJi4YnHZKUjTujgcbFUVcJv8yeaJa-rmJe0Ac8JWvhw0lQRhyzUWjMQVW3zu7-iibFKcA6pPRYPZSAvlmAFczZ-j8vZpvjf-mBzLxViAHlUpWJ0y9m9gL7YzOPyCTd6XDtnKs2EV-_2PjIg3sQLmdfUr-cdBC_BItzB6i6Pb2gJg9s3tlg0w2XkjWW6AvOQ', 'Electric Velocity', 'Released Oct 2023 • Official 4K Video', '04:22', 'primary'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuD9AJpp3upeTsgtz0qk6oxgpi3d4ufAxTPN8c_S_ivvOFo9CWiMLQxGpFNQ23y6nz7Z_FrumR71cRsuhkB7sbF5eWSEn2hqt_4Z4J-6Cl0xTjCcuIYCNTBenQKga3-4h0I65OLHL0VtzoVDAOAW4wT55jr07IxCdgSdRkkeMsS0ziXJkiCvq44x3l-CkfkSJ6A_qwMZwNANZjfEF-9YuU6IZUNmLOHjRdqlCvWX061l_bgc3zzJvz0hXn3oQesco-ISGNmB9aTwHak', 'Neon Rebels', 'Released June 2023 • Live in Berlin', '03:58', 'secondary');

INSERT INTO public.discography (cover_url, title, meta) VALUES
('https://lh3.googleusercontent.com/aida-public/AB6AXuDJrdhQj3F8VKWSIx10aHOiGtvaiN5cOmRObpmDLQ_vLXF2-Alfuw6ER3cvbwwhaKD8PlRilQrfA3woXJz7enWJPJ_2xSv-U5BhRfHnhqu9A9yOa8c-zhbUbX5Ijj8NJdtm5Lf1WID4_HGisNy2HQW8GNr6SQC19GCnD1iTZh0dxQ2wYe-1WJ_8uh2wttiRc4x_VeL-DtMsrmrHdzMlYzcpRNLNRYmMdmOcWivjbnTelbQuEj3_eHA3SddbPmTDMtC8wvgbVr1LUwk', 'Hyper-Drive Soul', 'LP • 2024'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuCElh1GfnCkrIjNT16j6T4hFDc8E1_QzEleuoMp__JWNBjy3tHdciDYc_tzV3mELCXTHsy5Mj1a4_JDzA9DvIQZngZFvn90BV8TuyADWbiwbEZaJKxqRYWNHVXXvTcGaOIZDh5Tsv1sxwAnTyCDeA7B4VJKkV_XNOhHiVp024c_X6__EbZI-CHGuLrQyqxKRPQTCSFhQB5TSv_--yv3nTofZA31l5_vn_zn4rm3FAcOlDfzGYTJ7Xec8stuxk0hZbZ23azLA79ERn0', 'Static Echoes', 'EP • 2023'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuDs1HTTxQwEnleCG0j41rtkFDGmCa7XjWxKsZD2dFNrsVTl5yzlNdAC_iaBUTPAO3meIuBr0YDb27ud8w5MgbqrkOPBbMeNWM2B0SR9DWj9lG11LnBKIfIsoJjcLpc8ptrzSvltdvK25qiBb8cd2RY-jhKL18LWxW-GHCMM1TBwBpPQpmqS6Hw5Tt0w4zxKZh-eSpA1VC21pqqh8GhFcpB6KhAuOQ0uYggLFyYXFTvKXUMVJy_8lNxKm0MVZhjmiXNtWiTNUkg-_Ms', 'Afterglow Nights', 'Single • 2023'),
('https://lh3.googleusercontent.com/aida-public/AB6AXuDIxRCK_Uitb34hnoj0BeO7WcqCpd_fNGFmuLbNUVPbO53pAnxHZ3ai5srfznU2wTLUbpVvjp9Mj-GMX-tqDwRX5Jzl3Ip1GApmG-BGvaEi-M_cU_JrzRWSWTY9Le8kA7cYoA8geFvySZCxJBuqjMnuFGcMVUKYUr5vtWdb5YL_ao_y7_BXvc0JCOzMf1kCJsQIKsiEBbPfQ8eJIxwIFP2T7eX43jwjo835sya3VxnId8uvW1_JQJhFnyXQvrnMiI-xx54xRvSrj6Y', 'Velocity Zero', 'LP • 2022');

INSERT INTO public.agenda (event_date, location, venue, ticket_url) VALUES 
('2024-10-15T20:00:00Z', 'São Paulo, BR', 'Allianz Parque', '#'),
('2024-11-05T21:00:00Z', 'Rio de Janeiro, BR', 'Jeunesse Arena', '#');
