// types/index.ts
export interface User {
  id: string;
  username: string;
  full_name?: string;
  avatar_url: string | null;
  location?: string;
}

export interface Post {
  id: string;
  content: {
    description: string;
    images: string[];
    like_count: number;
    comment_count: number;
  };
  created_at: string;
  updated_at?: string;
  user: User;
  is_liked?: boolean;
}

export interface Comment {
  id: string;
  content: string;
  created_at: string;
  user: Pick<User, 'id' | 'username' | 'avatar_url'>;
}

export type FeedType = 'following' | 'popular' | 'recent';