INSERT INTO public.tags (name, type)
VALUES
  ('street-food', 'food'),
  ('local-cuisine', 'food'),
  ('hiking', 'activity'),
  ('museum', 'activity'),
  ('hidden-gem', 'general')
ON CONFLICT (name) DO NOTHING;

INSERT INTO public.destinations (slug, name, description, category, country, city, geo, tags)
VALUES
  (
    'istanbul-sultanahmet',
    'Sultanahmet',
    'Tarihi yarımada bölgesi.',
    'culture',
    'Türkiye',
    'İstanbul',
    ST_SetSRID(ST_MakePoint(28.97696, 41.00541), 4326)::geography,
    ARRAY['culture','museum']
  ),
  (
    'izmir-alsancak',
    'Alsancak',
    'Sahil yürüyüşü ve yeme-içme bölgesi.',
    'gastronomy',
    'Türkiye',
    'İzmir',
    ST_SetSRID(ST_MakePoint(27.14319, 38.43213), 4326)::geography,
    ARRAY['local-cuisine','street-food']
  ),
  (
    'antalya-konyaalti',
    'Konyaaltı',
    'Sahil ve doğa aktiviteleri.',
    'nature',
    'Türkiye',
    'Antalya',
    ST_SetSRID(ST_MakePoint(30.63894, 36.86250), 4326)::geography,
    ARRAY['nature','hiking']
  )
ON CONFLICT (slug) DO NOTHING;
