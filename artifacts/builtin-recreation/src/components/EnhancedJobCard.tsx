import React, { useState } from 'react';
import { Link } from 'wouter';
import { MapPin, Clock, DollarSign, Bookmark, ExternalLink, TrendingUp } from 'lucide-react';

interface JobCardProps {
  job: {
    id: string;
    title: string;
    company: string;
    location: string;
    salary?: string;
    type: string;
    posted: string;
    logo?: string;
    tags?: string[];
    featured?: boolean;
    remote?: boolean;
  };
}

export function EnhancedJobCard({ job }: JobCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: isHovered
          ? '0 12px 24px -4px rgba(0, 0, 0, 0.12), 0 8px 16px -8px rgba(0, 0, 0, 0.08)'
          : '0 1px 3px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Featured Badge */}
      {job.featured && (
        <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          Featured
        </div>
      )}

      {/* Hover Gradient Border Effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ padding: '2px', zIndex: -1 }}
      />

      <Link href={`/jobs/${job.id}`}>
        <div className="p-6 cursor-pointer relative bg-white">
          <div className="flex items-start gap-4">
            {/* Company Logo */}
            <div className="relative flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-110">
                {job.logo ? (
                  <img src={job.logo} alt={job.company} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-gray-400">
                    {job.company.charAt(0)}
                  </span>
                )}
              </div>
              
              {/* Pulse Animation for New Jobs */}
              {job.posted === 'Just posted' && (
                <div className="absolute -top-1 -right-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </span>
                </div>
              )}
            </div>

            {/* Job Content */}
            <div className="flex-1 min-w-0">
              {/* Job Title */}
              <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                {job.title}
              </h3>

              {/* Company Name */}
              <p className="text-gray-700 font-medium mb-3">{job.company}</p>

              {/* Job Meta Info */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {job.location}
                  {job.remote && (
                    <span className="ml-1 text-green-600 font-medium">• Remote</span>
                  )}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {job.posted}
                </span>
                {job.salary && (
                  <span className="flex items-center gap-1 text-green-700 font-semibold">
                    <DollarSign className="w-4 h-4" />
                    {job.salary}
                  </span>
                )}
              </div>

              {/* Tags */}
              {job.tags && job.tags.length > 0 && (
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600">
                  {job.tags.slice(0, 3).map((tag, index, arr) => (
                    <span key={index} className="inline-flex items-center gap-2">
                      <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors">
                        {tag}
                      </span>
                      {index < arr.length - 1 && (
                        <span className="text-slate-300 font-normal select-none">/</span>
                      )}
                    </span>
                  ))}
                  {job.tags.length > 3 && (
                    <span className="text-slate-400 text-xs font-normal">
                      +{job.tags.length - 3} more
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions (Show on Hover) */}
          <div
            className={`mt-4 pt-4 border-t border-gray-100 flex items-center justify-between transition-all duration-300 ${
              isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            <span className="text-xs text-gray-500">{job.type}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsBookmarked(!isBookmarked);
                }}
                className={`p-2 rounded-lg transition-colors ${
                  isBookmarked
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Bookmark className="w-4 h-4" fill={isBookmarked ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  window.open(`/jobs/${job.id}`, '_blank');
                }}
                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
