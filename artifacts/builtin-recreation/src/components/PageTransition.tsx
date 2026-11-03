import React from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
}

export function PageTransition({ children }: PageTransitionProps) {
  return (
    <div className="page-transition opacity-100 translate-y-0 w-full min-w-0">
      {children}
    </div>
  );
}

export function FadeIn({ children }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="fade-in-wrapper w-full min-w-0">
      {children}
    </div>
  );
}

export function SlideIn({ children }: { children: React.ReactNode; direction?: string; delay?: number }) {
  return (
    <div className="slide-in-wrapper w-full min-w-0">
      {children}
    </div>
  );
}

export function ScaleIn({ children }: { children: React.ReactNode; delay?: number }) {
  return (
    <div className="scale-in-wrapper w-full min-w-0">
      {children}
    </div>
  );
}
