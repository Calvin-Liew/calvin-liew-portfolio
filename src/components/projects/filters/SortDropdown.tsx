import { ArrowDownUp } from 'lucide-react';
import { SortOption } from '@/types/filters';

interface SortDropdownProps {
  sortBy: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortDropdown({ sortBy, onChange }: SortDropdownProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'alphabetical', label: 'A-Z' }
  ];

  return (
    <div className="flex items-center gap-2">
      <ArrowDownUp className="w-4 h-4 text-secondary" />
      <label htmlFor="sort-select" className="text-sm font-semibold text-secondary">
        Sort:
      </label>
      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-3 py-2 bg-surface border border-border-light rounded-lg
                   text-sm font-medium hover:border-cosmic-purple transition-colors
                   focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
