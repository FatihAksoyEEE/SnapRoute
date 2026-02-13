# Database Schematic Plan (Veritabanı Şematik Planı)

## 1. Core Identity & Profiles

### `profiles` (Kullanıcı Profilleri)
Extends Supabase Auth `users` table via strict 1:1 relation.
- **id**: UUID (FK -> auth.users.id)
- **username**: Text (Unique)
- **display_name**: Text
- **bio**: Text
- **avatar_url**: Text
- **home_location**: Text
- **languages**: Text[] (Array)
- **Relations**:
    - `auth.users` (1:1)

### `follows` (Takip Sistemi)
Self-referencing Many-to-Many relationship for social graph.
- **follower_id**: UUID (FK -> profiles.id)
- **following_id**: UUID (FK -> profiles.id)
- **Constraint**: `follower_id != following_id`

---

## 2. Content Architecture

### `routes` (Rotalar)
A collection of destinations or a planned trip.
- **owner_id**: UUID (FK -> profiles.id)
- **title**: Text
- **is_public**: Boolean
- **duration_hours**: Numeric
- **Relations**:
    - `route_stops` (1:N)
    - `bookmarks` (1:N)

### `destinations` (Destinasyonlar)
Specific locations / POIs.
- **geo**: Geography (PostGIS Point)
- **category**: Enum (nature, culture, gastronomy, other)
- **created_by**: UUID (FK -> profiles.id)
- **Relations**:
    - `destination_photos` (1:N)
    - `activities` (1:N)

### `activities` (Aktiviteler)
Events or things to do at a destination.
- **type**: Enum (food, activity, event)
- **destination_id**: UUID (FK -> destinations.id)

### `posts` (Paylaşımlar)
The central feed unit. Can be linked to a Route, Destination, or Activity.
- **author_id**: UUID (FK -> profiles.id)
- **type**: Enum (route, destination, activity)
- **visibility**: Enum (public, private)
- **Relations**:
    - `post_media` (1:N)
    - `likes` (1:N)
    - `comments` (1:N)
    - `post_tags` (1:N)

### `post_media` (Medya)
Images/Videos attached to posts.
- **storage_path**: Text (Supabase Storage Key)
- **media_type**: Enum (image, video)

---

## 3. Social Interaction

### `likes` & `comments`
Standard social interactions.
- `likes`: (user_id, post_id) PK
- `comments`: Nested threading supported via `parent_id`.

### `notifications`
System/User notifications.
- **recipient_id**: UUID
- **type**: Text (like, comment, follow)
- **payload**: JSONB

---

## 4. Enums & Types
- **destination_category**: `nature`, `culture`, `gastronomy`, `other`
- **activity_type**: `food`, `activity`, `event`
- **post_type**: `route`, `destination`, `activity`
- **media_type**: `image`, `video`
