# SnapRoute Proje Yol Haritası

## Milestone 1: Veritabanı ve Mimari

### To-Do
- **Supabase proje yapılandırmasını başlat**  
  - *Neden önemli?* Çoklu ortamlar için temel konfigürasyon standartlaştırılır.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase Dashboard, Supabase CLI.
- **Veritabanı şeması tasarımı** (kullanıcı, destinasyon, rota, medya, aktivite tabloları)  
  - *Neden önemli?* Verinin tutarlılığı ve future-proof ilişkiler sağlanır.  
  - *Teknik olarak hangi araç kullanılmalı?* dbdiagram.io veya Supabase Table Editor, Prisma schema (Next.js tarafı).
- **RLS politikalarının tanımlanması** (kullanıcı bazlı erişim, medya erişimi)  
  - *Neden önemli?* Güvenlik ve çoklu tenant desteği başlangıçtan garanti edilir.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase SQL Editor, Supabase Auth claims.
- **CDN & Edge function yapılandırması** (medya dağıtımı, coğrafi cache)  
  - *Neden önemli?* Medya teslim süresini düşürerek kullanıcı deneyimini iyileştirir.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase Storage + CDN (Cloudflare entegrasyonu), Supabase Edge Functions.

### In Progress
- (Boş)

### Done
- (Boş)

---

## Milestone 2: Temel Özellikler

### To-Do
- **Supabase Auth ile e-posta/şifre + OAuth giriş akışları**  
  - *Neden önemli?* Kullanıcı güvenliği ve onboarding deneyimi oluşturur.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase Auth, Flutter Supabase paketi, Next.js `@supabase/auth-helpers`.
- **Post oluşturma ve metin/konum verisinin kaydı**  
  - *Neden önemli?* Platformun ana içeriğini oluşturur.  
  - *Teknik olarak hangi araç kullanılmalı?* Flutter Form widgets, Next.js API routes, Supabase client.
- **Medya upload & sıkıştırma pipeline'ı** (mobilde ön sıkıştırma, backend optimizasyonu)  
  - *Neden önemli?* Depolama maliyetini azaltır, upload süresini optimize eder.  
  - *Teknik olarak hangi araç kullanılmalı?* Flutter image/video compression paketleri, Supabase Storage, Next.js server actions.
- **Harita entegrasyonu ve rota görselleştirme**  
  - *Neden önemli?* Gezi odaklı içerikler için görsel bağlam sağlar.  
  - *Teknik olarak hangi araç kullanılmalı?* Flutter için Google Maps / Mapbox SDK, Next.js’de Mapbox GL JS, Supabase PostGIS uzantısı.

### In Progress
- (Boş)

### Done
- (Boş)

---

## Milestone 3: Keşfet ve Sosyal Özellikler

### To-Do
- **Takip sistemi** (takip et/çıkar, önerilen kullanıcılar)  
  - *Neden önemli?* Sosyal grafiğin temelini kurar, network etkisini artırır.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase RPC veya Edge Functions, Flutter state management, Next.js server actions.
- **Feed algoritması** (alınan takipler, konum/ilgi alanı bazlı)  
  - *Neden önemli?* İçerik keşfini kişiselleştirerek etkileşimi yükseltir.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase SQL view + rank, Edge Functions, Next.js API route cron.
- **Yorum ve beğeni sistemi** (gerçek zamanlı güncelleme)  
  - *Neden önemli?* Kullanıcı etkileşimini artırır, topluluk hissi yaratır.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase Realtime, Flutter stream builder, Next.js ISR/SSG yenileme.
- **Bildirim mekanizması** (push & in-app)  
  - *Neden önemli?* Kullanıcıları platforma geri çeker, retention artırır.  
  - *Teknik olarak hangi araç kullanılmalı?* Firebase Cloud Messaging (Flutter), OneSignal (web), Supabase Functions.

### In Progress
- (Boş)

### Done
- (Boş)

---

## Milestone 4: Ölçeklendirme ve Performans

### To-Do
- **Görsel optimizasyon** (thumbnails, progressive loading)  
  - *Neden önemli?* Mobil veri kullanımı ve yükleme süresi düşer.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase Storage image transformation, Flutter `cached_network_image`, Next.js `<Image>` komponenti.
- **Caching stratejisi** (API, CDN, incremental static regeneration)  
  - *Neden önemli?* Backend yükünü azaltır, yanıt sürelerini hızlandırır.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase caching headers, Next.js ISR/Route Handlers cache, Edge Functions.
- **API versiyonlama ve backward compatibility kurgusu**  
  - *Neden önemli?* Yeni özellikler eklerken mevcut istemcilerin bozulmasını engeller.  
  - *Teknik olarak hangi araç kullanılmalı?* Next.js Route Handlers (v1/v2), Swagger/OpenAPI dokümantasyonu.
- **Observability & logging** (performans metrikleri, hata takibi)  
  - *Neden önemli?* Sorunların proaktif tespiti ve çözüm süresi azalır.  
  - *Teknik olarak hangi araç kullanılmalı?* Supabase Logs, Logflare entegrasyonu, Sentry (Flutter & Next.js).

### In Progress
- (Boş)

### Done
- (Boş)

---

## Milestone 5: Deployment ve Yayınlama

### To-Do
- **Next.js projesini Vercel’e CI/CD ile bağlama**  
  - *Neden önemli?* Otomatik dağıtım ve hızlı rollback imkanı sağlar.  
  - *Teknik olarak hangi araç kullanılmalı?* Vercel Git Integration, GitHub Actions.
- **Flutter uygulaması için release pipeline** (iOS & Android)  
  - *Neden önemli?* Tek tuşla güvenilir build süreci sağlar.  
  - *Teknik olarak hangi araç kullanılmalı?* Fastlane, Codemagic veya Bitrise, Apple Developer portal.
- **App Store ve Play Store listing hazırlığı** (metadata, görsel, gizlilik)  
  - *Neden önemli?* Yayın sürecinin sorunsuz ilerlemesi için ön gereksinimdir.  
  - *Teknik olarak hangi araç kullanılmalı?* App Store Connect, Google Play Console, Canva/Figma.
- **Production izleme ve geri bildirim kanalı** (feedback, crash report)  
  - *Neden önemli?* Yayın sonrası kullanıcı sorunlarını hızlıca yakalar.  
  - *Teknik olarak hangi araç kullanılmalı?* Sentry, Firebase Crashlytics, Supabase feedback formu.

### In Progress
- (Boş)

### Done
- (Boş)
