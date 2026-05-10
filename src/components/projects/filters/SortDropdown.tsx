import { SortOption } from '@/types/filters';

interface SortDropdownProps {
  sortBy: SortOption;
  onChange: (sort: SortOption) => void;
}

export default function SortDropdown({ sortBy, onChange }: SortDropdownProps) {
  const options: { value: SortOption; label: string }[] = [
    { value: 'recent', label: 'Most recent' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'alphabetical', label: 'A → Z' },
  ];

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="sort-select"
        className="text-xl text-ink-soft inline-block leading-none mb-1"
        style={{
          fontFamily: 'var(--font-kalam), cursive',
          fontWeight: 700,
          transform: 'rotate(-2deg)',
        }}
      >
        <span>sort</span>
        <span className="text-terracotta">.</span>
      </label>

      <select
        id="sort-select"
        value={sortBy}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="w-full md:w-auto md:min-w-[180px] px-4 py-2.5 bg-paper border border-border rounded-lg text-sm text-ink hover:border-ink/40 focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all duration-200 cursor-pointer appearance-none pr-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12'><path d='M2 4 Q 6 8, 10 4' stroke='%23C2410C' stroke-width='1.5' fill='none' stroke-linecap='round'/></svg>\")",
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'calc(100% - 12px) center',
          backgroundSize: '12px',
        }}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value} className="bg-paper text-ink">
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}
