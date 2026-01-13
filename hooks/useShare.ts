import { useState } from 'react';
import { ShareEvent, ShareStats, ShareOptions } from '../types/share';

export const useShare = () => {
  const [shareStats, setShareStats] = useState<ShareStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const trackShareEvent = async (platform: string, url: string, title?: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/share', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          platform,
          url,
          title,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to track share event');
      }

      const result = await response.json();
      return result.success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to track share event');
      console.error('Share tracking error:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const getShareStats = async (platform?: string) => {
    setLoading(true);
    setError(null);

    try {
      const url = platform ? `/api/share?platform=${platform}` : '/api/share';
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch share stats');
      }

      const stats = await response.json();
      setShareStats(stats);
      return stats;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch share stats');
      console.error('Share stats error:', err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const shareToPlatform = async (platform: string, options: ShareOptions) => {
    const { url, title, description } = options;
    
    // Track the share event
    await trackShareEvent(platform, url, title);

    // Open the share URL
    let shareUrl = '';
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title || '');
    const encodedDescription = encodeURIComponent(description || '');

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodedTitle}&body=${encodedDescription}%20${encodedUrl}`;
        break;
      default:
        shareUrl = url;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const resetShareState = () => {
    setShareStats(null);
    setError(null);
    setLoading(false);
  };

  return {
    shareStats,
    loading,
    error,
    trackShareEvent,
    getShareStats,
    shareToPlatform,
    resetShareState,
  };
};