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

// Helper to parse date strings like "Sep 2025 - Dec 2025" to Date
function parseProjectDate(dateString: string): Date {
  // Extract end date (second date) from "Mon YYYY - Mon YYYY"
  const parts = dateString.split(' - ');
  const endDate = parts[1] || parts[0]; // Use end date, fallback to start if no range

  // Parse "Mon YYYY" to Date
  const [month, year] = endDate.trim().split(' ');
  const monthMap: { [key: string]: number } = {
    'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5,
    'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11
  };

  return new Date(parseInt(year), monthMap[month] || 0);
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
        return dateB.getTime() - dateA.getTime(); // Newest first
      });

    case 'oldest':
      // Sort by oldest end date first
      return sorted.sort((a, b) => {
        const dateA = parseProjectDate(a.dates);
        const dateB = parseProjectDate(b.dates);
        return dateA.getTime() - dateB.getTime(); // Oldest first
      });

    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}
