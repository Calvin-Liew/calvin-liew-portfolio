import { LucideIcon } from 'lucide-react';

interface MetaBadgeProps {
  icon: LucideIcon;
  text: string;
  variant?: 'default' | 'emphasized' | 'compact';
  truncate?: boolean;
  className?: string;
  ariaLabel?: string;
  title?: string;
}

export default function MetaBadge({
  icon: Icon,
  text,
  variant = 'default',
  truncate = false,
  className = '',
  ariaLabel,
  title
}: MetaBadgeProps) {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-200';

  const variantClasses = {
    default: 'bg-gradient-to-r from-cosmic-purple/5 to-cosmic-cyan/5 border border-cosmic-purple/20 text-secondary hover:border-cosmic-purple/40 hover:scale-105',
    emphasized: 'bg-gradient-to-r from-cosmic-purple/10 to-cosmic-cyan/10 border border-cosmic-purple/30 text-primary hover:border-cosmic-purple/50 hover:scale-105',
    compact: 'bg-gradient-to-r from-cosmic-purple/5 to-cosmic-cyan/5 border border-cosmic-purple/15 text-secondary text-[11px] px-2 py-0.5 hover:border-cosmic-purple/30 hover:scale-105'
  };

  const textClasses = truncate ? 'truncate max-w-[180px]' : '';

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel || text}
      title={title}
    >
      <Icon className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
      <span className={textClasses}>{text}</span>
    </span>
  );
}
