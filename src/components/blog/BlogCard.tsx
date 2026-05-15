import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { HandUnderline } from '../ui/HandDrawn';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  index?: number;
}

const cornerCycle: Array<
  'lightbulb' | 'sparkle' | 'pencil' | 'paperplane' | 'coffee' | 'magnifier'
> = ['lightbulb', 'sparkle', 'pencil', 'paperplane', 'coffee', 'magnifier'];

function formatDate(input: string) {
  return new Date(input)
    .toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
    .toLowerCase();
}

export default function BlogCard({ post, index = 0 }: BlogCardProps) {
  const corner = cornerCycle[index % cornerCycle.length];

  return (
    <Link href={`/blog/${post.slug}`} className="block">
      <Card corner={corner} className="h-full flex flex-col">
        {/* Date · read time in Kalam */}
        <time
          className="text-base text-terracotta inline-block mb-3"
          style={{
            fontFamily: 'var(--font-kalam), cursive',
            transform: 'rotate(-1.5deg)',
          }}
          dateTime={post.date}
        >
          {formatDate(post.date)}
          {post.readTime && (
            <>
              {' '}
              <span className="text-terracotta">·</span> {post.readTime}
            </>
          )}
        </time>

        {/* Title — Fraunces italic, hand-drawn underline on hover */}
        <h3 className="font-display italic text-xl sm:text-2xl text-ink mb-3 leading-snug relative line-clamp-2">
          <span className="relative z-10">{post.title}</span>
          <HandUnderline className="absolute -bottom-1 left-0 w-full h-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        </h3>

        {/* Excerpt */}
        <p className="text-sm text-ink-soft leading-relaxed line-clamp-3 mb-5 flex-grow overflow-hidden">
          {post.excerpt}
        </p>

        {/* Tags + read link */}
        <div className="mt-auto">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge key={tag}>{tag}</Badge>
              ))}
              {post.tags.length > 4 && (
                <Badge>+{post.tags.length - 4} more</Badge>
              )}
            </div>
          )}

          <span
            className="text-base text-terracotta inline-flex items-center group-hover:translate-x-1 transition-transform duration-200"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-2deg)',
            }}
          >
            read article &rarr;
          </span>
        </div>
      </Card>
    </Link>
  );
}
