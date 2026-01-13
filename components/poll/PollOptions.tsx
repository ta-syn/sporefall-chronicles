import React from 'react';
import Button from '../ui/Button';

interface PollOptionsProps {
  onSelect: (option: string) => void;
}

const PollOptions: React.FC<PollOptionsProps> = ({ onSelect }) => {
  const pollOptions = [
    'Ancient Spore Cultivation',
    'Natural Evolution Process',
    'Extraterrestrial Origin',
    'Mythological Explanation'
  ];

  return (
    <div className="poll-options-container space-y-4">
      <div className="mb-6 relative">
        <h3 className="text-lg font-medium text-cyan-400 mb-2 tracking-wider font-mono">
          SCANNING FOR SPOREFALL ORIGIN...
        </h3>
        <div className="text-sm text-gray-500 font-mono tracking-wider">
          SELECT THEORY FOR ANALYSIS
        </div>
        <div className="absolute bottom-0 left-0 w-24 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
      </div>
      
      <div className="grid grid-cols-1 gap-3">
        {pollOptions.map((option, index) => (
          <div key={index} className="group relative overflow-hidden">
            <Button
              variant="outline"
              size="md"
              className="w-full poll-option-btn flex items-center justify-center text-center system-ui neon-border relative z-10"
              onClick={() => onSelect(option)}
            >
              <div className="flex items-center justify-center w-full">
                <span className="mr-3 font-bold text-magenta-400 font-mono">{String.fromCharCode(65 + index)}.</span>
                <span className="text-gray-300 font-mono text-center flex-1">{option}</span>
              </div>
            </Button>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-3 bg-[#1a1a25]/50 border border-[#2a2a40] rounded-sm">
        <p className="text-xs text-gray-500 tracking-wider font-mono">
          ANALYZING COMMUNITY THEORIES... SEQUENCING DATA FOR PROCESSING
        </p>
        <div className="mt-2 flex space-x-1">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-magenta-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse delay-200"></div>
        </div>
      </div>
    </div>
  );
};

export default PollOptions;