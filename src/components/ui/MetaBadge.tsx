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
  title,
}: MetaBadgeProps) {
  const baseClasses =
    'inline-flex items-center gap-1.5 rounded-md text-xs font-medium transition-colors duration-200';

  const variantClasses = {
    default:
      'px-2.5 py-1 bg-paper border border-border text-ink-soft hover:border-ink/40 hover:text-ink',
    emphasized:
      'px-3 py-1.5 bg-paper-deeper border border-border-strong text-ink hover:border-terracotta',
    compact:
      'px-2 py-0.5 bg-paper border border-border text-ink-soft text-[11px] hover:border-ink/40 hover:text-ink',
  };

  const textClasses = truncate ? 'truncate max-w-[180px]' : '';

  return (
    <span
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      aria-label={ariaLabel || text}
      title={title}
    >
      <Icon className="w-3 h-3 flex-shrink-0 text-terracotta" aria-hidden="true" />
      <span className={textClasses}>{text}</span>
    </span>
  );
}
