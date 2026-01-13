'use client';

import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  
  return (
    <nav className="bg-[#0a0a0f] text-cyan-400 py-4 px-6 border-b border-[#2a2a40]">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo on the left with dark red animated effect */}
        <Link 
          href="/" 
          className="text-5xl font-bold uppercase tracking-widest transition-all duration-200 px-4 py-2 rounded-lg hover:bg-[#1a1a25] border transition-colors relative overflow-hidden sporefall-logo"
        >
          SPOREFALL CHRONICLES
        </Link>
        
        {/* Desktop Menu Items - Centered with increased spacing */}
        <div className="hidden md:flex items-center nav-menu">
          <Link 
            href="/" 
            className="text-cyan-400 uppercase tracking-widest hover:text-magenta-400 transition-all duration-200 nav-menu-item"
          >
            HOME
          </Link>
          <Link 
            href="/poll" 
            className="text-cyan-400 uppercase tracking-widest hover:text-magenta-400 transition-all duration-200 nav-menu-item"
          >
            POLL
          </Link>
          <Link 
            href="/results" 
            className="text-cyan-400 uppercase tracking-widest hover:text-magenta-400 transition-all duration-200 nav-menu-item"
          >
            RESULTS
          </Link>
          <Link 
            href="/blog" 
            className="text-cyan-400 uppercase tracking-widest hover:text-magenta-400 transition-all duration-200 nav-menu-item"
          >
            BLOG
          </Link>
        </div>
        
        {/* Social Icons on the right - REMOVED */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Social icons removed */}
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;