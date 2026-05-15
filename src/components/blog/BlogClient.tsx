'use client';

import { useState, useMemo } from 'react';
import BlogCard from './BlogCard';
import { BlogPost } from '@/types';

interface BlogClientProps {
  posts: BlogPost[];
}

function extractTagsWithCount(posts: BlogPost[]): { tag: string; count: number }[] {
  const tagMap = new Map<string, number>();
  posts.forEach((post) => {
    post.tags?.forEach((tag) => {
      tagMap.set(tag, (tagMap.get(tag) || 0) + 1);
    });
  });
  return Array.from(tagMap.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export default function BlogClient({ posts }: BlogClientProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const availableTags = useMemo(() => extractTagsWithCount(posts), [posts]);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    return posts.filter((post) =>
      selectedTags.some((tag) => post.tags?.includes(tag))
    );
  }, [posts, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearTags = () => setSelectedTags([]);

  return (
    <div>
      {/* Tag filter row */}
      {availableTags.length > 0 && (
        <div className="mb-10">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="text-base text-ink-soft mr-1"
              style={{ fontFamily: 'var(--font-kalam), cursive' }}
            >
              filter —
            </span>

            {availableTags.map(({ tag, count }) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`
                    inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm
                    transition-all duration-200
                    ${
                      isSelected
                        ? 'bg-terracotta-wash border border-terracotta text-ink font-medium'
                        : 'bg-paper border border-border text-ink-soft hover:border-ink/40 hover:text-ink'
                    }
                  `}
                  aria-pressed={isSelected}
                >
                  {tag}
                  <span className={`text-xs ${isSelected ? 'text-terracotta' : 'text-muted'}`}>
                    {count}
                  </span>
                </button>
              );
            })}

            {selectedTags.length > 0 && (
              <button
                onClick={clearTags}
                className="text-sm text-terracotta hover:text-terracotta-deep underline underline-offset-4 ml-2 transition-colors"
              >
                clear
              </button>
            )}
          </div>

          {selectedTags.length > 0 && (
            <p className="text-sm text-ink-soft mt-3">
              {filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} matching{' '}
              <span className="font-medium text-ink">
                {selectedTags.join(', ')}
              </span>
            </p>
          )}
        </div>
      )}

      {/* Posts grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredPosts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p
            className="text-3xl text-ink-soft mb-3 inline-block"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            nothing matches
          </p>
          <p className="text-base text-muted max-w-md mx-auto">
            No posts with{' '}
            <span className="font-medium text-ink">{selectedTags.join(', ')}</span>{' '}
            yet.{' '}
            <button
              onClick={clearTags}
              className="text-terracotta hover:text-terracotta-deep underline underline-offset-4"
            >
              Clear filter
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
