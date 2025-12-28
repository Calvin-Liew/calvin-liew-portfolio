export interface FilterState {
  categories: string[];      // Multi-select: ['Product Management', 'UI/UX Design']
  semesters: string[];        // Multi-select: ['Fall 2025', 'Summer 2024']
  skills: string[];           // Multi-select: ['Figma', 'D3.js', 'Python']
  sortBy: SortOption;         // Single: 'recent' | 'oldest' | 'alphabetical'
}

export type SortOption = 'recent' | 'oldest' | 'alphabetical';

export interface SemesterInfo {
  semester: 'Fall' | 'Winter' | 'Spring' | 'Summer';
  year: string;
  label: string;              // "Fall 2025"
  sortKey: string;            // "2025-09" for sorting
}

export interface SkillOption {
  skill: string;
  count: number;              // Number of projects using this skill
}

export interface ActiveFilter {
  type: 'category' | 'semester' | 'skill';
  value: string;
  label: string;
}
