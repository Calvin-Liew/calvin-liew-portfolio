'use client';

import { useState } from 'react';
import ProjectFilter from './ProjectFilter';
import ProjectCard from './ProjectCard';
import { Project } from '@/types';

interface ProjectsClientProps {
  projects: Project[];
}

export default function ProjectsClient({ projects }: ProjectsClientProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(project => project.category === activeFilter);

  return (
    <div>
      <div className="mb-10">
        <ProjectFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      </div>

      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-lg text-secondary">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
