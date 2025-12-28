import { Project } from '@/types';
import { FilterState, SortOption } from '@/types/filters';
import { parseDateToSemester } from './dateToSemester';

export function filterProjects(
  projects: Project[],
  filters: FilterState
): Project[] {
  return projects.filter(project => {
    // Category filter (OR within categories - match ANY selected)
    const categoryMatch = filters.categories.length === 0 ||
      filters.categories.includes(project.category);

    // Semester filter (OR within semesters - match ANY selected)
    const projectSemester = parseDateToSemester(project.dates).label;
    const semesterMatch = filters.semesters.length === 0 ||
      filters.semesters.includes(projectSemester);

    // Skills filter (OR within skills - project must have ANY selected skill)
    const skillsMatch = filters.skills.length === 0 ||
      filters.skills.some(skill => project.skills.includes(skill));

    // AND logic: must pass all active filter types
    return categoryMatch && semesterMatch && skillsMatch;
  });
}

export function sortProjects(
  projects: Project[],
  sortBy: SortOption
): Project[] {
  const sorted = [...projects];

  switch (sortBy) {
    case 'recent':
      return sorted.sort((a, b) => {
        const dateA = parseDateToSemester(a.dates).sortKey;
        const dateB = parseDateToSemester(b.dates).sortKey;
        return dateB.localeCompare(dateA); // Newest first
      });

    case 'oldest':
      return sorted.sort((a, b) => {
        const dateA = parseDateToSemester(a.dates).sortKey;
        const dateB = parseDateToSemester(b.dates).sortKey;
        return dateA.localeCompare(dateB); // Oldest first
      });

    case 'alphabetical':
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    default:
      return sorted;
  }
}
