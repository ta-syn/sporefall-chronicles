import React from 'react';
import ShareButtons from './ShareButtons';

interface ShareCTAProps {
  title?: string;
  subtitle?: string;
  description?: string;
  url: string;
  className?: string;
}

const ShareCTA: React.FC<ShareCTAProps> = ({ 
  title = "TRANSMIT THIS DATA", 
  subtitle = "INITIATE DISTRIBUTION PROTOCOL!", 
  description = "HELP US DISTRIBUTE THIS INTELLIGENCE BY TRANSMITTING THIS DATA TO YOUR NETWORK NODES.",
  url,
  className = '' 
}) => {
  return (
    <div className={`hud-panel neon-border text-center ${className}`}>
      <h2 className="text-2xl font-bold mb-2 text-cyan-400 tracking-wider">{title}</h2>
      <h3 className="text-lg text-magenta-400 mb-4 tracking-widest">{subtitle}</h3>
      <p className="mb-6 max-w-2xl mx-auto text-gray-300 text-sm font-mono tracking-wide">{description}</p>
      <div className="max-w-md mx-auto">
        <ShareButtons 
          url={url}
          title={title}
          description={description}
        />
      </div>
    </div>
  );
};

export default ShareCTA;