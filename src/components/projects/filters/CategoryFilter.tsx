interface CategoryFilterProps {
  selectedCategories: string[];
  onToggle: (category: string) => void;
  projectCounts: Map<string, number>;
}

export default function CategoryFilter({
  selectedCategories,
  onToggle,
  projectCounts
}: CategoryFilterProps) {
  // Only show categories that have projects
  const categories = ['Product Management', 'UI/UX Design', 'Data Analysis']
    .filter(cat => (projectCounts.get(cat) || 0) > 0);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide">
        Category
      </h3>
      <div className="flex flex-wrap gap-2">
        {categories.map(category => {
          const isSelected = selectedCategories.includes(category);
          const count = projectCounts.get(category) || 0;

          return (
            <button
              key={category}
              onClick={() => onToggle(category)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium
                transition-all duration-200
                flex items-center gap-2
                ${isSelected
                  ? 'bg-gradient-to-r from-cosmic-purple to-cosmic-blue text-white shadow-lg'
                  : 'bg-surface border border-border-light text-secondary hover:border-cosmic-purple'
                }
              `}
              aria-pressed={isSelected}
              aria-label={`Filter by ${category}, ${count} projects`}
            >
              {category}
              <span className={`
                text-xs px-2 py-0.5 rounded-full
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
