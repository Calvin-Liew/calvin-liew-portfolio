import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  /**
   * primary    — solid ink, paper text (default CTA)
   * secondary  — paper background with ink/terracotta border
   * gradient   — solid terracotta (legacy alias kept so older code keeps working)
   */
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  target?: '_blank' | '_self';
  rel?: string;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  ariaLabel,
  target,
  rel,
}: ButtonProps) {
  const baseClasses =
    'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ink/40 focus:ring-offset-2 focus:ring-offset-paper select-none';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-md',
    md: 'px-6 py-3 text-base rounded-lg',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
    primary:
      'bg-ink text-paper hover:bg-ink-soft hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    secondary:
      'bg-paper text-ink border-2 border-ink/85 hover:border-terracotta hover:text-terracotta hover:bg-terracotta-wash hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
    gradient:
      'bg-terracotta text-paper hover:bg-terracotta-deep hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]',
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    if (isExternal) {
      return (
        <a
          href={href}
          className={classes}
          aria-label={ariaLabel}
          target={target}
          rel={rel || (target === '_blank' ? 'noopener noreferrer' : undefined)}
          onClick={onClick}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} aria-label={ariaLabel} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel}>
      {children}
    </button>
  );
}
