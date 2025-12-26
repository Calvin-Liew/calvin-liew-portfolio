import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'category' | 'skill';
  className?: string;
}

export default function Badge({ children, variant = 'default', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-all duration-200';

  const variantClasses = {
    default: 'bg-surface border border-border-light text-secondary hover:scale-105',
    category: 'bg-linear-to-r from-cosmic-purple/10 to-cosmic-blue/10 border border-cosmic-purple/20 text-foreground hover:from-cosmic-purple/20 hover:to-cosmic-blue/20 hover:border-cosmic-purple/40 hover:scale-105',
    skill: 'bg-transparent border border-border-light text-secondary hover:border-cosmic-purple hover:bg-cosmic-purple/5 hover:text-cosmic-purple hover:scale-105'
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
