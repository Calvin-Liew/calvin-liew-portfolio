'use client';

import { useEffect, useRef, useState } from 'react';
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
  availableSkills,
}: SkillsFilterProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [isOpen]);

  const filteredSkills = availableSkills.filter(({ skill }) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <h2
          className="text-xl text-ink-soft inline-block leading-none"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            fontWeight: 700,
            transform: 'rotate(-2deg)',
          }}
        >
          <span>skills</span>
          <span className="text-terracotta">.</span>
        </h2>
        {selectedSkills.length > 0 && (
          <span className="inline-flex items-center justify-center min-w-[20px] h-5 text-xs font-semibold bg-terracotta text-paper rounded-full px-1.5">
            {selectedSkills.length}
          </span>
        )}
      </div>

      <div className="relative" ref={rootRef}>
        <button
          ref={buttonRef}
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full md:w-auto md:min-w-[220px] px-4 py-2.5 bg-paper border border-border rounded-lg text-left text-sm transition-all duration-200 flex items-center justify-between gap-3 hover:border-ink/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta-deep"
          aria-expanded={isOpen}
          aria-controls={isOpen ? 'skills-dropdown' : undefined}
        >
          <span
            className={`transition-colors ${
              selectedSkills.length > 0
                ? 'text-ink font-medium'
                : 'text-ink-soft'
            }`}
          >
            {selectedSkills.length === 0
              ? 'Select skills...'
              : `${selectedSkills.length} skill${selectedSkills.length > 1 ? 's' : ''} selected`}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-terracotta' : 'text-ink-soft'
            }`}
          />
        </button>

        {isOpen && (
          <div
            id="skills-dropdown"
            className="absolute z-20 mt-2 w-full bg-paper border border-border-strong rounded-lg shadow-lg max-h-64 overflow-hidden animate-fade-in-up"
          >
            <div className="p-3 border-b border-border">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-soft" />
                <input
                  type="text"
                  aria-label="Search skills"
                  placeholder="Search skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-paper-deeper border border-border rounded-lg text-sm text-ink placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all duration-200"
                />
              </div>
            </div>

            <div className="overflow-y-auto max-h-48">
              {filteredSkills.map(({ skill, count }) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <label
                    key={skill}
                    className={`flex items-center px-4 py-2.5 cursor-pointer transition-colors duration-150 border-l-2 ${
                      isSelected
                        ? 'bg-terracotta-wash border-l-terracotta'
                        : 'border-l-transparent hover:bg-paper-deeper hover:border-l-ink/30'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggle(skill)}
                      className="mr-3 w-4 h-4 rounded border-border accent-terracotta"
                    />
                    <span
                      className={`text-sm flex-1 transition-colors ${
                        isSelected ? 'text-ink font-medium' : 'text-ink-soft'
                      }`}
                    >
                      {skill}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md transition-colors duration-150 ${
                        isSelected
                          ? 'text-terracotta font-medium'
                          : 'text-muted'
                      }`}
                    >
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
