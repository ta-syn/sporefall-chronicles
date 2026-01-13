export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  date: string;
  author: string;
  imageUrl?: string;
  category: string;
  readTime: string;
  url: string;
  tags?: string[];
  commentsCount?: number;
  likesCount?: number;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  postCount: number;
}

export interface BlogSearchParams {
  limit?: number;
  offset?: number;
  category?: string;
  author?: string;
  searchTerm?: string;
  sortBy?: 'date' | 'popularity' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogResponse {
  posts: BlogPost[];
  total: number;
  hasNext: boolean;
  categories?: BlogCategory[];
}