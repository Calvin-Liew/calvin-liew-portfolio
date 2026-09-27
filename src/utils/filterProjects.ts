import { Project } from '@/types';
import { FilterState, SortOption } from '@/types/filters';

export function filterProjects(
  projects: Project[],
  filters: FilterState
): Project[] {
  return projects.filter(project => {
    // Category filter (OR - match ANY selected)
    const categoryMatch = filters.categories.length === 0 ||
      filters.categories.includes(project.category);

    // Skills filter (OR - project must have ANY selected skill)
    const skillsMatch = filters.skills.length === 0 ||
      filters.skills.some(skill => project.skills.includes(skill));

    // AND logic between filter types
    return categoryMatch && skillsMatch;
  });
}

// Date ranges are editorial labels; keep ongoing work first in recent sorting.
function parseProjectDate(dateString: string): number {
  const endDate = dateString.split(/\s+[-–—]\s+/).at(-1)?.trim() ?? '';
  if (/^present$/i.test(endDate)) return Number.MAX_SAFE_INTEGER;

  const match = /^(?:(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+)?(\d{4})$/.exec(endDate);
  if (!match) return 0;

  const monthMap: Record<string, number> = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
  };
  const month = match[1] ? monthMap[match[1]] : 11;
  return Date.UTC(Number(match[2]), month, 1);
}

export function sortProjects(
  projects: Project[],
  sortBy: SortOption
): Project[] {
  const sorted = [...projects];

  switch (sortBy) {
    case 'recent':
      // Sort by most recent end date first
      return sorted.sort((a, b) => {
        const dateA = parseProjectDate(a.dates);
        const dateB = parseProjectDate(b.dates);
        return dateB - dateA; // Newest first
      });

    case 'oldest':
      // Sort by oldest end date first
      return sorted.sort((a, b) => {
        const dateA = parseProjectDate(a.dates);
        const dateB = parseProjectDate(b.dates);
        return dateA - dateB; // Oldest first
      });

    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}
