ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.destination_photos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.route_stops ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS profiles_select_public ON public.profiles;
CREATE POLICY profiles_select_public ON public.profiles
FOR SELECT
USING (true);

DROP POLICY IF EXISTS profiles_insert_own ON public.profiles;
CREATE POLICY profiles_insert_own ON public.profiles
FOR INSERT
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS profiles_update_own ON public.profiles;
CREATE POLICY profiles_update_own ON public.profiles
FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS profiles_delete_own ON public.profiles;
CREATE POLICY profiles_delete_own ON public.profiles
FOR DELETE
USING (auth.uid() = id);

DROP POLICY IF EXISTS destinations_select_public ON public.destinations;
CREATE POLICY destinations_select_public ON public.destinations
FOR SELECT
USING (true);

DROP POLICY IF EXISTS destinations_insert_own ON public.destinations;
CREATE POLICY destinations_insert_own ON public.destinations
FOR INSERT
WITH CHECK ((auth.uid() = created_by) OR (auth.role() = 'service_role'));

DROP POLICY IF EXISTS destinations_update_own ON public.destinations;
CREATE POLICY destinations_update_own ON public.destinations
FOR UPDATE
USING ((auth.uid() = created_by) OR (auth.role() = 'service_role'))
WITH CHECK ((auth.uid() = created_by) OR (auth.role() = 'service_role'));

DROP POLICY IF EXISTS destinations_delete_own ON public.destinations;
CREATE POLICY destinations_delete_own ON public.destinations
FOR DELETE
USING ((auth.uid() = created_by) OR (auth.role() = 'service_role'));

DROP POLICY IF EXISTS destination_photos_select_public ON public.destination_photos;
CREATE POLICY destination_photos_select_public ON public.destination_photos
FOR SELECT
USING (true);

DROP POLICY IF EXISTS destination_photos_mutate_owner ON public.destination_photos;
CREATE POLICY destination_photos_mutate_owner ON public.destination_photos
FOR ALL
USING (
  (auth.role() = 'service_role') OR
  EXISTS (
    SELECT 1
    FROM public.destinations d
    WHERE d.id = destination_id AND d.created_by = auth.uid()
  )
)
WITH CHECK (
  (auth.role() = 'service_role') OR
  EXISTS (
    SELECT 1
    FROM public.destinations d
    WHERE d.id = destination_id AND d.created_by = auth.uid()
  )
);

DROP POLICY IF EXISTS routes_select_visible ON public.routes;
CREATE POLICY routes_select_visible ON public.routes
FOR SELECT
USING (is_public OR (owner_id = auth.uid()));

DROP POLICY IF EXISTS routes_insert_own ON public.routes;
CREATE POLICY routes_insert_own ON public.routes
FOR INSERT
WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS routes_update_own ON public.routes;
CREATE POLICY routes_update_own ON public.routes
FOR UPDATE
USING (owner_id = auth.uid())
WITH CHECK (owner_id = auth.uid());

DROP POLICY IF EXISTS routes_delete_own ON public.routes;
CREATE POLICY routes_delete_own ON public.routes
FOR DELETE
USING (owner_id = auth.uid());

DROP POLICY IF EXISTS route_stops_select_visible ON public.route_stops;
CREATE POLICY route_stops_select_visible ON public.route_stops
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.routes r
    WHERE r.id = route_id AND (r.is_public OR r.owner_id = auth.uid())
  )
);

DROP POLICY IF EXISTS route_stops_mutate_owner ON public.route_stops;
CREATE POLICY route_stops_mutate_owner ON public.route_stops
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.routes r
    WHERE r.id = route_id AND r.owner_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.routes r
    WHERE r.id = route_id AND r.owner_id = auth.uid()
  )
);

DROP POLICY IF EXISTS activities_select_public ON public.activities;
CREATE POLICY activities_select_public ON public.activities
FOR SELECT
USING (true);

DROP POLICY IF EXISTS activities_insert_own ON public.activities;
CREATE POLICY activities_insert_own ON public.activities
FOR INSERT
WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS activities_update_own ON public.activities;
CREATE POLICY activities_update_own ON public.activities
FOR UPDATE
USING (created_by = auth.uid())
WITH CHECK (created_by = auth.uid());

DROP POLICY IF EXISTS activities_delete_own ON public.activities;
CREATE POLICY activities_delete_own ON public.activities
FOR DELETE
USING (created_by = auth.uid());

DROP POLICY IF EXISTS posts_select_visible ON public.posts;
CREATE POLICY posts_select_visible ON public.posts
FOR SELECT
USING ((visibility = 'public') OR (author_id = auth.uid()));

DROP POLICY IF EXISTS posts_insert_own ON public.posts;
CREATE POLICY posts_insert_own ON public.posts
FOR INSERT
WITH CHECK (author_id = auth.uid());

DROP POLICY IF EXISTS posts_update_own ON public.posts;
CREATE POLICY posts_update_own ON public.posts
FOR UPDATE
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());

DROP POLICY IF EXISTS posts_delete_own ON public.posts;
CREATE POLICY posts_delete_own ON public.posts
FOR DELETE
USING (author_id = auth.uid());

