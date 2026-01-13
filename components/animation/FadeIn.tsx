import React, { useEffect, useRef } from 'react';

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.5, 
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    
    // Trigger animation after delay
    const timer = setTimeout(() => {
      element.style.transition = `opacity ${duration}s ease, transform ${duration}s ease`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default FadeIn;