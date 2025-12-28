'use client';

import { useState, useEffect, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';
import { FilterState, SortOption } from '@/types/filters';
import { extractUniqueSemesters, extractSkillsWithCount, extractCategoriesWithCount } from '@/utils/filterHelpers';
import { filterProjects, sortProjects } from '@/utils/filterProjects';
import { parseDateToSemester } from '@/utils/dateToSemester';
import CategoryFilter from './filters/CategoryFilter';
import SemesterFilter from './filters/SemesterFilter';
import SkillsFilter from './filters/SkillsFilter';
import SortDropdown from './filters/SortDropdown';
import ActiveFiltersChips from './filters/ActiveFiltersChips';

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    semesters: [],
    skills: [],
    sortBy: 'recent'
  });

  // Extract filter options with useMemo
  const availableSemesters = useMemo(
    () => extractUniqueSemesters(projects),
    [projects]
  );

  const availableSkills = useMemo(
    () => extractSkillsWithCount(projects),
    [projects]
  );

  const categoryCounts = useMemo(
    () => extractCategoriesWithCount(projects),
    [projects]
  );

  // Apply filters and sorting
  const filteredProjects = useMemo(
    () => filterProjects(projects, filters),
    [projects, filters]
  );

  const sortedProjects = useMemo(
    () => sortProjects(filteredProjects, filters.sortBy),
    [filteredProjects, filters.sortBy]
  );

  // Read from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      categories: params.get('categories')?.split(',').filter(Boolean) || [],
      semesters: params.get('semesters')?.split(',').filter(Boolean) || [],
      skills: params.get('skills')?.split(',').filter(Boolean) || [],
      sortBy: (params.get('sort') as SortOption) || 'recent'
    });
  }, []);

  // Write to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length) params.set('categories', filters.categories.join(','));
    if (filters.semesters.length) params.set('semesters', filters.semesters.join(','));
    if (filters.skills.length) params.set('skills', filters.skills.join(','));
    if (filters.sortBy !== 'recent') params.set('sort', filters.sortBy);

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  // Filter toggle handlers
  const toggleCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }));
  };

  const toggleSemester = (semester: string) => {
    setFilters(prev => ({
      ...prev,
      semesters: prev.semesters.includes(semester)
        ? prev.semesters.filter(s => s !== semester)
        : [...prev.semesters, semester]
    }));
  };

  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const removeFilter = (type: 'category' | 'semester' | 'skill', value: string) => {
    if (type === 'category') toggleCategory(value);
    if (type === 'semester') toggleSemester(value);
    if (type === 'skill') toggleSkill(value);
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      semesters: [],
      skills: [],
      sortBy: filters.sortBy
    });
  };

  // Helper for project counts
  const getSemesterProjectCount = (semester: string) => {
    return projects.filter(p => parseDateToSemester(p.dates).label === semester).length;
  };

  return (
    <div className="space-y-8">
      {/* Filter Panel */}
      <div className="bg-surface border border-border-light rounded-xl p-6 space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1 space-y-6">
            <CategoryFilter
              selectedCategories={filters.categories}
              onToggle={toggleCategory}
              projectCounts={categoryCounts}
            />

            <SemesterFilter
              selectedSemesters={filters.semesters}
              onToggle={toggleSemester}
              availableSemesters={availableSemesters}
              getProjectCount={getSemesterProjectCount}
            />

            <SkillsFilter
              selectedSkills={filters.skills}
              onToggle={toggleSkill}
              availableSkills={availableSkills}
            />
          </div>

          <div className="lg:pt-6">
            <SortDropdown
              sortBy={filters.sortBy}
              onChange={(sort) => setFilters(prev => ({ ...prev, sortBy: sort }))}
            />
          </div>
        </div>
      </div>

      {/* Active Filters Chips */}
      <ActiveFiltersChips
        filters={filters}
        onRemove={removeFilter}
        onClearAll={clearAllFilters}
      />

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-secondary">
          Showing <span className="font-semibold text-foreground">{sortedProjects.length}</span> of {projects.length} projects
        </p>
      </div>

      {/* Project Grid */}
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-secondary mb-4">No projects found matching your filters</p>
          <button
            onClick={clearAllFilters}
            className="text-cosmic-purple hover:text-cosmic-cyan underline font-medium"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
