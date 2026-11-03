import React from 'react';
import { Briefcase, Building2, Users, TrendingUp } from 'lucide-react';

interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  iconBg: string;
  glowBg: string;
}

const statsData: StatItem[] = [
  {
    id: 'stat-jobs',
    value: '12.5K+',
    label: 'Active Jobs',
    icon: <Briefcase size={22} className="text-white" strokeWidth={2.2} />,
    iconBg: 'bg-[#0080ff]',
    glowBg: 'bg-[#0080ff]/10',
  },
  {
    id: 'stat-companies',
    value: '3.2K+',
    label: 'Companies',
    icon: <Building2 size={22} className="text-white" strokeWidth={2.2} />,
    iconBg: 'bg-gradient-to-br from-[#b02a8f] to-[#e63980]',
    glowBg: 'bg-[#e63980]/10',
  },
  {
    id: 'stat-seekers',
    value: '850.0K+',
    label: 'Job Seekers',
    icon: <Users size={22} className="text-white" strokeWidth={2.2} />,
    iconBg: 'bg-[#00b050]',
    glowBg: 'bg-[#00b050]/10',
  },
  {
    id: 'stat-success',
    value: '95%',
    label: 'Success Rate',
    icon: <TrendingUp size={22} className="text-white" strokeWidth={2.5} />,
    iconBg: 'bg-gradient-to-br from-[#ff4d00] to-[#ff7700]',
    glowBg: 'bg-[#ff5500]/10',
  },
];

export const StatsSection: React.FC = () => {
  return (
    <section className="container max-w-7xl mx-auto px-4 sm:px-6 my-6 sm:my-8" aria-label="Key Metrics">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5">
        {statsData.map((stat) => (
          <div
            key={stat.id}
            className="bg-white rounded-2xl border border-slate-100 p-4 sm:p-5 shadow-[0_2px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.06)] hover:border-slate-200 transition-all duration-200 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Top Icon */}
            <div
              className={`w-11 h-11 rounded-xl ${stat.iconBg} flex items-center justify-center shadow-xs shrink-0 mb-4`}
            >
              {stat.icon}
            </div>

            {/* Stat Value & Label */}
            <div>
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-none mb-1">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-slate-500 tracking-normal">
                {stat.label}
              </div>
            </div>

            {/* Bottom-right decorative glow circle */}
            <div
              className={`absolute -bottom-6 -right-6 w-24 h-24 rounded-full ${stat.glowBg} blur-xl pointer-events-none`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};
