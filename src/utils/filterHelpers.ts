import { Project } from '@/types';
import { SemesterInfo, SkillOption } from '@/types/filters';
import { parseDateToSemester } from './dateToSemester';

export function extractUniqueSemesters(projects: Project[]): SemesterInfo[] {
  const semesterMap = new Map<string, SemesterInfo>();

  projects.forEach(project => {
    const semesterInfo = parseDateToSemester(project.dates);
    if (!semesterMap.has(semesterInfo.label)) {
      semesterMap.set(semesterInfo.label, semesterInfo);
    }
  });

  // Sort by year desc, then semester (most recent first)
  return Array.from(semesterMap.values())
    .sort((a, b) => b.sortKey.localeCompare(a.sortKey));
}

export function extractSkillsWithCount(projects: Project[]): SkillOption[] {
  const skillMap = new Map<string, number>();

  projects.forEach(project => {
    project.skills.forEach(skill => {
      skillMap.set(skill, (skillMap.get(skill) || 0) + 1);
    });
  });

  return Array.from(skillMap.entries())
    .map(([skill, count]) => ({ skill, count }))
    .sort((a, b) => b.count - a.count); // Most common first
}

export function extractCategoriesWithCount(projects: Project[]): Map<string, number> {
  const categoryMap = new Map<string, number>();

  projects.forEach(project => {
    categoryMap.set(project.category, (categoryMap.get(project.category) || 0) + 1);
  });

  return categoryMap;
}
