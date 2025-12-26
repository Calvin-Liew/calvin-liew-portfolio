'use client';

import { Github, Linkedin, Mail } from 'lucide-react';
import { aboutData } from '@/data/about';

const iconMap = {
  GitHub: Github,
  LinkedIn: Linkedin,
  Email: Mail,
};

export default function FloatingSocial() {
  return (
    <div className="fixed right-6 bottom-6 hidden lg:flex flex-col gap-3 z-40">
      {aboutData.socialLinks.map((link) => {
        const Icon = iconMap[link.platform as keyof typeof iconMap];

        return (
          <a
            key={link.platform}
            href={link.url}
            target={link.platform !== 'Email' ? '_blank' : undefined}
            rel={link.platform !== 'Email' ? 'noopener noreferrer' : undefined}
            className="group p-3 rounded-lg border border-border-light bg-surface/90 backdrop-blur-sm hover:border-cosmic-purple hover:bg-cosmic-purple/10 transition-all duration-300 hover:scale-110"
            aria-label={link.platform}
          >
            <Icon className="w-5 h-5 text-secondary group-hover:text-cosmic-purple transition-colors" />
          </a>
        );
      })}
    </div>
  );
}
