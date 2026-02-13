-- Create a new migration file: supabase/migrations/20260102170000_add_post_functions.sql

-- Increment like count function
CREATE OR REPLACE FUNCTION increment_like_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts 
  SET like_count = COALESCE(like_count, 0) + 1,
      updated_at = NOW()
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement like count function
CREATE OR REPLACE FUNCTION decrement_like_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts 
  SET like_count = GREATEST(COALESCE(like_count, 1) - 1, 0),
      updated_at = NOW()
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Increment comment count function
CREATE OR REPLACE FUNCTION increment_comment_count(post_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE posts 
  SET comment_count = COALESCE(comment_count, 0) + 1,
      updated_at = NOW()
  WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Decrement comment count function
CREATE OR REPLACE FUNCTION decrement_comment_count(comment_id UUID)
RETURNS void AS $$
DECLARE
  post_uuid UUID;
BEGIN
  -- Get the post_id before deleting
  SELECT post_id INTO post_uuid FROM comments WHERE id = comment_id;
  
  -- Delete the comment
  DELETE FROM comments WHERE id = comment_id;
  
  -- Update the comment count
  UPDATE posts 
  SET comment_count = GREATEST(COALESCE(comment_count, 1) - 1, 0),
      updated_at = NOW()
  WHERE id = post_uuid;
END;
$$ LANGUAGE plpgsql;