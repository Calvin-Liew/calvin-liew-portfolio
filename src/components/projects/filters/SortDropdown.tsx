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
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 mb-1">
        <div className="p-2 rounded-lg bg-cosmic-purple/10 border border-cosmic-purple/20
                        group-hover:bg-cosmic-purple/20 transition-colors">
          <ArrowDownUp className="w-4 h-4 text-cosmic-purple" />
        </div>
        <label htmlFor="sort-select" className="text-sm font-semibold text-secondary uppercase tracking-wide">
          Sort by
        </label>
      </div>

      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="px-4 py-2.5
                   bg-surface/80 backdrop-blur-sm
                   border border-border-light rounded-lg
                   text-sm font-medium
                   hover:border-cosmic-purple hover:bg-cosmic-purple/5
                   hover:shadow-[0_0_15px_rgba(167,139,250,0.25)]
                   focus:outline-none focus:ring-2 focus:ring-cosmic-purple/50
                   focus:ring-offset-2 focus:ring-offset-surface
                   transition-all duration-300
                   cursor-pointer appearance-none
                   bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20width=%2712%27%20height=%2712%27%20viewBox=%270%200%2012%2012%27%3e%3cpath%20fill=%27%23a78bfa%27%20d=%27M6%209L1%204h10z%27/%3e%3c/svg%3e')]
                   bg-size-[12px] bg-position-[calc(100%-12px)_center] bg-no-repeat pr-10"
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}
