import { X } from 'lucide-react';
import { FilterState } from '@/types/filters';

interface ActiveFiltersChipsProps {
  filters: FilterState;
  onRemove: (type: 'category' | 'skill', value: string) => void;
  onClearAll: () => void;
}

export default function ActiveFiltersChips({
  filters,
  onRemove,
  onClearAll,
}: ActiveFiltersChipsProps) {
  const activeFilters = [
    ...filters.categories.map((v) => ({
      type: 'category' as const,
      value: v,
      label: v,
    })),
    ...filters.skills.map((v) => ({
      type: 'skill' as const,
      value: v,
      label: v,
    })),
  ];

  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 pb-4">
      <span
        className="text-base text-terracotta inline-block mr-1"
        style={{
          fontFamily: 'var(--font-kalam), cursive',
          transform: 'rotate(-2deg)',
        }}
      >
        active —
      </span>

      {activeFilters.map(({ type, value, label }) => (
        <button
          key={`${type}-${value}`}
          onClick={() => onRemove(type, value)}
          className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-terracotta-wash border border-terracotta/40 rounded-md hover:border-terracotta hover:bg-terracotta/10 transition-colors duration-200"
          aria-label={`Remove ${type} filter: ${label}`}
        >
          <span className="text-sm font-medium text-ink">{label}</span>
          <X className="w-3.5 h-3.5 text-terracotta group-hover:scale-110 transition-transform" />
        </button>
      ))}

      {activeFilters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-base text-terracotta hover:text-terracotta-deep ml-2 inline-block"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            transform: 'rotate(-2deg)',
          }}
        >
          clear all &rarr;
        </button>
      )}
    </div>
  );
}
