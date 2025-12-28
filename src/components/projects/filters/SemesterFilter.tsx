import { Calendar } from 'lucide-react';
import { SemesterInfo } from '@/types/filters';

interface SemesterFilterProps {
  selectedSemesters: string[];
  onToggle: (semester: string) => void;
  availableSemesters: SemesterInfo[];
  getProjectCount: (semester: string) => number;
}

export default function SemesterFilter({
  selectedSemesters,
  onToggle,
  availableSemesters,
  getProjectCount
}: SemesterFilterProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide">
        Timeline
      </h3>
      <div className="flex flex-wrap gap-2">
        {availableSemesters.map(({ label }) => {
          const isSelected = selectedSemesters.includes(label);
          const count = getProjectCount(label);

          return (
            <button
              key={label}
              onClick={() => onToggle(label)}
              className={`
                px-3 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                flex items-center gap-2
                ${isSelected
                  ? 'bg-cosmic-purple text-white shadow-md'
                  : 'bg-surface border border-border-light hover:border-cosmic-purple'
                }
              `}
              aria-pressed={isSelected}
              aria-label={`Filter by ${label}, ${count} projects`}
            >
              <Calendar className="w-3.5 h-3.5" />
              {label}
              <span className={`
                text-xs px-1.5 py-0.5 rounded
                ${isSelected ? 'bg-white/20' : 'bg-cosmic-purple/10'}
              `}>
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
