import { X } from 'lucide-react';
import { FilterState } from '@/types/filters';

interface ActiveFiltersChipsProps {
  filters: FilterState;
  onRemove: (type: 'category' | 'semester' | 'skill', value: string) => void;
  onClearAll: () => void;
}

export default function ActiveFiltersChips({
  filters,
  onRemove,
  onClearAll
}: ActiveFiltersChipsProps) {
  const activeFilters = [
    ...filters.categories.map(v => ({ type: 'category' as const, value: v, label: v })),
    ...filters.semesters.map(v => ({ type: 'semester' as const, value: v, label: v })),
    ...filters.skills.map(v => ({ type: 'skill' as const, value: v, label: v }))
  ];

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4">
      <span className="text-sm font-semibold text-secondary">Active:</span>

      {activeFilters.map(({ type, value, label }) => (
        <button
          key={`${type}-${value}`}
          onClick={() => onRemove(type, value)}
          className="group flex items-center gap-1.5 px-3 py-1.5
                     bg-cosmic-purple/10 border border-cosmic-purple/30 rounded-full
                     hover:bg-cosmic-purple/20 hover:border-cosmic-purple/50
                     transition-all duration-200"
          aria-label={`Remove ${type} filter: ${label}`}
        >
          <span className="text-sm font-medium text-cosmic-purple">{label}</span>
          <X className="w-3.5 h-3.5 text-cosmic-purple group-hover:scale-110 transition-transform" />
        </button>
      ))}

      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-sm font-medium text-secondary hover:text-cosmic-purple
                     underline decoration-dotted transition-colors ml-2"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
