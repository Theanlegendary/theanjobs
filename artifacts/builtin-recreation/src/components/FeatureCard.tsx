import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'pink';
  delay?: number;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  color = 'blue',
  delay = 0,
}: FeatureCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const colorClasses = {
    blue: {
      gradient: 'from-blue-500 to-cyan-500',
      icon: 'text-blue-600',
      glow: 'bg-blue-400',
    },
    purple: {
      gradient: 'from-purple-500 to-pink-500',
      icon: 'text-purple-600',
      glow: 'bg-purple-400',
    },
    green: {
      gradient: 'from-green-500 to-emerald-500',
      icon: 'text-green-600',
      glow: 'bg-green-400',
    },
    orange: {
      gradient: 'from-orange-500 to-red-500',
      icon: 'text-orange-600',
      glow: 'bg-orange-400',
    },
    pink: {
      gradient: 'from-pink-500 to-rose-500',
      icon: 'text-pink-600',
      glow: 'bg-pink-400',
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className="relative group transition-all duration-500 animate-slide-in-up"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div
        className={`relative bg-white rounded-2xl p-8 shadow-md overflow-hidden transition-all duration-300 ${
          isHovered ? 'transform scale-105 shadow-2xl' : ''
        }`}
      >
        {/* Gradient Background (subtle) */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
        />

        {/* Icon Container */}
        <div className="relative mb-6">
          <div
            className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${colors.gradient} text-white transition-all duration-500 ${
              isHovered ? 'scale-110 rotate-6 shadow-xl' : 'scale-100 rotate-0'
            }`}
          >
            <Icon className="w-8 h-8" />
          </div>

          {/* Glow Effect */}
          <div
            className={`absolute top-0 left-0 w-16 h-16 rounded-2xl ${colors.glow} blur-2xl opacity-0 transition-opacity duration-500 ${
              isHovered ? 'opacity-30' : ''
            }`}
          />
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed">{description}</p>

        {/* Decorative Elements */}
        <div
          className={`absolute -right-8 -bottom-8 w-32 h-32 bg-gradient-to-br ${colors.gradient} rounded-full opacity-5 transition-all duration-500 ${
            isHovered ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Bottom Glow */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} rounded-2xl blur-xl -z-10 transition-opacity duration-300 ${
          isHovered ? 'opacity-20' : 'opacity-0'
        }`}
      />
    </div>
  );
}
