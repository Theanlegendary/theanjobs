import React from 'react';

interface SkeletonCardProps {
  type?: 'job' | 'company' | 'article';
}

export function SkeletonCard({ type = 'job' }: SkeletonCardProps) {
  if (type === 'job') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-6 animate-pulse">
        <div className="flex items-start gap-4">
          {/* Logo skeleton */}
          <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0" />
          
          <div className="flex-1 space-y-3">
            {/* Title skeleton */}
            <div className="h-5 bg-gray-200 rounded w-3/4" />
            
            {/* Company name skeleton */}
            <div className="h-4 bg-gray-200 rounded w-1/2" />
            
            {/* Meta info skeleton */}
            <div className="flex gap-4">
              <div className="h-3 bg-gray-200 rounded w-20" />
              <div className="h-3 bg-gray-200 rounded w-24" />
              <div className="h-3 bg-gray-200 rounded w-16" />
            </div>
            
            {/* Tags skeleton */}
            <div className="flex gap-2">
              <div className="h-6 bg-gray-200 rounded-full w-16" />
              <div className="h-6 bg-gray-200 rounded-full w-20" />
              <div className="h-6 bg-gray-200 rounded-full w-24" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'company') {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
        {/* Banner skeleton */}
        <div className="h-32 bg-gray-200" />
        
        <div className="p-6 -mt-8">
          {/* Logo skeleton */}
          <div className="w-16 h-16 bg-gray-300 rounded-lg mb-4 border-4 border-white" />
          
          {/* Company name skeleton */}
          <div className="h-6 bg-gray-200 rounded w-2/3 mb-2" />
          
          {/* Location skeleton */}
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
          
          {/* Description skeleton */}
          <div className="space-y-2">
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-5/6" />
          </div>
          
          {/* Stats skeleton */}
          <div className="flex gap-4 mt-4">
            <div className="h-4 bg-gray-200 rounded w-20" />
            <div className="h-4 bg-gray-200 rounded w-24" />
          </div>
        </div>
      </div>
    );
  }

  // Article skeleton
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="h-48 bg-gray-200" />
      
      <div className="p-6 space-y-3">
        {/* Category skeleton */}
        <div className="h-4 bg-gray-200 rounded w-24" />
        
        {/* Title skeleton */}
        <div className="space-y-2">
          <div className="h-5 bg-gray-200 rounded w-full" />
          <div className="h-5 bg-gray-200 rounded w-4/5" />
        </div>
        
        {/* Excerpt skeleton */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-2/3" />
        </div>
        
        {/* Meta skeleton */}
        <div className="flex gap-4">
          <div className="h-3 bg-gray-200 rounded w-20" />
          <div className="h-3 bg-gray-200 rounded w-16" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonGrid({ type = 'job', count = 6 }: { type?: 'job' | 'company' | 'article'; count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} type={type} />
      ))}
    </div>
  );
}
