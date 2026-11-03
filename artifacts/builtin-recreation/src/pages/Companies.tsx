import { useState, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Search,
  MapPin,
  Building2,
  CheckCircle2,
  Briefcase,
  ChevronDown,
  ArrowRight,
  Bookmark,
  Clock,
  Utensils,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  Globe,
} from 'lucide-react';
import { SEO } from '@/lib/seo';
import {
  companiesDatabase,
  jobsDatabase,
  getCompanyBySlug,
  CompanyProfile,
  JobItem,
} from '@/data/portalData';

// Maintain backward-compatible CompanyCard interface
export interface CompanyCard {
  id: string;
  name: string;
  verified?: boolean;
  logo: string;
  coverImage?: string;
  industry: string;
  location: string;
  workPolicy: 'Hybrid' | 'On-site' | 'Remote';
  employees: string;
  tagline: string;
  description?: string;
  openJobsCount: number;
  tags?: string[];
  featured?: boolean;
  salaryRange?: string;
}

// Export companiesData derived directly from authoritative portalData companiesDatabase
export const companiesData: CompanyCard[] = companiesDatabase.map((comp) => {
  const policy: 'Hybrid' | 'On-site' | 'Remote' = comp.hq.toLowerCase().includes('remote')
    ? 'Remote'
    : comp.hq.toLowerCase().includes('hybrid') || comp.hq.toLowerCase().includes('singapore')
    ? 'Hybrid'
    : 'On-site';

  return {
    id: comp.slug || comp.id,
    name: comp.name,
    verified: true,
    logo: comp.logoImg,
    coverImage: comp.heroImg,
    industry: comp.industry,
    location: comp.hq,
    workPolicy: policy,
    employees: comp.size,
    tagline: comp.quoteText || comp.desc.slice(0, 90) + '...',
    description: comp.desc,
    openJobsCount: comp.jobsCount || 6,
    tags: comp.hiringCategories ? comp.hiringCategories.map((c) => c.name) : ['Technology', 'Engineering'],
    featured: true,
  };
});

export const initialDirectoryCompanies = companiesData;
export const featuredMockCompanies = companiesData.slice(0, 3);

