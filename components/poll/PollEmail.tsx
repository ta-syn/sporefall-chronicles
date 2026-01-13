import React, { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface PollEmailProps {
  email: string;
  setEmail: (email: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  selectedOption: string;
}

const PollEmail: React.FC<PollEmailProps> = ({ 
  email, 
  setEmail, 
  onSubmit, 
  onBack,
  selectedOption
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await onSubmit();
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="mb-6 relative">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <h3 className="text-lg font-bold text-cyan-400 tracking-wider font-mono">
            DATA ANALYSIS CONFIRMED
          </h3>
        </div>
        <div className="text-sm text-gray-500 font-mono tracking-wider">
          THEORY SELECTED: <span className="font-bold text-magenta-400">{selectedOption}</span>
        </div>
        <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-gradient-to-r from-cyan-500 to-transparent"></div>
      </div>
      
      <div className="p-3 bg-[#1a1a25]/50 border border-[#2a2a40] rounded-sm mb-4">
        <div className="flex items-center space-x-2">
          <div className="text-cyan-400 text-xs font-mono">SYSTEM STATUS:</div>
          <div className="flex space-x-1">
            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></div>
            <div className="w-1.5 h-1.5 bg-magenta-400 rounded-full animate-pulse delay-75"></div>
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse delay-150"></div>
          </div>
        </div>
      </div>
      
      <Input
        label="RESEARCHER ID (EMAIL)"
        type="email"
        placeholder="ENTER ENCRYPTED TRANSMISSION ADDRESS"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="font-mono"
      />
      
      <div className="p-3 bg-[#1a1a25]/50 border border-[#2a2a40] rounded-sm">
        <p className="text-xs text-gray-500 tracking-wider font-mono">
          ENCRYPTED TRANSMISSIONS ENABLED: SPOREFALL CHRONICLES & POLL RESULTS
        </p>
        <p className="text-xs text-gray-500 tracking-wider font-mono mt-1">
          DATA PROTECTION: AES-256 ENCRYPTION ACTIVE
        </p>
      </div>
      
      <div className="flex space-x-3 pt-4">
        <Button 
          type="button" 
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="relative overflow-hidden group"
        >
          <span className="relative z-10">BACK TO SCAN</span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Button>
        <Button 
          type="submit" 
          variant="primary"
          disabled={!email || isSubmitting}
          className="flex-1 relative overflow-hidden group"
        >
          <span className="relative z-10">
            {isSubmitting ? 'TRANSMITTING DATA...' : 'INITIATE ANALYSIS'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        </Button>
      </div>
    </form>
  );
};

export default PollEmail;