'use client';

import { aboutData } from '@/data/about';
import { HandGithub, HandLinkedIn, HandMail } from './HandDrawn';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  GitHub: HandGithub,
  LinkedIn: HandLinkedIn,
  Email: HandMail,
};

export default function FloatingSocial() {
  return (
    <div className="fixed right-6 bottom-6 hidden lg:flex flex-col gap-3 z-40">
      {aboutData.socialLinks.map((link) => {
        const Icon = iconMap[link.platform];
        if (!Icon) return null;

        return (
          <a
            key={link.platform}
            href={link.url}
            target={link.platform !== 'Email' ? '_blank' : undefined}
            rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
            className="group p-3 rounded-lg border border-border bg-paper/90 backdrop-blur-sm hover:border-terracotta hover:bg-terracotta-wash transition-all duration-200"
            aria-label={link.platform}
          >
            <Icon className="w-5 h-5 text-ink-soft group-hover:text-terracotta transition-colors" />
          </a>
        );
      })}
    </div>
  );
}
