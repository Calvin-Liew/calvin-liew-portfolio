import Link from 'next/link';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: 'primary' | 'secondary' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
}

export default function Button({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  ariaLabel
}: ButtonProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-offset-2 focus:ring-offset-background';

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  const variantClasses = {
    primary: 'bg-foreground hover:bg-foreground/90 text-background hover:shadow-lg hover:shadow-foreground/20 active:scale-95',
    secondary: 'bg-transparent border-2 border-border-light hover:border-cosmic-purple hover:bg-cosmic-purple/5 text-foreground hover:shadow-md hover:shadow-cosmic-purple/20 active:scale-95',
    gradient: 'bg-linear-to-r from-cosmic-purple to-cosmic-blue hover:from-cosmic-violet hover:to-cosmic-cyan text-white hover:shadow-lg hover:shadow-cosmic-purple/50 active:scale-95'
  };

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
