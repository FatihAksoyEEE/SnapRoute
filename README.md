# SnapRoute

Instagram benzeri gezi paylaşım platformunun monorepo iskeleti. Proje planı ve görev yönetimi aşağıdaki dosyalarda takip edilir:

- `PROJECT_PLAN.md`: Milestone bazlı yol haritası
- `TASK_MANAGER.md`: Kanban tarzı görev listesi

## Başlangıç

1. Depoyu klonlayın ve `Task Manager` dosyasındaki sırayı izleyin.
2. Gerekli araçları kurun:
   - [Supabase CLI](https://supabase.com/docs/reference/cli)
   - [Node.js 20+](https://nodejs.org/)
   - [Flutter stable](https://docs.flutter.dev/get-started/install)

## Ortam Değişkenleri

1. `.env.example` dosyasını çoğaltarak kökte `.env` oluşturun.
2. Supabase projenizden aldığınız değerleri girin:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable...
   SUPABASE_SERVICE_ROLE_KEY=
   SUPABASE_JWT_SECRET=

   MOBILE_SUPABASE_URL=https://...supabase.co
   MOBILE_SUPABASE_ANON_KEY=sb_publishable...
   ```

3. Flutter için `.env` dosyasını `mobile/` altına kopyalayın veya CI/CD pipeline'ında enjekte edin.

## Bir Sonraki Adımlar

- Milestone 1.1: Supabase projesi ortam konfigürasyonunu tamamlayın.
- CLI ile login olun ve proje bağlantısını doğrulayın:

  ```bash
  supabase login
  supabase link --project-ref <project-id>
  ```

- Ardından Task Manager'daki 1.2 ve 1.3 görevlerine ilerleyin.
