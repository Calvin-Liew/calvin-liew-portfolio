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
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-secondary uppercase tracking-wide mb-3
                     flex items-center gap-2">
        <span className="relative z-10">Skills</span>
        {selectedSkills.length > 0 && (
          <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-bold
                           bg-linear-to-r from-cosmic-purple to-cosmic-blue text-white rounded-full
                           shadow-[0_0_12px_rgba(167,139,250,0.5)] animate-pulse">
            {selectedSkills.length}
          </span>
        )}
        <div className="flex-1 h-px bg-linear-to-r from-cosmic-purple/30 via-transparent to-transparent"></div>
      </h3>

      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 bg-surface/80 border border-border-light rounded-lg
                     text-left text-sm transition-all duration-300
                     flex items-center justify-between
                     hover:border-cosmic-purple hover:shadow-[0_0_15px_rgba(167,139,250,0.25)]
                     hover:bg-cosmic-purple/5
                     focus:outline-none focus:ring-2 focus:ring-cosmic-purple/50 focus:ring-offset-2 focus:ring-offset-surface"
          aria-expanded={isOpen}
          aria-controls="skills-dropdown"
        >
          <span className={`transition-colors ${selectedSkills.length > 0 ? 'text-cosmic-purple font-semibold' : 'text-secondary'}`}>
            {selectedSkills.length === 0
              ? 'Select skills...'
              : `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`
            }
          </span>
          <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isOpen ? 'rotate-180 text-cosmic-purple' : 'text-secondary'}`} />
        </button>

        {isOpen && (
          <div
            id="skills-dropdown"
            className="absolute z-20 mt-2 w-full
                       bg-surface/95 backdrop-blur-md
                       border border-cosmic-purple/30 rounded-lg
                       shadow-[0_8px_32px_rgba(167,139,250,0.3),0_0_0_1px_rgba(167,139,250,0.1)]
                       max-h-64 overflow-hidden
                       animate-fade-in-up"
          >
            <div className="p-3 border-b border-border-light">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary" />
                <input
                  type="text"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2
                             bg-surface-dark/50 backdrop-blur-sm
                             border border-border-light rounded-lg
                             text-sm text-foreground placeholder:text-secondary/60
                             focus:outline-none focus:ring-2 focus:ring-cosmic-purple/50
                             focus:border-cosmic-purple/50
                             focus:shadow-[0_0_12px_rgba(167,139,250,0.2)]
                             transition-all duration-300"
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-48">
              {filteredSkills.map(({ skill, count }) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <label
                    key={skill}
                    className="flex items-center px-4 py-2.5
                               hover:bg-linear-to-r hover:from-cosmic-purple/10 hover:to-cosmic-blue/5
                               cursor-pointer transition-all duration-200
                               border-l-2 border-transparent
                               hover:border-l-cosmic-purple"
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(skill)}
                      className="mr-3 w-4 h-4 rounded border-border-light
                                 text-cosmic-purple focus:ring-cosmic-purple focus:ring-offset-0
                                 accent-cosmic-purple"
                    />
                    <span className={`text-sm flex-1 transition-colors ${isSelected ? 'text-cosmic-purple font-semibold' : 'text-foreground'}`}>
                      {skill}
                    </span>
                    <span className={`text-xs px-2 py-0.5 rounded-full transition-all duration-200
                                      ${isSelected
                                        ? 'bg-cosmic-purple/20 text-cosmic-purple font-semibold'
                                        : 'bg-surface text-secondary'}`}>
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
