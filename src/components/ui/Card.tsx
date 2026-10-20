import React from 'react';
import { Doodle } from './HandDrawn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  /** Slight rotation in degrees (e.g. -1, 0.5) for the pinned-to-paper feel */
  tilt?: number;
  /** Optional corner doodle (top-right) */
  corner?: 'lightbulb' | 'coffee' | 'magnifier' | 'pencil' | 'paperplane' | 'sparkle';
  /** 'paper' lifts the card off a surface-coloured section */
  tone?: 'deeper' | 'paper';
}

export default function Card({
  children,
  className = '',
  hover = true,
  tilt,
  corner,
  tone = 'deeper',
}: CardProps) {
  const toneClasses =
    tone === 'paper' ? 'bg-paper border-border-strong' : 'bg-paper-deeper border-border';
  const hoverClasses = hover
    ? 'hover:-translate-y-1 hover:shadow-lg hover:border-ink/30'
    : '';

  return (
    <div
      style={tilt ? { transform: `rotate(${tilt}deg)` } : undefined}
      className={`
        group relative
        border ${toneClasses}
        rounded-xl p-6
        shadow-paper
        overflow-hidden
        transition-all duration-300
        ${hoverClasses}
        ${className}
      `.replace(/\s+/g, ' ')}
    >
      {corner && (
        <Doodle
          name={corner}
          className="absolute top-4 right-4 w-7 h-7 text-ink-soft group-hover:text-terracotta transition-colors duration-300"
          color="currentColor"
        />
      )}
      {children}
    </div>
  );
}
