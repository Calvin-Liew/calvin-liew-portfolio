interface CategoryFilterProps {
  selectedCategories: string[];
  onToggle: (category: string) => void;
  projectCounts: Map<string, number>;
}

export default function CategoryFilter({
  selectedCategories,
  onToggle,
  projectCounts,
}: CategoryFilterProps) {
  // Derive order from canonical list — show all that have at least one project
  const ORDERED: string[] = ['AI & Data', 'Product', 'Design'];
  const categories = ORDERED.filter((cat) => (projectCounts.get(cat) || 0) > 0);

  return (
    <div className="space-y-3">
      <h3
        className="text-xl text-ink-soft inline-block leading-none mb-3"
        style={{
          fontFamily: 'var(--font-kalam), cursive',
          fontWeight: 700,
          transform: 'rotate(-2deg)',
        }}
      >
        <span>category</span>
        <span className="text-terracotta">.</span>
      </h3>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = selectedCategories.includes(category);
          const count = projectCounts.get(category) || 0;

          return (
            <button
              key={category}
              onClick={() => onToggle(category)}
              className={`
                inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-sm
                transition-all duration-200
                ${
                  isSelected
                    ? 'bg-terracotta-wash border border-terracotta text-ink font-medium'
                    : 'bg-paper border border-border text-ink-soft hover:border-ink/40 hover:text-ink'
                }
              `}
              aria-pressed={isSelected}
              aria-label={`Filter by ${category}, ${count} projects`}
            >
              {category}
              <span
                className={`text-xs ${
                  isSelected ? 'text-terracotta' : 'text-muted'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
