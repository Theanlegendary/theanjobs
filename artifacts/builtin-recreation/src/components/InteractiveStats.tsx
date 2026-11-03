import React, { useEffect, useState, useRef } from 'react';
import { TrendingUp, Users, Briefcase, Building2 } from 'lucide-react';

interface StatItem {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  color: string;
}

export function InteractiveStats() {
  const [isVisible, setIsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats: StatItem[] = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      value: 12500,
      label: 'Active Jobs',
      suffix: '+',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      value: 3200,
      label: 'Companies',
      suffix: '+',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 850000,
      label: 'Job Seekers',
      suffix: '+',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: 95,
      label: 'Success Rate',
      suffix: '%',
      color: 'from-orange-500 to-red-500',
    },
  ];

  return (
    <div ref={statsRef} className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              stat={stat}
              isVisible={isVisible}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  stat: StatItem;
  isVisible: boolean;
  delay: number;
}

function StatCard({ stat, isVisible, delay }: StatCardProps) {
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = stat.value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= stat.value) {
        setCount(stat.value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isVisible, stat.value]);

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div
      className={`relative group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Card */}
      <div
        className={`relative bg-white rounded-2xl p-6 shadow-lg overflow-hidden transition-all duration-300 ${
          isHovered ? 'transform scale-105 shadow-2xl' : ''
        }`}
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
        />

        {/* Icon */}
        <div
          className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white mb-4 transition-transform duration-300 ${
            isHovered ? 'scale-110 rotate-6' : ''
          }`}
        >
          {stat.icon}
        </div>

        {/* Number */}
        <div className="relative">
          <div className="text-4xl font-bold text-gray-900 mb-1">
            {isVisible ? formatNumber(count) : '0'}
            {isVisible && count === stat.value && stat.suffix}
          </div>
          
          {/* Label */}
          <div className="text-sm font-medium text-gray-600">{stat.label}</div>
        </div>

        {/* Decorative Elements */}
        <div
          className={`absolute -right-4 -bottom-4 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full opacity-10 transition-all duration-500 ${
            isHovered ? 'scale-150' : 'scale-100'
          }`}
        />
        <div
          className={`absolute -right-2 -bottom-2 w-16 h-16 bg-gradient-to-br ${stat.color} rounded-full opacity-10 transition-all duration-500 ${
            isHovered ? 'scale-150' : 'scale-100'
          }`}
        />
      </div>

      {/* Glow Effect on Hover */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-2xl blur-xl -z-10 transition-opacity duration-300 ${
          isHovered ? 'opacity-30' : 'opacity-0'
        }`}
      />
    </div>
  );
}
