'use client';

import { useState, useEffect } from 'react';
import PageWrapper from '../../components/layout/PageWrapper';
import { BlogPost } from '../../types/blog';

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blog');
        if (!response.ok) {
          throw new Error('Failed to fetch blog posts');
        }
        const data = await response.json();
        setPosts(data.posts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="text-cyan-400 text-xl">ACCESSING BLOG DATABASE...</div>
          <div className="mt-4 w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-6 py-4 rounded max-w-md text-center">
            <p>ERROR: {error}</p>
          </div>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      {/* Hero Section - Cyberpunk Style */}
      <section className="py-16 px-4 bg-[#0a0a0f] scanline">
        <div className="max-w-4xl mx-auto text-center section-frame">
          <div className="mb-4 flex justify-center items-center space-x-2">
            <div className="status-indicator"></div>
            <span className="text-cyan-400 text-sm tracking-wider font-mono">BLOG DATABASE ONLINE</span>
            <div className="relative flex h-3 w-3 items-center justify-center">
              <div className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-400 opacity-75"></div>
              <div className="relative h-2 w-2 rounded-full bg-cyan-400"></div>
            </div>
          </div>
          <div className="relative inline-block mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 glitch-text font-mono" data-text="SPOREFALL CHRONICLES BLOG">
              SPOREFALL CHRONICLES BLOG
            </h1>
            <div className="absolute -inset-1 bg-cyan-400/20 blur opacity-70 animate-pulse"></div>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8 font-mono">
            EXPLORING THE LATEST DISCOVERIES AND THEORIES ABOUT THE MYSTERIOUS SPOREFALL PHENOMENON
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Blog Content - Cyberpunk Style */}
      <section className="py-16 px-4 bg-[#111118]">
        <div className="max-w-6xl mx-auto section-frame">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <article 
                key={post.id} 
                className="bg-[#1a1a25]/50 border border-[#2a2a40] rounded-sm overflow-hidden transition-all duration-300 relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {post.imageUrl && (
                  <div className="h-48 bg-[#1a1a25] overflow-hidden border-b border-[#2a2a40] relative">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] to-transparent opacity-60"></div>
                  </div>
                )}
                <div className="p-6 relative z-10">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-bold text-magenta-400 bg-[#1a1a25]/70 px-3 py-1 border border-[#2a2a40] font-mono">
                      {post.category}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{post.readTime}</span>
                  </div>
                  <h2 className="text-xl font-bold text-cyan-400 mb-3 font-mono">{post.title}</h2>
                  <p className="text-gray-300 mb-4 font-mono text-sm">{post.excerpt}</p>
                  <div className="flex justify-between items-center pt-4 border-t border-[#2a2a40]">
                    <span className="text-xs text-gray-500 font-mono">BY {post.author.toUpperCase()}</span>
                    <span className="text-xs text-gray-500 font-mono">{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">NO BLOG POSTS AVAILABLE AT THE MOMENT.</p>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  );
}