DROP POLICY IF EXISTS post_media_select_visible ON public.post_media;
CREATE POLICY post_media_select_visible ON public.post_media
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND ((p.visibility = 'public') OR (p.author_id = auth.uid()))
  )
);

DROP POLICY IF EXISTS post_media_mutate_owner ON public.post_media;
CREATE POLICY post_media_mutate_owner ON public.post_media
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND p.author_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND p.author_id = auth.uid()
  )
);

DROP POLICY IF EXISTS follows_select_public ON public.follows;
CREATE POLICY follows_select_public ON public.follows
FOR SELECT
USING (true);

DROP POLICY IF EXISTS follows_insert_self ON public.follows;
CREATE POLICY follows_insert_self ON public.follows
FOR INSERT
WITH CHECK (follower_id = auth.uid());

DROP POLICY IF EXISTS follows_delete_self ON public.follows;
CREATE POLICY follows_delete_self ON public.follows
FOR DELETE
USING (follower_id = auth.uid());

DROP POLICY IF EXISTS likes_select_visible ON public.likes;
CREATE POLICY likes_select_visible ON public.likes
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND ((p.visibility = 'public') OR (p.author_id = auth.uid()))
  )
);

DROP POLICY IF EXISTS likes_insert_self ON public.likes;
CREATE POLICY likes_insert_self ON public.likes
FOR INSERT
WITH CHECK (
  (user_id = auth.uid()) AND
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND ((p.visibility = 'public') OR (p.author_id = auth.uid()))
  )
);

DROP POLICY IF EXISTS likes_delete_self ON public.likes;
CREATE POLICY likes_delete_self ON public.likes
FOR DELETE
USING (user_id = auth.uid());

DROP POLICY IF EXISTS comments_select_visible ON public.comments;
CREATE POLICY comments_select_visible ON public.comments
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND ((p.visibility = 'public') OR (p.author_id = auth.uid()))
  )
);

DROP POLICY IF EXISTS comments_insert_own ON public.comments;
CREATE POLICY comments_insert_own ON public.comments
FOR INSERT
WITH CHECK (
  (author_id = auth.uid()) AND
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND ((p.visibility = 'public') OR (p.author_id = auth.uid()))
  )
);

DROP POLICY IF EXISTS comments_update_own ON public.comments;
CREATE POLICY comments_update_own ON public.comments
FOR UPDATE
USING (author_id = auth.uid())
WITH CHECK (author_id = auth.uid());

DROP POLICY IF EXISTS comments_delete_own ON public.comments;
CREATE POLICY comments_delete_own ON public.comments
FOR DELETE
USING (author_id = auth.uid());

DROP POLICY IF EXISTS bookmarks_select_own ON public.bookmarks;
CREATE POLICY bookmarks_select_own ON public.bookmarks
FOR SELECT
USING (user_id = auth.uid());

DROP POLICY IF EXISTS bookmarks_insert_own ON public.bookmarks;
CREATE POLICY bookmarks_insert_own ON public.bookmarks
FOR INSERT
WITH CHECK (user_id = auth.uid());

DROP POLICY IF EXISTS bookmarks_delete_own ON public.bookmarks;
CREATE POLICY bookmarks_delete_own ON public.bookmarks
FOR DELETE
USING (user_id = auth.uid());

DROP POLICY IF EXISTS notifications_select_own ON public.notifications;
CREATE POLICY notifications_select_own ON public.notifications
FOR SELECT
USING (recipient_id = auth.uid());

DROP POLICY IF EXISTS notifications_update_own ON public.notifications;
CREATE POLICY notifications_update_own ON public.notifications
FOR UPDATE
USING (recipient_id = auth.uid())
WITH CHECK (recipient_id = auth.uid());

DROP POLICY IF EXISTS notifications_insert_service ON public.notifications;
CREATE POLICY notifications_insert_service ON public.notifications
FOR INSERT
WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS reports_select_own_or_service ON public.reports;
CREATE POLICY reports_select_own_or_service ON public.reports
FOR SELECT
USING ((reporter_id = auth.uid()) OR (auth.role() = 'service_role'));

DROP POLICY IF EXISTS reports_insert_own ON public.reports;
CREATE POLICY reports_insert_own ON public.reports
FOR INSERT
WITH CHECK (reporter_id = auth.uid());

DROP POLICY IF EXISTS reports_update_service ON public.reports;
CREATE POLICY reports_update_service ON public.reports
FOR UPDATE
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS tags_select_public ON public.tags;
CREATE POLICY tags_select_public ON public.tags
FOR SELECT
USING (true);

DROP POLICY IF EXISTS tags_mutate_service ON public.tags;
CREATE POLICY tags_mutate_service ON public.tags
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

DROP POLICY IF EXISTS post_tags_select_visible ON public.post_tags;
CREATE POLICY post_tags_select_visible ON public.post_tags
FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND ((p.visibility = 'public') OR (p.author_id = auth.uid()))
  )
);

DROP POLICY IF EXISTS post_tags_mutate_post_owner ON public.post_tags;
CREATE POLICY post_tags_mutate_post_owner ON public.post_tags
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND p.author_id = auth.uid()
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM public.posts p
    WHERE p.id = post_id AND p.author_id = auth.uid()
  )
);
