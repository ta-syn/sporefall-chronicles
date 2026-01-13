'use client';

import { useState, useEffect } from 'react';
import PollModal from '../../components/poll/PollModal';
import PageWrapper from '../../components/layout/PageWrapper';

export default function PollPage() {
  const [showPollModal, setShowPollModal] = useState(false);

  // Show the modal automatically when the page loads
  useEffect(() => {
    setShowPollModal(true);
  }, []);

  const closeModal = () => {
    setShowPollModal(false);
    // Optionally redirect to home after closing
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    }, 300); // Delay to allow for animation
  };

  return (
    <PageWrapper>
      {/* Hero Section - Cyberpunk Style */}
      <section className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 py-16 scanline">
        <div className="max-w-4xl w-full text-center section-frame">
          <div className="mb-4 flex justify-center items-center space-x-2">
            <div className="status-indicator"></div>
            <span className="text-cyan-400 text-sm tracking-wider font-mono">POLL SCAN INITIATED</span>
            <div className="relative flex h-3 w-3 items-center justify-center">
              <div className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-400 opacity-75"></div>
              <div className="relative h-2 w-2 rounded-full bg-cyan-400"></div>
            </div>
          </div>
          <div className="relative inline-block mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 glitch-text font-mono" data-text="MYSTERY POLL">
              MYSTERY POLL
            </h1>
            <div className="absolute -inset-1 bg-cyan-400/20 blur opacity-70 animate-pulse"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto font-mono">
            HELP US UNCOVER THE SECRETS OF THE SPOREFALL PHENOMENON BY PARTICIPATING IN OUR ANALYSIS.
          </p>
          <p className="text-gray-500 mb-8 max-w-2xl mx-auto font-mono">
            YOUR PARTICIPATION WILL HELP OUR RESEARCH COMMUNITY UNDERSTAND DIFFERENT THEORIES ABOUT THIS MYSTERIOUS OCCURRENCE.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => setShowPollModal(true)}
              className="btn btn-primary neon-border py-4 px-8 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">INITIATE POLL SCAN</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <a 
              href="/"
              className="btn btn-outline neon-border py-4 px-8 text-lg relative overflow-hidden group"
            >
              <span className="relative z-10">RETURN TO MAIN MENU</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </a>
          </div>
        </div>
      </section>

      <PollModal 
        isOpen={showPollModal} 
        onClose={closeModal} 
      />
    </PageWrapper>
  );
}