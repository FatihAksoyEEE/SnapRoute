// lib/supabase/posts.ts
import { supabase } from './client';
import { Post, Comment } from '@/types';

const POSTS_TABLE = 'posts';
const COMMENTS_TABLE = 'comments';
const LIKES_TABLE = 'likes';
const PROFILES_TABLE = 'profiles';

export const getPosts = async (page = 0, pageSize = 5, feedType: 'recent' | 'popular' = 'recent') => {
  let query = supabase
    .from(POSTS_TABLE)
    .select(`
      *,
      user:${PROFILES_TABLE}(
        id,
        username,
        full_name,
        avatar_url,
        location
      )
    `)
    .order('created_at', { ascending: false })
    .range(page * pageSize, (page + 1) * pageSize - 1);

  if (feedType === 'popular') {
    query = query.order('like_count', { ascending: false });
  }

  const { data, error } = await query;

  if (error) throw error;

  return (data || []).map(post => ({
    ...post,
    content: {
      description: post.content?.description || '',
      images: post.image_urls || [],
      like_count: post.like_count || 0,
      comment_count: post.comment_count || 0,
    },
    is_liked: false // Will be updated by checkLikedStatus
  })) as Post[];
};

export const likePost = async (postId: string, userId: string) => {
  const { error } = await supabase
    .from(LIKES_TABLE)
    .upsert(
      { post_id: postId, user_id: userId },
      { onConflict: 'post_id,user_id' }
    );

  if (error) throw error;

  // Update like count
  await supabase.rpc('increment_like_count', { post_id: postId });
};

export const unlikePost = async (postId: string, userId: string) => {
  const { error } = await supabase
    .from(LIKES_TABLE)
    .delete()
    .eq('post_id', postId)
    .eq('user_id', userId);

  if (error) throw error;

  // Update like count
  await supabase.rpc('decrement_like_count', { post_id: postId });
};

export const getPostComments = async (postId: string) => {
  const { data, error } = await supabase
    .from(COMMENTS_TABLE)
    .select(`
      id,
      content,
      created_at,
      user:${PROFILES_TABLE}(id, username, avatar_url)
    `)
    .eq('post_id', postId)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return (data || []) as Comment[];
};

export const addComment = async (postId: string, userId: string, content: string) => {
  const { data, error } = await supabase
    .from(COMMENTS_TABLE)
    .insert([{ post_id: postId, user_id: userId, content }])
    .select();

  if (error) throw error;

  // Update comment count
  await supabase.rpc('increment_comment_count', { post_id: postId });

  return data[0];
};

export const checkLikedStatus = async (postIds: string[], userId: string) => {
  const { data, error } = await supabase
    .from(LIKES_TABLE)
    .select('post_id')
    .in('post_id', postIds)
    .eq('user_id', userId);

  if (error) throw error;

  return new Set(data?.map(like => like.post_id) || []);
};