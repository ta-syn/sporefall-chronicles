// Type assertion to help TypeScript resolve modules
import React, { useState } from 'react';
import Modal from '../ui/Modal';
import PollOptions from './PollOptions';
import PollEmail from './PollEmail';

interface PollModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PollModal: React.FC<PollModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<'options' | 'email'>('options');
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [email, setEmail] = useState('');

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setStep('email');
  };

  const handleSubmit = async () => {
    if (!selectedOption || !email) return;

    try {
      const response = await fetch('/api/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pollChoice: selectedOption,
          email: email,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert('TRANSMISSION SUCCESSFUL! THANK YOU FOR PARTICIPATING IN THE RESEARCH PROTOCOL!');
        onClose();
      } else {
        alert('TRANSMISSION FAILED! PLEASE TRY AGAIN.');
      }
    } catch (error) {
      console.error('Error submitting poll:', error);
      alert('TRANSMISSION FAILED! PLEASE TRY AGAIN.');
    }
  };

  const handleBack = () => {
    setStep('options');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="SYSTEM SCAN INITIATED">
      <div className="modal-body">
        {step === 'options' && (
          <div className="scanline-pulse">
            <PollOptions onSelect={handleOptionSelect} />
          </div>
        )}
        
        {step === 'email' && selectedOption && (
          <div className="scanline-pulse">
            <PollEmail 
              email={email} 
              setEmail={setEmail} 
              onSubmit={handleSubmit}
              onBack={handleBack}
              selectedOption={selectedOption}
            />
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PollModal;