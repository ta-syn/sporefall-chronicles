import React, { useEffect, useRef } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ 
  children, 
  className = '',
  threshold = 0.1,
  rootMargin = '0px' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Set initial state
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [threshold, rootMargin]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;