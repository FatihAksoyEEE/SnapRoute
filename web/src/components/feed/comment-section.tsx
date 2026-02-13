// components/feed/comment-section.tsx
'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { getPostComments, addComment } from '@/lib/supabase/posts';
import { Comment } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CommentSectionProps {
  postId: string;
  currentUserId?: string;
}

export function CommentSection({ postId, currentUserId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useUser();

  useEffect(() => {
    const loadComments = async () => {
      try {
        setIsLoading(true);
        const data = await getPostComments(postId);
        setComments(data);
      } catch (error) {
        console.error('Error loading comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUserId || !user) return;

    try {
      setIsSubmitting(true);
      const comment = await addComment(postId, currentUserId, newComment);
      setComments(prev => [comment, ...prev]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-4 border-t border-white/5">
        <div className="text-center py-4">
          <div className="h-4 w-4 mx-auto border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="border-t border-white/5">
      <div className="max-h-60 overflow-y-auto p-4 space-y-3">
        {comments.length === 0 ? (
          <p className="text-sm text-center text-gray-400 py-4">
            Henüz yorum yok
          </p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex space-x-2">
              <img
                src={comment.user.avatar_url || '/default-avatar.png'}
                alt={comment.user.username}
                className="h-8 w-8 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1">
                <div className="bg-neutral-800/50 rounded-lg p-2">
                  <p className="text-sm font-medium">{comment.user.username}</p>
                  <p className="text-sm">{comment.content}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {formatDistanceToNow(new Date(comment.created_at), {
                    addSuffix: true,
                    locale: tr
                  })}
                </p>
              </div>
            </div>
          ))
        )}
      </div>

      {user ? (
        <form onSubmit={handleSubmit} className="p-4 border-t border-white/5">
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Yorum yaz..."
              className="flex-1 bg-neutral-800/50 border-none focus-visible:ring-1 focus-visible:ring-blue-500"
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              size="sm"
              disabled={!newComment.trim() || isSubmitting}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
            </Button>
          </div>
        </form>
      ) : (
        <div className="p-4 text-center text-sm text-gray-400 border-t border-white/5">
          Yorum yapmak için giriş yapın
        </div>
      )}
    </div>
  );
}