import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'default' | 'surface';
  id?: string;
}

export default function Section({
  children,
  className = '',
  background = 'default',
  id
}: SectionProps) {
  const bgClass = background === 'surface' ? 'bg-surface' : 'bg-background';

  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${bgClass} ${className}`}>
      {children}
    </section>
  );
}
