export interface PollOption {
  id: string;
  text: string;
  votes?: number;
  percentage?: number;
}

export interface PollSubmission {
  pollChoice: string;
  email: string;
  userAgent?: string;
  ip?: string;
  utmParams?: Record<string, string>;
}

export interface PollResult {
  totalVotes: number;
  options: {
    option: string;
    votes: number;
    percentage: number;
  }[];
  lastUpdated: string;
}

export interface PollState {
  currentStep: 'question' | 'email' | 'thankyou';
  selectedOption: string | null;
  email: string;
  submitted: boolean;
}