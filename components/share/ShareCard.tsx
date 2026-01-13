import React from 'react';
import ShareButtons from './ShareButtons';

interface ShareCardProps {
  title: string;
  description: string;
  url: string;
  imageUrl?: string;
  className?: string;
}

const ShareCard: React.FC<ShareCardProps> = ({ 
  title, 
  description, 
  url, 
  imageUrl, 
  className = '' 
}) => {
  return (
    <div className={`system-ui neon-border ${className}`}>
      {imageUrl && (
        <div className="h-48 bg-[#111118]">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-bold text-cyan-400 mb-2 tracking-wider">{title}</h3>
        <p className="text-gray-300 mb-4 font-mono text-sm">{description}</p>
        <div className="pt-4 border-t border-[#2a2a40]">
          <h4 className="text-xs font-bold text-magenta-400 mb-3 tracking-widest">TRANSMIT THIS DATA:</h4>
          <ShareButtons 
            url={url}
            title={title}
            description={description}
          />
        </div>
      </div>
    </div>
  );
};

export default ShareCard;