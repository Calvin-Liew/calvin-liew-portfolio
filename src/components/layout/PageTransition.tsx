'use client';

import { usePathname } from 'next/navigation';

/**
 * PageTransition — wraps `<main>` and re-keys it on every navigation so
 * the `animate-page-enter` keyframe replays. Subtle fade-up on each route
 * change. Reinforces the notebook/page-turn metaphor without a heavy
 * dependency.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <main
      key={pathname}
      id="main-content"
      className="pt-20 sm:pt-24 animate-page-enter"
    >
      {children}
    </main>
  );
}
