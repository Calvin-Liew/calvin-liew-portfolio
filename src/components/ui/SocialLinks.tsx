'use client';

import { aboutData } from '@/data/about';
import { HandGithub, HandLinkedIn, HandMail } from './HandDrawn';

interface SocialLinksProps {
  variant?: 'default' | 'header' | 'footer';
  showLabels?: boolean;
  className?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: HandGithub,
  LinkedIn: HandLinkedIn,
  Email: HandMail,
};

export default function SocialLinks({
  variant = 'default',
  showLabels = false,
  className = '',
}: SocialLinksProps) {
  const variantClasses = {
    default: 'flex gap-4',
    header: 'flex gap-3',
    footer: 'flex gap-4',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {aboutData.socialLinks.map((link) => {
        const Icon = iconMap[link.platform];
        if (!Icon) return null;

        return (
          <a
            key={link.platform}
            href={link.url}
            target={link.platform !== 'Email' ? '_blank' : undefined}
            rel={
              link.platform !== 'Email' ? 'noopener noreferrer' : undefined
            }
            className="group relative touch-target-enhanced p-3 rounded-lg border border-border bg-paper-deeper/60 hover:border-terracotta hover:bg-terracotta-wash hover:-translate-y-0.5 transition-all duration-300"
            aria-label={`${link.platform}: ${link.url}`}
          >
            <Icon className="w-6 h-6 text-ink-soft group-hover:text-terracotta transition-colors" />
            {showLabels && (
              <span className="ml-2 text-sm text-ink-soft group-hover:text-terracotta">
                {link.platform}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