export default function Companies() {
  const [, setLocation] = useLocation();
  const [query, setQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [selectedPolicy, setSelectedPolicy] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'openings' | 'name'>('featured');
  const [savedJobIds, setSavedJobIds] = useState<Record<string, boolean>>({});
  const [page, setPage] = useState<number>(1);

  // User requirement: EXACTLY 3 CARDS PER ROW. 9 cards = 3 full rows of 3
  const CARDS_PER_PAGE = 9;

  const toggleSave = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSavedJobIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Combine jobsDatabase with its matched company profile from companiesDatabase
  const combinedCompanyJobs = useMemo(() => {
    return jobsDatabase.map((job) => {
      const company =
        getCompanyBySlug(job.companySlug) ||
        companiesDatabase.find(
          (c) =>
            c.slug.toLowerCase() === job.companySlug.toLowerCase() ||
            c.id.toLowerCase() === job.companySlug.toLowerCase() ||
            c.name.toLowerCase().includes(job.company.toLowerCase()) ||
            job.company.toLowerCase().includes(c.shortName.toLowerCase())
        ) ||
        companiesDatabase[0];

      return {
        job,
        company,
      };
    });
  }, []);

  // Filtered listing based on search query, industry, location, policy
  const filteredCompanyList = useMemo(() => {
    let result = combinedCompanyJobs.filter(({ job, company }) => {
      const q = query.toLowerCase().trim();
      const matchesQuery =
        !q ||
        company.name.toLowerCase().includes(q) ||
        company.shortName.toLowerCase().includes(q) ||
        job.title.toLowerCase().includes(q) ||
        job.department.toLowerCase().includes(q) ||
        company.industry.toLowerCase().includes(q) ||
        job.location.toLowerCase().includes(q) ||
        company.hq.toLowerCase().includes(q);

      const matchesIndustry =
        selectedIndustry === 'All' ||
        company.industry.toLowerCase().includes(selectedIndustry.toLowerCase()) ||
        job.department.toLowerCase().includes(selectedIndustry.toLowerCase());

      const matchesLocation =
        selectedLocation === 'All' ||
        job.location.toLowerCase().includes(selectedLocation.toLowerCase()) ||
        company.hq.toLowerCase().includes(selectedLocation.toLowerCase());

      const matchesPolicy =
        selectedPolicy === 'All' ||
        job.workplaceType.toLowerCase() === selectedPolicy.toLowerCase();

      return matchesQuery && matchesIndustry && matchesLocation && matchesPolicy;
    });

    if (sortBy === 'openings') {
      result = [...result].sort((a, b) => (b.company.jobsCount || 0) - (a.company.jobsCount || 0));
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.company.name.localeCompare(b.company.name));
    }

    return result;
  }, [combinedCompanyJobs, query, selectedIndustry, selectedLocation, selectedPolicy, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filteredCompanyList.length / CARDS_PER_PAGE));
  const paginatedList = useMemo(() => {
    const start = (page - 1) * CARDS_PER_PAGE;
    return filteredCompanyList.slice(start, start + CARDS_PER_PAGE);
  }, [page, filteredCompanyList]);

  const resetFilters = () => {
    setQuery('');
    setSelectedIndustry('All');
    setSelectedLocation('All');
    setSelectedPolicy('All');
    setSortBy('featured');
    setPage(1);
  };

  const hasActiveFilters =
    query || selectedIndustry !== 'All' || selectedLocation !== 'All' || selectedPolicy !== 'All';

  return (
    <div className="bg-[#f8fafc] min-h-screen text-slate-900 pb-24 font-sans">
      <SEO
        title="Top Tech Companies & Verified Employers | Built In Sandbox"
        description="Explore verified company profiles, workplace culture, compensation packages, and direct opportunities across Vietnam, Singapore, London, and global tech hubs."
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/companies` : ''}
        keywords={[
          'tech companies',
          'company profiles',
          'access partnership',
          'viet nhat cơ điện',
          'vinmec hospital',
          'sei seev',
          'chailease',
          'servicenow',
          'grab',
        ]}
      />

      {/* Main Container */}
      <main className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Section Header: Matches user reference screenshot with blue accent bar and carousel arrows */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-7 bg-blue-600 rounded-sm" />
            <h1 className="text-2xl sm:text-3xl font-black text-slate-950 tracking-tight">
              Latest Internships & Verified Companies
            </h1>
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-black hover:border-slate-400 disabled:opacity-40 flex items-center justify-center transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
                aria-label="Previous page"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-700 hover:text-black hover:border-slate-400 disabled:opacity-40 flex items-center justify-center transition-all shadow-xs cursor-pointer disabled:cursor-not-allowed"
                aria-label="Next page"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="text-xs sm:text-sm font-bold text-slate-900 hover:text-blue-600 flex items-center gap-1 group transition-colors ml-2"
            >
              <span>View All Internships</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Unified Search & Filters Toolbar */}
        <div className="bg-white rounded-2xl p-3 sm:p-4 mb-8 shadow-xs border border-slate-200/80 flex flex-wrap lg:flex-nowrap items-center gap-3">
          {/* Search Input Box */}
          <div className="flex-1 min-w-[240px] flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 focus-within:border-blue-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <Search size={16} className="text-slate-400 mr-2.5 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search by company (Access Partnership, Việt Nhật, Vinmec...), role, or tech..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="text-slate-400 hover:text-slate-600 p-0.5"
              >
                <X size={13} />
              </button>
            )}
          </div>

          {/* Industry Dropdown */}
          <div className="w-full sm:w-auto flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 relative">
            <Building2 size={14} className="text-slate-500 mr-2 flex-shrink-0" />
            <select
              value={selectedIndustry}
              onChange={(e) => {
                setSelectedIndustry(e.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-xs text-slate-800 font-semibold focus:outline-none appearance-none pr-6 cursor-pointer"
            >
              <option value="All">All Industries</option>
              <option value="Policy">Tech Policy & Global Advisory</option>
              <option value="Electronics">Electronics & M&E Automation</option>
              <option value="Healthcare">Healthcare & Hospital</option>
              <option value="Cloud">Enterprise Cloud & SaaS</option>
              <option value="Superapp">Superapp & Fintech</option>
              <option value="Automotive">Automotive & Mobility</option>
              <option value="Biopharma">Biopharma & Health</option>
              <option value="Telecom">Telecom & 5G</option>
              <option value="Education">Education & Academics</option>
              <option value="Logistics">Ports & Freight Logistics</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 absolute right-3 pointer-events-none" />
          </div>

          {/* Location Dropdown */}
          <div className="w-full sm:w-auto flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 relative">
            <MapPin size={14} className="text-slate-500 mr-2 flex-shrink-0" />
            <select
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-xs text-slate-800 font-semibold focus:outline-none appearance-none pr-6 cursor-pointer"
            >
              <option value="All">All Locations</option>
              <option value="London">London, United Kingdom</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Hồ Chí Minh">Hồ Chí Minh</option>
              <option value="Singapore">Singapore</option>
              <option value="Phnom Penh">Phnom Penh, Cambodia</option>
              <option value="Remote">All-Remote</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 absolute right-3 pointer-events-none" />
          </div>

          {/* Work Mode Dropdown */}
          <div className="w-full sm:w-auto flex-1 flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 relative">
            <Briefcase size={14} className="text-slate-500 mr-2 flex-shrink-0" />
            <select
              value={selectedPolicy}
              onChange={(e) => {
                setSelectedPolicy(e.target.value);
                setPage(1);
              }}
              className="w-full bg-transparent text-xs text-slate-800 font-semibold focus:outline-none appearance-none pr-6 cursor-pointer"
            >
              <option value="All">All Work Policies</option>
              <option value="On-site">On-site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 absolute right-3 pointer-events-none" />
          </div>

          {/* Sort By Dropdown */}
          <div className="w-full sm:w-auto flex items-center bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-xs text-slate-800 font-semibold focus:outline-none appearance-none pr-6 cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="openings">Most Open Positions</option>
              <option value="name">Company Name (A-Z)</option>
            </select>
            <ChevronDown size={14} className="text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Reset
            </button>
          )}
        </div>

        {/* =========================================================================
            CARD GRID: STRICTLY 3 CARDS PER ROW AS REQUESTED
            grid-cols-1 md:grid-cols-2 lg:grid-cols-3
           ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {paginatedList.map(({ job, company }) => {
            const isSaved = !!savedJobIds[job.id];
            const companyDetailHref = `/companies/${company.slug || company.id}`;
            const jobDetailHref = `/jobs/${job.id}`;

            // Image fallback for the top cover image matching modern dark office from mockup
            const coverPhoto =
              job.buildingImage ||
              company.heroImg ||
              'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80';

            // Determine perk label
            const primaryPerk =
              job.perks && job.perks.length > 0
                ? job.perks[0].toLowerCase().includes('ăn') || job.perks[0].toLowerCase().includes('meal')
                  ? 'Meal Stipend'
                  : job.perks[0].toLowerCase().includes('xe') || job.perks[0].toLowerCase().includes('housing')
                  ? 'Housing Allowance'
                  : job.perks[0].toLowerCase().includes('bảo hiểm') || job.perks[0].toLowerCase().includes('health')
                  ? 'Health & Wellness'
                  : job.perks[0]
                : 'Meal Stipend';

            const displayPolicy =
              job.workplaceType === 'On-site'
                ? 'Full-time'
                : job.workplaceType === 'Hybrid'
                ? 'Hybrid'
                : job.workplaceType === 'Remote'
                ? 'Remote'
                : 'Full-time';

            return (
              <article
                key={job.id}
                onClick={() => setLocation(companyDetailHref)}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl hover:border-blue-500 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
              >
                {/* 1. Top Cover Image with Full-time / Hybrid Badge & Bookmark Button */}
                <div className="relative h-48 sm:h-52 w-full bg-slate-950 overflow-hidden">
                  <img
                    src={coverPhoto}
                    alt={company.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent pointer-events-none" />

                  {/* Top-Left Purple Badge: Full-Time / Workplace Type */}
                  <div className="absolute top-3.5 left-3.5 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#310e59]/95 text-white text-[11px] font-bold backdrop-blur-xs shadow-xs border-0">
                      <Briefcase size={12} className="text-purple-200" />
                      <span>{displayPolicy}</span>
                    </span>
                  </div>

                  {/* Top-Right White Circle Bookmark Button */}
                  <div className="absolute top-3.5 right-3.5 z-10">
                    <button
                      type="button"
                      onClick={(e) => toggleSave(job.id, e)}
                      className={`p-1.5 rounded-full bg-transparent border-0 flex items-center justify-center drop-shadow-md transition-all hover:scale-110 cursor-pointer ${
                        isSaved ? 'text-blue-500' : 'text-white/90 hover:text-white'
                      }`}
                      aria-label="Save this job"
                      title={isSaved ? 'Saved' : 'Save'}
                    >
                      <Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} strokeWidth={2.2} />
                    </button>
                  </div>
                </div>

                {/* 2. Card Content Body */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  {/* Company Header Row: Logo + Name & Verification + Department */}
                  <div className="flex items-start gap-3 mb-2.5">
                    {/* Brand Logo in Square Box */}
                    <div className="w-12 h-12 rounded-xl bg-transparent border-0 p-0 flex items-center justify-center flex-shrink-0 overflow-hidden">
                      <img
                        src={company.logoImg || job.logo}
                        alt={company.name}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/images/access_partnership_logo.svg';
                        }}
                      />
                    </div>

                    {/* Company Name & Industry Subtitle */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-sm sm:text-[15px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate">
                          <Link
                            href={companyDetailHref}
                            onClick={(e) => e.stopPropagation()}
                            title={company.name}
                          >
                            {company.name}
                          </Link>
                        </h3>
                        <span title="Verified Employer" className="inline-flex items-center"><CheckCircle2 size={15} className="text-white fill-[#0066cc] flex-shrink-0" /></span>
                      </div>
                      <div className="text-[12px] text-slate-500 truncate mt-0.5">
                        {job.department || company.industry}
                      </div>
                    </div>
                  </div>

                  {/* Location & Workplace Type Row */}
                  <div className="flex items-center gap-2 text-[12px] text-slate-500 font-medium mb-3">
                    <span className="flex items-center gap-1 truncate">
                      <MapPin size={13} className="text-slate-400" />
                      {job.location || company.hq}
                    </span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1 text-slate-600">
                      <Briefcase size={13} className="text-slate-400" />
                      {job.workplaceType || 'On-site'}
                    </span>
                  </div>

                  {/* Role Title / Opportunity Headline */}
                  <h4 className="text-[15.5px] font-bold text-slate-950 leading-snug line-clamp-2 mb-3.5 group-hover:text-blue-600 transition-colors min-h-[44px]">
                    <Link
                      href={companyDetailHref}
                      onClick={(e) => e.stopPropagation()}
                      title={job.title}
                    >
                      {job.title}
                    </Link>
                  </h4>

                  {/* Salary & Perk Bar (Matching Mockup with Circular Dollar Icon & Perk) */}
                  <div className="bg-[#f1f5f9]/90 rounded-xl px-3.5 py-2.5 flex items-center justify-between text-xs font-semibold mb-4 border-0 mt-auto">
                    {/* Left: Salary Amount */}
                    <div className="flex items-center gap-1.5 truncate">
                      <span className="font-black text-slate-900 text-xs flex-shrink-0 bg-transparent">
                        $
                      </span>
                      <span className="font-extrabold text-slate-900 truncate">
                        {job.compensation}
                      </span>
                      <span className="text-[11px] text-slate-500 font-normal">
                        {job.salaryPeriod || '/tháng'}
                      </span>
                    </div>

                    <span className="text-slate-300 mx-1.5">|</span>

                    {/* Right: Perk Highlight */}
                    <div className="flex items-center gap-1 text-slate-600 text-[11px] font-medium flex-shrink-0">
                      <Utensils size={12} className="text-slate-500" />
                      <span>{primaryPerk}</span>
                    </div>
                  </div>

                  {/* Footer Row: Posted Time & View Details Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[11px] text-slate-400 font-medium">
                      <Clock size={12} />
                      <span>{job.timeAgo || 'Vừa đăng'}</span>
                    </span>

                    <Link
                      href={companyDetailHref}
                      onClick={(e) => e.stopPropagation()}
                      className="bg-[#0f4cd9] hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-full transition-colors flex items-center gap-1.5 shadow-xs"
                    >
                      <span>View Details & Apply</span>
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredCompanyList.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 mt-6 shadow-xs">
            <Building2 size={44} className="mx-auto text-slate-300 mb-3" />
            <h3 className="text-base font-bold text-slate-900 mb-1">No companies found</h3>
            <p className="text-xs text-slate-500 mb-4">
              We couldn't find any companies matching your current filters.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200">
            <div className="text-xs text-slate-500 font-medium">
              Showing {(page - 1) * CARDS_PER_PAGE + 1}–{Math.min(page * CARDS_PER_PAGE, filteredCompanyList.length)} of{' '}
              {filteredCompanyList.length} Opportunities & Companies (3 per row)
            </div>

            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                <button
                  key={pNum}
                  type="button"
                  onClick={() => setPage(pNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    page === pNum
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {pNum}
                </button>
              ))}

              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 disabled:opacity-40 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
