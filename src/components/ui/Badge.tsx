import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'category' | 'skill';
  className?: string;
}

export default function Badge({
  children,
  variant = 'default',
  className = '',
}: BadgeProps) {
  const variants: Record<NonNullable<BadgeProps['variant']>, string> = {
    // Subtle paper tag — used for skill chips on project cards
    default:
      'inline-flex items-center px-2.5 py-1 rounded-md bg-paper border border-border text-xs text-ink-soft hover:border-ink/40 hover:text-ink transition-colors',
    // Marker-highlight wash behind text, no container — used for project category
    category:
      'marker-highlight inline-block px-1.5 text-sm font-medium text-ink',
    // Terracotta-hover skill chip — used in skills lists where applicable
    skill:
      'inline-flex items-center px-2.5 py-1 rounded-md bg-paper border border-border text-xs text-ink-soft hover:border-terracotta hover:text-terracotta transition-colors',
  };

  return <span className={`${variants[variant]} ${className}`}>{children}</span>;
}
