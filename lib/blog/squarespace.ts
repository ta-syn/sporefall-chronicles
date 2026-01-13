// Squarespace blog integration

interface SquarespaceConfig {
  apiUrl: string;
  apiKey: string;
}

interface SquarespacePost {
  id: string;
  title: string;
  body: string;
  date: string; // ISO 8601 format
  tags: string[];
  categories: string[];
  author: {
    id: string;
    name: string;
  };
  imageUrl?: string;
  excerpt?: string;
  slug: string;
  status: 'published' | 'draft' | 'scheduled';
  commentsEnabled: boolean;
}

interface SquarespaceBlogResponse {
  items: SquarespacePost[];
  pagination: {
    nextPage: string | null;
    previousPage: string | null;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
  };
}

class SquarespaceService {
  private config: SquarespaceConfig;

  constructor(config: SquarespaceConfig) {
    this.config = config;
  }

  /**
   * Get all blog posts
   */
  async getBlogPosts(
    limit: number = 10,
    offset: number = 0,
    category?: string,
    tag?: string
  ): Promise<SquarespaceBlogResponse> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        ...(category && { category }),
        ...(tag && { tag }),
      });

      const response = await fetch(`${this.config.apiUrl}/blog?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Squarespace API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      throw error;
    }
  }

  /**
   * Get a specific blog post by ID
   */
  async getBlogPost(postId: string): Promise<SquarespacePost> {
    try {
      const response = await fetch(`${this.config.apiUrl}/blog/${postId}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Squarespace API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog post:', error);
      throw error;
    }
  }

  /**
   * Search blog posts
   */
  async searchBlogPosts(
    searchTerm: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<SquarespaceBlogResponse> {
    try {
      const params = new URLSearchParams({
        query: searchTerm,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`${this.config.apiUrl}/blog/search?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Squarespace API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching blog posts:', error);
      throw error;
    }
  }

  /**
   * Get blog posts by author
   */
  async getBlogPostsByAuthor(
    authorId: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<SquarespaceBlogResponse> {
    try {
      const params = new URLSearchParams({
        author: authorId,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`${this.config.apiUrl}/blog?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Squarespace API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog posts by author:', error);
      throw error;
    }
  }

  /**
   * Get blog posts by category
   */
  async getBlogPostsByCategory(
    category: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<SquarespaceBlogResponse> {
    try {
      const params = new URLSearchParams({
        category,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`${this.config.apiUrl}/blog?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Squarespace API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog posts by category:', error);
      throw error;
    }
  }

  /**
   * Get blog posts by tag
   */
  async getBlogPostsByTag(
    tag: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<SquarespaceBlogResponse> {
    try {
      const params = new URLSearchParams({
        tag,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`${this.config.apiUrl}/blog?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Squarespace API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching blog posts by tag:', error);
      throw error;
    }
  }

  /**
   * Get blog post comments
   */
  async getBlogPostComments(
    postId: string,
    limit: number = 10,
    offset: number = 0
  ): Promise<any[]> {
    try {
      const params = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`${this.config.apiUrl}/blog/${postId}/comments?${params}`, {
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Squarespace API error: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching blog post comments:', error);
      throw error;
    }
  }

  /**
   * Add a comment to a blog post
   */
  async addBlogPostComment(
    postId: string,
    comment: {
      authorName: string;
      authorEmail: string;
      content: string;
    }
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.config.apiUrl}/blog/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Squarespace API error: ${JSON.stringify(errorData)}`);
      }

      return true;
    } catch (error) {
      console.error('Error adding blog post comment:', error);
      return false;
    }
  }
}

// Initialize Squarespace service if environment variables are present
let squarespaceService: SquarespaceService | null = null;

if (process.env.SQUARESPACE_API_URL && process.env.SQUARESPACE_API_TOKEN) {
  squarespaceService = new SquarespaceService({
    apiUrl: process.env.SQUARESPACE_API_URL,
    apiKey: process.env.SQUARESPACE_API_TOKEN,
  });
}

/**
 * Get blog posts from Squarespace
 */
export const getSquarespaceBlogPosts = async (
  limit: number = 10,
  offset: number = 0,
  category?: string,
  tag?: string
): Promise<SquarespacePost[]> => {
  if (!squarespaceService) {
    console.warn('Squarespace service not configured');
    // Return mock data for development
    return [
      {
        id: '1',
        title: 'The Discovery of Ancient Spore Patterns',
        body: 'Researchers have uncovered remarkable patterns in fossilized spores that suggest a complex ecosystem existed millions of years ago.',
        date: '2023-11-15T10:00:00Z',
        tags: ['research', 'spores', 'ancient'],
        categories: ['Research'],
        author: { id: 'author1', name: 'Dr. Elena Vasquez' },
        excerpt: 'Researchers have uncovered remarkable patterns in fossilized spores that suggest a complex ecosystem existed millions of years ago.',
        slug: 'ancient-spore-patterns',
        status: 'published',
        commentsEnabled: true
      },
      {
        id: '2',
        title: 'Mysteries of the Sporefall Phenomenon',
        body: 'What causes the unusual spore precipitation events that locals call "Sporefall"? New theories emerge from recent observations.',
        date: '2023-10-28T14:30:00Z',
        tags: ['phenomenon', 'mystery', 'sporefall'],
        categories: ['Phenomena'],
        author: { id: 'author2', name: 'Marcus Chen' },
        excerpt: 'What causes the unusual spore precipitation events that locals call "Sporefall"? New theories emerge from recent observations.',
        slug: 'mysteries-sporefall',
        status: 'published',
        commentsEnabled: true
      }
    ];
  }

  try {
    const response = await squarespaceService.getBlogPosts(limit, offset, category, tag);
    return response.items;
  } catch (error) {
    console.error('Error fetching Squarespace blog posts:', error);
    return [];
  }
};

/**
 * Get a specific blog post
 */
export const getSquarespaceBlogPost = async (postId: string): Promise<SquarespacePost | null> => {
  if (!squarespaceService) {
    console.warn('Squarespace service not configured');
    return null;
  }

  try {
    return await squarespaceService.getBlogPost(postId);
  } catch (error) {
    console.error('Error fetching Squarespace blog post:', error);
    return null;
  }
};

/**
 * Search blog posts
 */
export const searchSquarespaceBlogPosts = async (searchTerm: string): Promise<SquarespacePost[]> => {
  if (!squarespaceService) {
    console.warn('Squarespace service not configured');
    return [];
  }

  try {
    const response = await squarespaceService.searchBlogPosts(searchTerm);
    return response.items;
  } catch (error) {
    console.error('Error searching Squarespace blog posts:', error);
    return [];
  }
};

export default squarespaceService;