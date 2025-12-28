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

export function sortProjects(
  projects: Project[],
  sortBy: SortOption
): Project[] {
  const sorted = [...projects];

  switch (sortBy) {
    case 'recent':
      // Sort by date string (projects already have dates)
      return sorted.sort((a, b) => b.dates.localeCompare(a.dates));

    case 'oldest':
      return sorted.sort((a, b) => a.dates.localeCompare(b.dates));

    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}
