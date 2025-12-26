import Link from 'next/link';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      <Card className="h-full flex flex-col">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-2 group-hover:bg-linear-to-r group-hover:from-cosmic-purple group-hover:to-cosmic-cyan group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
            {post.title}
          </h3>
          <div className="flex items-center gap-3 text-sm text-secondary">
            <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
            {post.readTime && (
              <>
                <span>•</span>
                <span>{post.readTime}</span>
              </>
            )}
          </div>
        </div>

        <p className="text-secondary line-clamp-4 mb-4 grow">
          {post.excerpt}
        </p>

        <div className="mt-auto">
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 4).map((tag) => (
                <Badge key={tag} variant="skill">{tag}</Badge>
              ))}
              {post.tags.length > 4 && (
                <Badge variant="skill">+{post.tags.length - 4} more</Badge>
              )}
            </div>
          )}

          <div className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all group-hover:text-cosmic-purple">
            Read Article
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
