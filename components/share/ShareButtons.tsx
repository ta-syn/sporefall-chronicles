import React from 'react';
import Button from '../ui/Button';

interface ShareButtonsProps {
  url?: string;
  title?: string;
  description?: string;
  onShare?: (platform: string) => void;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ 
  url = typeof window !== 'undefined' ? window.location.href : '',
  title = 'Check out Sporefall Chronicles',
  description = 'Discover the mysteries of the Sporefall phenomenon',
  onShare 
}) => {
  const shareToPlatform = async (platform: string) => {
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    
    let shareUrl = '';
    
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
    
    // Track the share event via API
    try {
      await fetch('/api/share', {
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
    } catch (error) {
      console.error('Failed to track share event:', error);
    }
    
    // Call the callback if provided
    if (onShare) {
      onShare(platform);
    }
    
    // Open the share URL in a new window
    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  const platforms = [
    { id: 'facebook', name: 'FACEBOOK', icon: 'f' },
    { id: 'twitter', name: 'TWITTER', icon: 't' },
    { id: 'linkedin', name: 'LINKEDIN', icon: 'in' },
    { id: 'whatsapp', name: 'WHATSAPP', icon: 'wa' },
    { id: 'email', name: 'EMAIL', icon: '📧' },
  ];

  return (
    <div className="flex flex-wrap gap-3">
      {platforms.map((platform) => (
        <Button
          key={platform.id}
          variant="outline"
          size="sm"
          onClick={() => shareToPlatform(platform.id)}
          className="flex items-center space-x-2 system-ui neon-border font-mono text-xs relative group"
        >
          <span className="text-cyan-400">{platform.icon}</span>
          <span className="text-gray-300 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-full top-1/2 transform -translate-y-1/2 bg-[#111118] px-2 py-1 rounded-sm border border-[#2a2a40] whitespace-nowrap">
            {platform.name}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default ShareButtons;