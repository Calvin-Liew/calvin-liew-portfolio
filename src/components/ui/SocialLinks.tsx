'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { aboutData } from '@/data/about';

interface SocialLinksProps {
  variant?: 'default' | 'header' | 'footer';
  showLabels?: boolean;
  className?: string;
}

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export default function SocialLinks({
  variant = 'default',
  showLabels = false,
  className = ''
}: SocialLinksProps) {
  const variantClasses = {
    default: 'flex gap-4',
    header: 'flex gap-3',
    footer: 'flex gap-4',
  };

  return (
    <div className={`${variantClasses[variant]} ${className}`}>
      {aboutData.socialLinks.map((link) => {
        const Icon = iconMap[link.platform as keyof typeof iconMap];

        return (
          <a
            key={link.platform}
            href={link.url}
            target={link.platform !== 'Email' ? '_blank' : undefined}
            rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
            className="group relative touch-target-enhanced p-3 rounded-lg border border-border-light bg-surface hover:border-cosmic-purple hover:bg-cosmic-purple/10 transition-all duration-300 hover:scale-105"
            aria-label={`${link.platform}: ${link.url}`}
          >
            <Icon
              className="w-6 h-6 text-secondary group-hover:text-cosmic-purple transition-colors"
            />
            {showLabels && (
              <span className="ml-2 text-sm text-secondary group-hover:text-cosmic-purple">
                {link.platform}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
