import { useState, useEffect } from 'react';
import { PollState } from '../types/poll';

export const usePoll = (initialState?: Partial<PollState>) => {
  const [pollState, setPollState] = useState<PollState>({
    currentStep: 'question',
    selectedOption: null,
    email: '',
    submitted: false,
    ...initialState,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectOption = (option: string) => {
    setPollState(prev => ({
      ...prev,
      selectedOption: option,
      currentStep: 'email',
    }));
  };

  const setEmail = (email: string) => {
    setPollState(prev => ({
      ...prev,
      email,
    }));
  };

  const submitPoll = async () => {
    if (!pollState.selectedOption || !pollState.email) {
      setError('Please select an option and enter your email');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/poll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pollChoice: pollState.selectedOption,
          email: pollState.email,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setPollState(prev => ({
          ...prev,
          currentStep: 'thankyou',
          submitted: true,
        }));
      } else {
        setError(result.error || 'Failed to submit poll');
      }
    } catch (err) {
      setError('Network error occurred');
      console.error('Poll submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  const resetPoll = () => {
    setPollState({
      currentStep: 'question',
      selectedOption: null,
      email: '',
      submitted: false,
    });
    setError(null);
    setLoading(false);
  };

  return {
    pollState,
    loading,
    error,
    selectOption,
    setEmail,
    submitPoll,
    resetPoll,
  };
};