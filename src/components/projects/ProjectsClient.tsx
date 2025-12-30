'use client';

import { useState, useEffect, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';
import { FilterState, SortOption } from '@/types/filters';
import { extractSkillsWithCount, extractCategoriesWithCount } from '@/utils/filterHelpers';
import { filterProjects, sortProjects } from '@/utils/filterProjects';
import CategoryFilter from './filters/CategoryFilter';
import SkillsFilter from './filters/SkillsFilter';
import SortDropdown from './filters/SortDropdown';
import ActiveFiltersChips from './filters/ActiveFiltersChips';

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    skills: [],
    sortBy: 'recent'
  });

  // Extract filter options with useMemo
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
      skills: params.get('skills')?.split(',').filter(Boolean) || [],
      sortBy: (params.get('sort') as SortOption) || 'recent'
    });
  }, []);

  // Write to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length) params.set('categories', filters.categories.join(','));
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

  const toggleSkill = (skill: string) => {
    setFilters(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }));
  };

  const removeFilter = (type: 'category' | 'skill', value: string) => {
    if (type === 'category') toggleCategory(value);
    if (type === 'skill') toggleSkill(value);
  };

  const clearAllFilters = () => {
    setFilters({
      categories: [],
      skills: [],
      sortBy: filters.sortBy
    });
  };

  return (
    <div className="space-y-8">
      {/* Filter Panel */}
      <div className="relative bg-surface/50 backdrop-blur-md border border-border-light rounded-xl p-6 space-y-6
                      shadow-[0_8px_32px_rgba(167,139,250,0.15)]
                      before:absolute before:inset-0 before:-z-10 before:rounded-xl
                      before:bg-linear-to-br before:from-cosmic-purple/5 before:via-transparent before:to-cosmic-blue/5
                      hover:shadow-[0_12px_40px_rgba(167,139,250,0.25)]
                      hover:border-cosmic-purple/30
                      transition-all duration-500">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          {/* Left: Filter Group */}
          <div className="flex-1 space-y-6">
            <div className="space-y-6 divide-y divide-border-light/50">
              <CategoryFilter
                selectedCategories={filters.categories}
                onToggle={toggleCategory}
                projectCounts={categoryCounts}
              />

              <div className="pt-6">
                <SkillsFilter
                  selectedSkills={filters.skills}
                  onToggle={toggleSkill}
                  availableSkills={availableSkills}
                />
              </div>
            </div>
          </div>

          {/* Right: Sort Section */}
          <div className="lg:pt-6 lg:pl-6 lg:border-l lg:border-border-light
                          relative before:absolute before:inset-y-0 before:left-0 before:w-px
                          before:bg-linear-to-b before:from-transparent before:via-cosmic-purple/30 before:to-transparent
                          before:hidden lg:before:block">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
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
