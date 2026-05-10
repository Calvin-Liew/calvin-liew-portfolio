import Link from 'next/link';
import Container from '@/components/layout/Container';
import { Doodle } from '@/components/ui/HandDrawn';

export const metadata = {
  title: 'Page not found',
};

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center -mt-20 sm:-mt-24 pt-20 sm:pt-24">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          {/* Floating paper plane doodle */}
          <div className="mb-10 flex justify-center">
            <Doodle
              name="paperplane"
              className="w-20 h-20 text-terracotta animate-float-soft"
              color="currentColor"
            />
          </div>

          {/* Eyebrow */}
          <p
            className="text-2xl text-terracotta mb-2 inline-block"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
              transform: 'rotate(-3deg)',
            }}
          >
            oops &mdash;
          </p>

          {/* Big 404 in Fraunces italic */}
          <h1 className="font-display italic text-7xl sm:text-8xl text-ink mb-6 leading-none">
            404<span className="text-terracotta not-italic">.</span>
          </h1>

          {/* Handwritten message */}
          <p
            className="text-2xl text-ink-soft mb-3 inline-block leading-snug"
            style={{
              fontFamily: 'var(--font-kalam), cursive',
            }}
          >
            this page got lost in the mail.
          </p>

          <p className="text-base text-muted mb-10 max-w-md mx-auto">
            The page you&apos;re looking for either moved, never existed, or
            wandered off the path. It happens.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center px-8 py-4 rounded-xl bg-ink text-paper hover:bg-ink-soft hover:-translate-y-0.5 transition-all duration-200 font-medium text-lg"
            >
              &larr; back home
            </Link>
            <Link
              href="/projects"
              className="text-lg text-terracotta hover:text-terracotta-deep hover:translate-x-1 transition-all duration-200 inline-flex items-center"
              style={{
                fontFamily: 'var(--font-kalam), cursive',
                transform: 'rotate(-2deg)',
              }}
            >
              or browse projects &rarr;
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
