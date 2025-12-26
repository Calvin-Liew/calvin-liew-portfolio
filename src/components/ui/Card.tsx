import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = true }: CardProps) {
  const hoverClasses = hover
    ? 'hover:-translate-y-1 hover:border-cosmic-purple/40 hover:shadow-2xl hover:shadow-cosmic-purple/30'
    : '';

  return (
    <div
      className={`
        relative overflow-hidden
        bg-surface
        border border-border-light
        rounded-lg p-6
        transition-all duration-300
        before:absolute before:inset-0 before:-z-10
        before:bg-linear-to-br before:from-cosmic-purple/0 before:via-cosmic-blue/0 before:to-cosmic-cyan/0
        hover:before:from-cosmic-purple/10 hover:before:via-cosmic-blue/5 hover:before:to-cosmic-cyan/10
        before:transition-all before:duration-500
        ${hoverClasses}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
