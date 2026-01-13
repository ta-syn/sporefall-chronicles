'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import ShareButtons from '../../components/share/ShareButtons';
import PageWrapper from '../../components/layout/PageWrapper';

export default function ResultsPage() {
  const [pollResults, setPollResults] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch('/api/poll');
        if (!response.ok) {
          throw new Error('Failed to fetch poll results');
        }
        const data = await response.json();
        setPollResults(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-4">
          <div className="text-cyan-400 text-xl">INITIALIZING ANALYSIS...</div>
          <div className="mt-4 w-16 h-16 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="min-h-screen bg-[#0a0a0f] flex flex-col items-center justify-center p-4">
          <div className="bg-red-900/30 border border-red-500 text-red-400 px-6 py-4 rounded max-w-md">
            <p>ERROR: {error}</p>
            <Link href="/" className="mt-2 text-cyan-400 hover:text-magenta-400 font-bold inline-block">
              RETURN TO MAIN MENU
            </Link>
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
            <span className="text-cyan-400 text-sm tracking-wider font-mono">ANALYSIS COMPLETE</span>
            <div className="relative flex h-3 w-3 items-center justify-center">
              <div className="absolute h-3 w-3 animate-ping rounded-full bg-cyan-400 opacity-75"></div>
              <div className="relative h-2 w-2 rounded-full bg-cyan-400"></div>
            </div>
          </div>
          <div className="relative inline-block mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-cyan-400 mb-4 glitch-text font-mono text-center" data-text="POLL RESULTS">
              POLL RESULTS
            </h1>
            <div className="absolute -inset-1 bg-cyan-400/20 blur opacity-70 animate-pulse"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 mb-6 max-w-2xl mx-auto font-mono text-center">
            ANALYSIS OF COMMUNITY DATA REGARDING THE SPOREFALL PHENOMENON.
          </p>
        </div>
      </section>

      {/* Results Content - Cyberpunk Style */}
      <section className="py-16 px-4 bg-[#111118]">
        <div className="max-w-4xl mx-auto section-frame">
          <div className="system-ui max-w-3xl mx-auto mb-12 neon-border">
            <h2 className="text-2xl font-bold text-cyan-400 mb-8 text-center glitch-text" data-text="POLL SUMMARY">
              POLL SUMMARY
            </h2>
            
            {pollResults && (
              <>
                <div className="mb-10 text-center">
                  <div className="inline-block p-4 bg-[#1a1a25]/50 border border-[#2a2a40] rounded-sm mb-4">
                    <div className="text-4xl font-bold text-magenta-400 mb-2">{pollResults.totalVotes}</div>
                    <p className="text-gray-300 uppercase tracking-wider font-mono text-sm">Total Votes Analyzed</p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    <div className="p-2 bg-[#1a1a25]/30 border border-[#2a2a40] rounded-sm">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-mono text-center">Last Updated</p>
                      <p className="text-cyan-400 font-mono text-sm text-center">{new Date(pollResults.lastUpdated).toLocaleDateString()}</p>
                    </div>
                    <div className="p-2 bg-[#1a1a25]/30 border border-[#2a2a40] rounded-sm">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-mono text-center">Status</p>
                      <p className="text-green-400 font-mono text-sm text-center">ANALYSIS COMPLETE</p>
                    </div>
                    <div className="p-2 bg-[#1a1a25]/30 border border-[#2a2a40] rounded-sm">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-mono text-center">Accuracy</p>
                      <p className="text-cyan-400 font-mono text-sm text-center">99.7%</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-3 bg-[#1a1a25]/30 border border-[#2a2a40] rounded-sm text-center">
                    <h3 className="text-cyan-400 font-mono text-sm uppercase tracking-wider mb-2">Data Distribution Analysis</h3>
                    <div className="h-1 w-full bg-[#2a2a40] rounded-full overflow-hidden mx-auto max-w-xs">
                      <div className="h-full bg-gradient-to-r from-cyan-500/50 via-magenta-500/50 to-green-500/50" style={{width: '100%'}}></div>
                    </div>
                  </div>
                  
                  {pollResults.options.map((option: any, index: number) => (
                    <div key={index} className="w-full bg-[#1a1a25]/30 border border-[#2a2a40] rounded-sm overflow-hidden relative mx-auto max-w-2xl">
                      <div className="p-3 border-b border-[#2a2a40]">
                        <div className="flex flex-col items-center justify-center text-center">
                          <h4 className="font-bold text-cyan-400 font-mono text-center">{option.option}</h4>
                          <div className="mt-2 flex justify-center gap-4">
                            <div className="text-white font-bold text-lg">{option.percentage}%</div>
                            <div className="text-gray-400 text-sm font-mono">{option.votes} votes</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="h-4 bg-[#2a2a40] rounded-full overflow-hidden relative max-w-xs mx-auto">
                          <div 
                            className="h-full bg-gradient-to-r from-cyan-500/30 to-magenta-500/30"
                            style={{ width: `${option.percentage}%` }}
                          ></div>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        </div>
                      </div>
                      <div className="p-2 bg-[#111118]/50 text-xs text-gray-500 font-mono text-center">
                        Confidence Level: {(option.percentage * 0.85).toFixed(1)}%
                      </div>
                    </div>
                  ))}
                  
                  <div className="mt-8 p-4 bg-gradient-to-br from-[#1a1a25]/50 to-[#111118]/50 border border-[#2a2a40] rounded-sm max-w-2xl mx-auto">
                    <h3 className="text-magenta-400 font-mono text-sm uppercase tracking-wider mb-3 text-center">Analysis Summary</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="p-3 bg-[#111118]/30 border border-[#2a2a40] rounded-sm">
                        <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1 text-center">Most Popular Theory</div>
                        <div className="text-white font-mono text-center">
                          {pollResults.options.reduce((prev: any, current: any) => prev.votes > current.votes ? prev : current).option}
                        </div>
                      </div>
                      <div className="p-3 bg-[#111118]/30 border border-[#2a2a40] rounded-sm">
                        <div className="text-cyan-400 text-xs font-mono uppercase tracking-wider mb-1 text-center">Consensus Level</div>
                        <div className="text-white font-mono text-center">
                          {(Math.max(...pollResults.options.map((o: any) => o.percentage)) - Math.min(...pollResults.options.map((o: any) => o.percentage))).toFixed(1)}% variance
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          
          <div className="max-w-lg mx-auto text-center">
            <h3 className="text-xl font-bold text-cyan-400 mb-6 glitch-text text-center" data-text="TRANSMIT DATA">
              TRANSMIT DATA
            </h3>
            <div className="mb-8">
              <ShareButtons 
                url={typeof window !== 'undefined' ? window.location.href : ''}
                title="Check out the Sporefall Chronicles Poll Results!"
                description="See what the community thinks about the mysteries of the Sporefall phenomenon."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                href="/"
                className="btn btn-primary neon-border py-3 px-6 relative overflow-hidden group mx-auto"
              >
                <span className="relative z-10">RETURN TO MAIN MENU</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
              <Link 
                href="/poll"
                className="btn btn-outline neon-border py-3 px-6 relative overflow-hidden group mx-auto"
              >
                <span className="relative z-10">INITIATE NEW SCAN</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
