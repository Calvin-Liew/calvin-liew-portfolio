'use client';

import { ProjectCategory } from '@/types';

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const categories = ['All', 'Product Management', 'UI/UX Design', 'Data Analysis', 'Development'];

export default function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onFilterChange(category)}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            activeFilter === category
              ? 'bg-linear-to-r from-cosmic-purple to-cosmic-blue text-white shadow-lg shadow-cosmic-purple/30'
              : 'bg-surface text-foreground border border-border-light hover:border-cosmic-purple hover:bg-cosmic-purple/10 hover:text-cosmic-purple'
          }`}
          aria-pressed={activeFilter === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
