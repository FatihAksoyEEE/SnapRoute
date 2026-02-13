// components/feed/feed-container.tsx
'use client';

import { Post } from '@/types';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';
import { PostCard } from './post-card';
import { getPosts, checkLikedStatus, likePost, unlikePost } from '@/lib/supabase/posts';
import { useUser } from '@/hooks/use-user';

const PAGE_SIZE = 5;

export function FeedContainer() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const loadMoreRef = useRef(null);
  const isInView = useInView(loadMoreRef);
  const { user } = useUser();

  const fetchPosts = async () => {
    if (!hasMore || isLoading) return;
    
    try {
      setIsLoading(true);
      const newPosts = await getPosts(page, PAGE_SIZE);
      
      if (newPosts.length < PAGE_SIZE) {
        setHasMore(false);
      }

      if (newPosts.length > 0) {
        // Check liked status for the new posts
        if (user) {
          const likedPostIds = await checkLikedStatus(
            newPosts.map(p => p.id),
            user.id
          );
          
          newPosts.forEach(post => {
            post.is_liked = likedPostIds.has(post.id);
          });
        }

        setPosts(prev => [...prev, ...newPosts]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Load more posts when the last post is in view
  useEffect(() => {
    if (isInView && !isLoading) {
      fetchPosts();
    }
  }, [isInView, isLoading]);

  // Initial fetch
  useEffect(() => {
    const init = async () => {
      await fetchPosts();
    };
    init();
  }, []);

  const handleLike = async (postId: string, isLiked: boolean) => {
    if (!user) return;

    try {
      // Optimistic update
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            is_liked: !isLiked,
            content: {
              ...post.content,
              like_count: isLiked 
                ? Math.max(0, post.content.like_count - 1)
                : post.content.like_count + 1
            }
          };
        }
        return post;
      }));

      // Update in the database
      if (isLiked) {
        await unlikePost(postId, user.id);
      } else {
        await likePost(postId, user.id);
      }
    } catch (error) {
      console.error('Error toggling like:', error);
      // Revert on error
      setPosts(prev => prev.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            is_liked: isLiked,
            content: {
              ...post.content,
              like_count: isLiked 
                ? post.content.like_count
                : Math.max(0, post.content.like_count - 1)
            }
          };
        }
        return post;
      }));
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {posts.map((post) => (
        <PostCard 
          key={post.id} 
          post={post} 
          onLike={handleLike}
          currentUserId={user?.id}
        />
      ))}
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="flex justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      )}
      
      {/* Infinite scroll trigger */}
      {!isLoading && hasMore && <div ref={loadMoreRef} className="h-1" />}
      
      {/* No more posts */}
      {!isLoading && !hasMore && posts.length > 0 && (
        <div className="text-center py-8 text-gray-400">
          Daha fazla gönderi yok
        </div>
      )}
      
      {/* Empty state */}
      {!isLoading && posts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400">Henüz gönderi bulunmuyor</p>
        </div>
      )}
    </div>
  );
}