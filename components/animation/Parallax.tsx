import React, { useEffect, useRef } from 'react';

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

const Parallax: React.FC<ParallaxProps> = ({ 
  children, 
  speed = 0.5,
  className = '' 
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      if (!element) return;
      
      const scrollPosition = window.scrollY;
      const offset = scrollPosition * speed;
      
      element.style.transform = `translateY(${offset}px)`;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ 
        transform: 'translateY(0px)',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {children}
    </div>
  );
};

export default Parallax;