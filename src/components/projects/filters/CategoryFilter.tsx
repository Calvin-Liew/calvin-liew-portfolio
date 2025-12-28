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
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-3
                     flex items-center gap-2 relative">
        <span className="relative z-10">Category</span>
        <div className="flex-1 h-px bg-linear-to-r from-cosmic-purple/30 via-transparent to-transparent"></div>
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
                transition-all duration-300
                flex items-center gap-2
                ${isSelected
                  ? 'bg-linear-to-r from-cosmic-purple to-cosmic-blue text-white shadow-[0_0_20px_rgba(167,139,250,0.4),0_4px_12px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(167,139,250,0.6),0_6px_16px_rgba(59,130,246,0.4)] scale-105 hover:scale-110'
                  : 'bg-surface/80 border border-border-light text-secondary hover:border-cosmic-purple hover:bg-cosmic-purple/10 hover:shadow-[0_0_12px_rgba(167,139,250,0.2)] hover:scale-105'
                }
              `}
              aria-pressed={isSelected}
              aria-label={`Filter by ${category}, ${count} projects`}
            >
              {category}
              <span className={`
                text-xs px-2 py-0.5 rounded-full font-semibold
                transition-all duration-300
                ${isSelected
                  ? 'bg-white/20 text-white backdrop-blur-sm'
                  : 'bg-cosmic-purple/10 text-cosmic-purple'}
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
