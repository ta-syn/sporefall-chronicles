'use client';

import Link from 'next/link';
import { useState } from 'react';
import PollModal from '../components/poll/PollModal';
import PageWrapper from '../components/layout/PageWrapper';

export default function HomePage() {
  const [showPollModal, setShowPollModal] = useState(false);

  return (
    <PageWrapper>
      {/* Hero Section - Cyberpunk Game Interface */}
      <section className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center px-4 py-16 scanline relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#00ffff10] to-transparent opacity-30"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMGZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/10 via-transparent to-magenta-900/10"></div>
        
        <div className="max-w-4xl w-full text-center relative z-10">
          <div className="mb-4 flex justify-center items-center space-x-2">
            <div className="status-indicator"></div>
            <span className="text-cyan-400 text-sm tracking-wider font-mono">SYSTEM ONLINE</span>
            <div className="relative flex h-3 w-3 items-center justify-center">
              <div className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-400 opacity-75"></div>
              <div className="relative h-2 w-2 rounded-full bg-cyan-400"></div>
            </div>
          </div>
          
          <div className="relative inline-block mb-6">
            <h1 className="text-4xl md:text-6xl font-bold text-cyan-400 mb-4 glitch-text font-mono text-center" data-text="SPOREFALL CHRONICLES">
              SPOREFALL CHRONICLES
            </h1>
            <div className="absolute -inset-1 bg-cyan-400/20 blur opacity-70 animate-pulse"></div>
          </div>
          
          <div className="text-magenta-400 text-xs mb-2 tracking-widest font-mono text-center">ACCESS LEVEL: RESEARCHER | CLASSIFICATION: MYSTERIUM</div>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-mono text-center">
            INITIATING RESEARCH PROTOCOL... UNCOVERING THE MYSTERIES OF THE SPOREFALL PHENOMENON.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-12 max-w-lg mx-auto">
            <button 
              onClick={() => setShowPollModal(true)}
              className="btn btn-primary neon-border py-4 px-8 text-lg relative overflow-hidden group mx-auto"
            >
              <span className="relative z-10">INITIATE POLL SCAN</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            
            <Link 
              href="/blog"
              className="btn btn-outline neon-border py-4 px-8 text-lg relative overflow-hidden group mx-auto"
            >
              <span className="relative z-10">ACCESS BLOG DATA</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </Link>
          </div>
          
          <div className="mt-12 text-xs text-gray-500 tracking-widest font-mono text-center">
            <div>COORDINATES: [X: 42.123, Y: -71.456, Z: 15.789]</div>
            <div>VERSION: 2.1.0 | TIMESTAMP: {new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC</div>
          </div>
        </div>
      </section>

      {/* About Section - Cyberpunk Style */}
      <section className="py-20 px-4 bg-[#0a0a0f]">
        <div className="max-w-4xl mx-auto text-center section-frame">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6 glitch-text text-center" data-text="ABOUT SPOREFALL CHRONICLES">
            ABOUT SPOREFALL CHRONICLES
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-3xl mx-auto text-center">
            WE ARE A RESEARCH COLLECTIVE DEDICATED TO UNDERSTANDING THE MYSTERIOUS SPOREFALL PHENOMENON. 
            THROUGH COMMUNITY PARTICIPATION AND SCIENTIFIC INQUIRY, WE AIM TO UNCOVER THE TRUTH BEHIND 
            THIS EXTRAORDINARY NATURAL OCCURRENCE.
          </p>
          <div className="w-24 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent mx-auto"></div>
        </div>
      </section>

      {/* Participate Section - Cyberpunk Style */}
      <section className="py-20 px-4 bg-[#111118]">
        <div className="max-w-4xl mx-auto text-center section-frame">
          <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6 glitch-text text-center" data-text="PARTICIPATE IN OUR RESEARCH">
            PARTICIPATE IN OUR RESEARCH
          </h2>
          <p className="text-lg text-gray-300 mb-10 max-w-3xl mx-auto text-center">
            YOUR PARTICIPATION HELPS US GATHER VALUABLE DATA ABOUT THE SPOREFALL PHENOMENON. 
            JOIN HUNDREDS OF OTHER RESEARCHERS AND ENTHUSIASTS IN OUR QUEST FOR KNOWLEDGE.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="card p-8 neon-border">
              <div className="text-cyan-400 text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3 text-center">INITIATE POLL SCAN</h3>
              <p className="text-gray-300 mb-4 text-center">
                SHARE YOUR THEORIES ABOUT THE ORIGIN OF THE SPOREFALL PHENOMENON
              </p>
              <button 
                onClick={() => setShowPollModal(true)}
                className="text-cyan-400 font-bold hover:text-magenta-400 transition-colors mx-auto block"
              >
                ENGAGE →
              </button>
            </div>
            
            <div className="card p-8 neon-border">
              <div className="text-cyan-400 text-4xl mb-4">📖</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3 text-center">ACCESS BLOG DATA</h3>
              <p className="text-gray-300 mb-4 text-center">
                STAY UPDATED WITH THE LATEST DISCOVERIES AND THEORIES
              </p>
              <Link href="/blog" className="text-cyan-400 font-bold hover:text-magenta-400 transition-colors mx-auto block">
                EXPLORE →
              </Link>
            </div>
            
            <div className="card p-8 neon-border">
              <div className="text-cyan-400 text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-cyan-400 mb-3 text-center">VIEW ANALYSIS</h3>
              <p className="text-gray-300 mb-4 text-center">
                SEE WHAT THE COMMUNITY THINKS ABOUT OUR RESEARCH
              </p>
              <Link href="/results" className="text-cyan-400 font-bold hover:text-magenta-400 transition-colors mx-auto block">
                ANALYZE →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Cyberpunk Style */}
      <section className="py-20 px-4 bg-[#0a0a0f]">
        <div className="max-w-3xl mx-auto text-center hud-panel">
          <h2 className="text-3xl md:text-4xl font-bold text-magenta-400 mb-6 glitch-text text-center" data-text="JOIN OUR RESEARCH COMMUNITY">
            JOIN OUR RESEARCH COMMUNITY
          </h2>
          <p className="text-xl mb-8 text-gray-300 text-center">
            BE PART OF THE JOURNEY TO UNCOVER THE MYSTERIES OF THE SPOREFALL PHENOMENON
          </p>
          <button 
            onClick={() => setShowPollModal(true)}
            className="btn btn-secondary neon-border py-4 px-8 text-lg mx-auto block"
          >
            INITIATE RESEARCH PROTOCOL
          </button>
        </div>
      </section>

      <PollModal 
        isOpen={showPollModal} 
        onClose={() => setShowPollModal(false)} 
      />
    </PageWrapper>
  );
}