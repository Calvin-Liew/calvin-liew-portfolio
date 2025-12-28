export interface FilterState {
  categories: string[];      // Multi-select: ['Product Management', 'UI/UX Design']
  skills: string[];           // Multi-select: ['Figma', 'D3.js', 'Python']
  sortBy: SortOption;         // Single: 'recent' | 'oldest' | 'alphabetical'
}

export type SortOption = 'recent' | 'oldest' | 'alphabetical';

export interface SkillOption {
  skill: string;
  count: number;              // Number of projects using this skill
}
