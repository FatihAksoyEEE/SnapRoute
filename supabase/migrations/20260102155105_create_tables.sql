-- Kullanıcı profilleri tablosu
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (id)
);

-- Gönderiler tablosu
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS (Row Level Security) etkinleştirme
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Profil izinleri
CREATE POLICY "Herkes profilleri görebilir" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Kullanıcılar sadece kendi profillerini güncelleyebilir"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Gönderi izinleri
CREATE POLICY "Herkes gönderileri görebilir" 
ON public.posts FOR SELECT USING (true);

CREATE POLICY "Kullanıcılar kendi gönderilerini oluşturabilir"
ON public.posts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Test verisi ekleme
INSERT INTO public.profiles (id, username, full_name, avatar_url, location)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'testuser', 'Test Kullanıcı', 'https://i.pravatar.cc/150?img=1', 'İstanbul')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.posts (user_id, content)
VALUES 
  ('00000000-0000-0000-0000-000000000001', '{"description": "İlk test gönderisi", "image": "https://picsum.photos/800/600", "likes": 0, "comments": 0}'),
  ('00000000-0000-0000-0000-000000000001', '{"description": "İkinci test gönderisi", "image": "https://picsum.photos/800/601", "likes": 5, "comments": 2}')
ON CONFLICT (id) DO NOTHING;