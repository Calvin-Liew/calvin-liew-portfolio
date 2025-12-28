'use client';

import { useState } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { SkillOption } from '@/types/filters';

interface SkillsFilterProps {
  selectedSkills: string[];
  onToggle: (skill: string) => void;
  availableSkills: SkillOption[];
}

export default function SkillsFilter({
  selectedSkills,
  onToggle,
  availableSkills
}: SkillsFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const filteredSkills = availableSkills.filter(({ skill }) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide">
        Skills {selectedSkills.length > 0 && `(${selectedSkills.length})`}
      </h3>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 bg-surface border border-border-light rounded-lg
                     text-left text-sm hover:border-cosmic-purple transition-colors
                     flex items-center justify-between"
          aria-expanded={isOpen}
          aria-controls="skills-dropdown"
        >
          <span className="text-secondary">
            {selectedSkills.length === 0
              ? 'Select skills...'
              : `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
            }
          </span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>

        {isOpen && (
          <div
            id="skills-dropdown"
            className="absolute z-20 mt-2 w-full bg-surface border border-border-light
                       rounded-lg shadow-xl max-h-64 overflow-hidden"
          >
            <div className="p-3 border-b border-border-light">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-surface-dark border border-border-light rounded-lg
                             text-sm focus:outline-none focus:ring-2 focus:ring-cosmic-purple"
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-48">
              {filteredSkills.map(({ skill, count }) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <label
                    key={skill}
                    className="flex items-center px-4 py-2 hover:bg-cosmic-purple/10
                               cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(skill)}
                      className="mr-3 w-4 h-4 rounded border-border-light
                                 text-cosmic-purple focus:ring-cosmic-purple"
                    />
                    <span className="text-sm flex-1">{skill}</span>
                    <span className="text-xs text-secondary px-2 py-0.5 bg-surface rounded">
                      {count}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
