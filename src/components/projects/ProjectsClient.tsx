'use client';

import { useState, useEffect, useMemo } from 'react';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';
import { FilterState, SortOption } from '@/types/filters';
import {
  extractSkillsWithCount,
  extractCategoriesWithCount,
} from '@/utils/filterHelpers';
import { filterProjects, sortProjects } from '@/utils/filterProjects';
import CategoryFilter from './filters/CategoryFilter';
import SkillsFilter from './filters/SkillsFilter';
import SortDropdown from './filters/SortDropdown';
import ActiveFiltersChips from './filters/ActiveFiltersChips';
import { Doodle } from '../ui/HandDrawn';

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    skills: [],
    sortBy: 'recent',
  });

  const availableSkills = useMemo(
    () => extractSkillsWithCount(projects),
    [projects]
  );

  const categoryCounts = useMemo(
    () => extractCategoriesWithCount(projects),
    [projects]
  );

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
      sortBy: (params.get('sort') as SortOption) || 'recent',
    });
  }, []);

  // Write to URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (filters.categories.length)
      params.set('categories', filters.categories.join(','));
    if (filters.skills.length) params.set('skills', filters.skills.join(','));
    if (filters.sortBy !== 'recent') params.set('sort', filters.sortBy);

    const queryString = params.toString();
    const newUrl = queryString
      ? `?${queryString}`
      : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  const toggleCategory = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  const toggleSkill = (skill: string) => {
    setFilters((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
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
      sortBy: filters.sortBy,
    });
  };

  return (
    <div className="space-y-8">
      {/* Filter strip — editorial bar, no card chrome */}
      <div>
        {/* Header: doodle + Kalam eyebrow */}
        <div className="flex items-center gap-3 mb-7">
          <Doodle
            name="magnifier"
            className="w-7 h-7 text-terracotta flex-shrink-0"
            color="currentColor"
          />
          <p
            className="text-2xl text-terracotta inline-block"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            filter the work &mdash;
          </p>
        </div>

        {/* Three filter groups — horizontal on md+, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-x-10 gap-y-7 items-start">
          <CategoryFilter
            selectedCategories={filters.categories}
            onToggle={toggleCategory}
            projectCounts={categoryCounts}
          />
          <SkillsFilter
            selectedSkills={filters.skills}
            onToggle={toggleSkill}
            availableSkills={availableSkills}
          />
          <SortDropdown
            sortBy={filters.sortBy}
            onChange={(sort) =>
              setFilters((prev) => ({ ...prev, sortBy: sort }))
            }
          />
        </div>

        {/* Hand-drawn divider below the strip */}
        <div className="mt-8" aria-hidden>
          <svg
            viewBox="0 0 800 8"
            preserveAspectRatio="none"
            className="w-full h-2"
            fill="none"
          >
            <path
              d="M 4 4 Q 200 1, 400 4 T 796 3"
              stroke="var(--border-strong)"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>

      {/* Active filter chips */}
      <ActiveFiltersChips
        filters={filters}
        onRemove={removeFilter}
        onClearAll={clearAllFilters}
      />

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink-soft">
          Showing{' '}
          <span className="font-semibold text-ink">
            {sortedProjects.length}
          </span>{' '}
          of {projects.length} projects
        </p>
      </div>

      {/* Project grid */}
      {sortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {sortedProjects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p
            className="text-2xl text-ink-soft mb-4 inline-block"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            no projects match these filters
          </p>
          <div>
            <button
              onClick={clearAllFilters}
              className="text-lg text-terracotta hover:text-terracotta-deep hover:translate-x-1 transition-all duration-200 inline-flex items-center"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-2deg)',
              }}
            >
              clear filters &rarr;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
