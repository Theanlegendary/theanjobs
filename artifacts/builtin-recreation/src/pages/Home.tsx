import React, { useState, useMemo, useRef } from 'react';
import { Link } from 'wouter';
import {
  Search,
  MapPin,
  Clock,
  Briefcase,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  Building2,
  Calendar,
  ArrowRight,
  TrendingUp,
  Flame,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Bell,
  ChevronDown,
  Landmark,
  Users,
  X,
} from 'lucide-react';
import { BestJobsSection } from '@/components/BestJobsSection';
import { opportunitiesData } from './Jobs';

// ============================================================================
// 1. EDITORIAL ARTICLES DATA (Matching reference screenshot)
// ============================================================================
interface EditorialArticle {
  id: string;
  slug: string;
  title: string;
  kicker: string;
  author: string;
  image: string;
  excerpt?: string;
  featured?: boolean;
}

const editorialTodayPicks: EditorialArticle[] = [
  {
    id: 'art-1',
    slug: 'cross-border-tech-hiring',
    kicker: 'POLICY & REMOTE TRENDS',
    title: 'Cross-Border Tech Hiring Guidelines & Global Remote Tax Treaties for 2026',
    author: 'SANDBOX EDITORIAL STAFF',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'art-2',
    slug: 'gitlab-autonomous-ai-duo',
    kicker: 'AUTONOMOUS DEV WORKFLOWS',
    title: 'GitLab Unveils Autonomous AI Duo: Transforming Developer Workflows from Planning to Production',
    author: 'SARAH JENKINS · GITLAB',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'art-3',
    slug: 'the-2026-state-of-tech-salaries',
    kicker: 'SPECIAL INVESTIGATION',
    title: 'THE 2026 STATE OF TECH SALARIES: WHY SPECIALIZED AI & DISTRIBUTED SYSTEMS ENGINEERS COMMAND RECORD PREMIUMS',
    author: 'DAVID STERLING',
    excerpt: 'An investigation across 1,200 tech organizations reveals evolving equity structures, with demand for high-concurrency systems outstripping generalist development by 2.4x.',
    image: '/images/editorial_tech_salaries_hd.png',
    featured: true,
  },
];

const editorialMostRecent: EditorialArticle[] = [
  {
    id: 'mr-1',
    slug: 'cross-border-tech-hiring',
    title: 'Cross-Border Tech Hiring Guidelines & Global Remote Tax Treaties for 2026',
    kicker: 'POLICY & REMOTE TRENDS',
    author: 'SANDBOX EDITORIAL STAFF',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'mr-2',
    slug: 'gitlab-autonomous-ai-duo',
    title: 'GitLab Unveils Autonomous AI Duo: Transforming Developer Workflows from Planning to Production',
    kicker: 'AUTONOMOUS DEV WORKFLOWS',
    author: 'SARAH JENKINS',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'mr-3',
    slug: 'datadog-low-latency-engine',
    title: 'Datadog Deploys Low-Latency Petabyte Streaming Engine: Inside the Infrastructure Powering Enterprise Observability',
    kicker: 'TECHNOLOGY INNOVATIONS',
    author: 'MARCUS VANCE',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'mr-4',
    slug: 'vinfast-global-rd-expansion',
    title: 'VinFast Global R&D Expansion: How We Support International Engineers with Relocation, Housing & Growth Stipends',
    kicker: 'SERVICES & CULTURE',
    author: 'NGUYEN THU HANG',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'mr-5',
    slug: 'compound-ai-systems',
    title: 'The Shift to Compound AI Systems: Why Future Software Engineering Belongs to Orchestrators',
    kicker: 'ARTIFICIAL INTELLIGENCE',
    author: 'DR. ELENA ROSTOVA',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
  },
];

const subNavTopics = [
  'TODAY',
  'BUSINESS',
  'AI SYSTEMS',
  'CULTURE',
  'INFRASTRUCTURE',
  'SECURITY',
  'CAREER',
];

// Companies for Directory (Cambodia Reference Design)
interface DirectoryCompany {
  id: string;
  name: string;
  logo: string;
  location: string;
  workPolicy: string;
  openJobsCount: number;
  tagline: string;
  tags: string[];
  role: string;
  verified?: boolean;
}

const homeDirectoryCompanies: DirectoryCompany[] = [
  {
    id: 'metfone',
    name: 'Metfone',
    logo: '/images/logo_metfone_kh.png',
    location: 'Phnom Penh, Cambodia',
    workPolicy: 'On-site · Hybrid',
    openJobsCount: 12,
    tagline: 'Leading mobile network operator in Cambodia, connecting millions of people.',
    tags: ['Telecom', 'Technology', 'Digital Services'],
    role: 'Telecom',
    verified: true,
  },
  {
    id: 'cellcard',
    name: 'Cellcard',
    logo: '/images/logo_cellcard_kh.png',
    location: 'Phnom Penh, Cambodia',
    workPolicy: 'On-site · Hybrid',
    openJobsCount: 8,
    tagline: 'Innovative mobile services for a better life.',
    tags: ['Telecom', 'Digital Services', 'Innovation'],
    role: 'Telecom',
    verified: true,
  },
  {
    id: 'aba-bank',
    name: 'ABA Bank',
    logo: '/images/logo_aba_kh.png',
    location: 'Phnom Penh, Cambodia',
    workPolicy: 'On-site',
    openJobsCount: 15,
    tagline: 'Banking for a better tomorrow.',
    tags: ['Banking', 'Finance', 'Fintech'],
    role: 'Banking',
    verified: true,
  },
  {
    id: 'truemoney-cambodia',
    name: 'TrueMoney Cambodia',
    logo: '/images/logo_truemoney_kh.png',
    location: 'Phnom Penh, Cambodia',
    workPolicy: 'Hybrid',
    openJobsCount: 10,
    tagline: 'Digital financial services for everyone.',
    tags: ['Fintech', 'Payments', 'Digital Wallet'],
    role: 'Fintech',
    verified: true,
  },
];

export default function Home() {
  const [activeTopic, setActiveTopic] = useState('TODAY');
  const [oppCanScrollLeft, setOppCanScrollLeft] = useState(false);
  const [oppCanScrollRight, setOppCanScrollRight] = useState(true);
  const oppCarouselRef = useRef<HTMLDivElement>(null);

  // Directory filter state
  const [dirSearchQuery, setDirSearchQuery] = useState('');
  const [dirLocation, setDirLocation] = useState('All');
  const [dirRole, setDirRole] = useState('All');
  const [dirPage, setDirPage] = useState(1);
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [alertEmail, setAlertEmail] = useState('');
  const [alertSubscribed, setAlertSubscribed] = useState(false);

  const checkOppScroll = () => {
    if (oppCarouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = oppCarouselRef.current;
      setOppCanScrollLeft(scrollLeft > 10);
      setOppCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  const scrollOppPrev = () => {
    if (oppCarouselRef.current) {
      oppCarouselRef.current.scrollBy({ left: -360, behavior: 'smooth' });
      setTimeout(checkOppScroll, 300);
    }
  };

  const scrollOppNext = () => {
    if (oppCarouselRef.current) {
      oppCarouselRef.current.scrollBy({ left: 360, behavior: 'smooth' });
      setTimeout(checkOppScroll, 300);
    }
  };

  const squareOpportunities = useMemo(() => {
    return opportunitiesData.slice(0, 6);
  }, []);

  const filteredDirCompanies = useMemo(() => {
    return homeDirectoryCompanies.filter((comp) => {
      if (dirLocation !== 'All' && !comp.location.toLowerCase().includes(dirLocation.toLowerCase())) {
        return false;
      }
      if (dirRole !== 'All' && comp.role !== dirRole && !comp.tags.some((t) => t.toLowerCase() === dirRole.toLowerCase())) {
        return false;
      }
      if (dirSearchQuery.trim()) {
        const q = dirSearchQuery.toLowerCase();
        return (
          comp.name.toLowerCase().includes(q) ||
          comp.tagline.toLowerCase().includes(q) ||
          comp.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [dirSearchQuery, dirLocation, dirRole]);

  const totalDirPages = Math.ceil(filteredDirCompanies.length / 4) || 1;
  const paginatedDirCompanies = useMemo(() => {
    const start = (dirPage - 1) * 4;
    return filteredDirCompanies.slice(start, start + 4);
  }, [filteredDirCompanies, dirPage]);

  return (
    <div className="bg-white min-h-screen font-sans">
      
      {/* ============================================================== */}
      {/* 1. TOP SUB-NAVIGATION BAR (Wired / Editorial Standard)          */}
      {/* ============================================================== */}
      <div className="border-t border-b border-black/15 bg-white">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between py-2 overflow-x-auto scrollbar-none gap-4">
            
            {/* Topic Navigation Links */}
            <nav className="flex items-center gap-6 sm:gap-8 shrink-0">
              {subNavTopics.map((topic) => {
                const isActive = activeTopic === topic;
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => setActiveTopic(topic)}
                    className={`text-[11px] font-bold tracking-[0.08em] uppercase transition-colors whitespace-nowrap cursor-pointer pb-1 relative ${
                      isActive
                        ? 'text-black font-extrabold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-black'
                        : 'text-slate-600 hover:text-black'
                    }`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {topic}
                  </button>
                );
              })}
            </nav>

            {/* Right Side CTAs */}
            <div className="flex items-center gap-3 shrink-0">
              <Link
                href="/create-post"
                className="bg-black hover:bg-slate-800 text-white text-[11px] font-bold tracking-[0.05em] uppercase px-3 py-1.5 rounded-full flex items-center gap-1.5 transition-all shadow-xs"
                style={{ fontFamily: "'Inter', sans-serif", color: '#ffffff' }}
              >
                <Plus size={12} strokeWidth={3} className="text-white" />
                <span className="text-white font-bold">Post Article</span>
              </Link>
              <Link
                href="/articles"
                className="text-[11px] font-bold text-black hover:text-blue-600 transition-colors uppercase tracking-[0.05em] whitespace-nowrap"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Archives →
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* ============================================================== */}
      {/* 2. EDITORIAL SHOWCASE: TODAY'S PICKS & MOST RECENT             */}
      {/* ============================================================== */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================================== */}
          {/* LEFT 8 COLUMNS: TODAY'S PICKS                              */}
          {/* ========================================================== */}
          <div className="lg:col-span-8 space-y-4">
            
            {/* Section Header (Clean modern editorial accent, no chunky badge) */}
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-900 mb-4">
              <span 
                className="text-[12.5px] font-black uppercase tracking-[0.14em] text-slate-950 select-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                TODAY'S PICKS
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
            </div>

            {/* 3-Article Grid: Responsive hierarchy with varied distinct aspect ratios */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Big Featured Story: Shown first on mobile (order-1), right on desktop (md:order-2) */}
              <div className="md:col-span-7 order-1 md:order-2">
                <article className="group flex flex-col h-full">
                  <Link href={`/articles/${editorialTodayPicks[2].slug}`} className="block overflow-hidden rounded-lg mb-3 bg-slate-900 shadow-xs">
                    <img
                      src={editorialTodayPicks[2].image}
                      alt={editorialTodayPicks[2].title}
                      className="w-full aspect-[2.1/1] object-cover group-hover:scale-102 transition-transform duration-300"
                    />
                  </Link>
                  <span 
                    className="text-[11px] sm:text-[12px] font-bold uppercase tracking-wider text-blue-600 mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {editorialTodayPicks[2].kicker}
                  </span>
                  <h2 
                    className="text-[20px] sm:text-[23px] lg:text-[25px] font-extrabold text-slate-900 leading-[1.25] tracking-tight group-hover:text-blue-600 transition-colors mb-2"
                  >
                    <Link href={`/articles/${editorialTodayPicks[2].slug}`}>
                      {editorialTodayPicks[2].title}
                    </Link>
                  </h2>
                  <p className="text-[13px] sm:text-[14px] text-slate-600 leading-relaxed mb-3 line-clamp-3 sm:line-clamp-none">
                    {editorialTodayPicks[2].excerpt}
                  </p>
                  <span 
                    className="text-[11px] font-medium uppercase tracking-wider text-slate-500 mt-auto"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {editorialTodayPicks[2].author}
                  </span>
                </article>
              </div>

              {/* Stacked Stories: Shown second on mobile (order-2), left on desktop (md:order-1) */}
              <div className="md:col-span-5 order-2 md:order-1 flex flex-col justify-between gap-6">
                
                {/* Story 1 - Vertical 1.25:1 aspect ratio */}
                <article className="group flex flex-col">
                  <Link href={`/articles/${editorialTodayPicks[0].slug}`} className="block overflow-hidden rounded-lg mb-2.5 bg-slate-100 shadow-2xs">
                    <img
                      src={editorialTodayPicks[0].image}
                      alt={editorialTodayPicks[0].title}
                      className="w-full aspect-[1.25/1] sm:aspect-[1.3/1] object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </Link>
                  <span 
                    className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {editorialTodayPicks[0].kicker}
                  </span>
                  <h3 
                    className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug tracking-tight group-hover:text-blue-600 transition-colors mb-1.5"
                  >
                    <Link href={`/articles/${editorialTodayPicks[0].slug}`}>
                      {editorialTodayPicks[0].title}
                    </Link>
                  </h3>
                  <span 
                    className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mt-auto"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {editorialTodayPicks[0].author}
                  </span>
                </article>

                {/* Story 2 - Cinematic wide 1.7:1 aspect ratio (never identical to story 1) */}
                <article className="group flex flex-col pt-4 border-t border-slate-200">
                  <Link href={`/articles/${editorialTodayPicks[1].slug}`} className="block overflow-hidden rounded-lg mb-2.5 bg-slate-100 shadow-2xs">
                    <img
                      src={editorialTodayPicks[1].image}
                      alt={editorialTodayPicks[1].title}
                      className="w-full aspect-[1.7/1] sm:aspect-[1.75/1] object-cover group-hover:scale-103 transition-transform duration-300"
                    />
                  </Link>
                  <span 
                    className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {editorialTodayPicks[1].kicker}
                  </span>
                  <h3 
                    className="text-[15px] sm:text-[16px] font-bold text-slate-900 leading-snug tracking-tight group-hover:text-blue-600 transition-colors mb-1.5"
                  >
                    <Link href={`/articles/${editorialTodayPicks[1].slug}`}>
                      {editorialTodayPicks[1].title}
                    </Link>
                  </h3>
                  <span 
                    className="text-[10px] font-medium uppercase tracking-wider text-slate-500 mt-auto"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {editorialTodayPicks[1].author}
                  </span>
                </article>

              </div>

            </div>

          </div>

          {/* ========================================================== */}
          {/* RIGHT 4 COLUMNS: MOST RECENT                               */}
          {/* ========================================================== */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* Section Header (Clean modern editorial accent, no chunky badge) */}
            <div className="flex items-center gap-2 pb-2 border-b-2 border-slate-900 mb-4">
              <span 
                className="text-[12.5px] font-black uppercase tracking-[0.14em] text-slate-950 select-none"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                MOST RECENT
              </span>
              <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
            </div>

            {/* List of 5 Compact Articles with Thumbnail on Right */}
            <div className="divide-y divide-slate-200">
              {editorialMostRecent.map((item) => (
                <article key={item.id} className="group py-3.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0 pr-1">
                    <h4 
                      className="text-[13.5px] sm:text-[14px] font-semibold text-slate-800 leading-snug tracking-tight group-hover:text-blue-600 transition-colors line-clamp-3 mb-1"
                    >
                      <Link href={`/articles/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h4>
                    <span 
                      className="text-[10px] font-medium uppercase tracking-wider text-slate-500"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                      {item.author}
                    </span>
                  </div>

                  <Link href={`/articles/${item.slug}`} className="shrink-0 block w-24 sm:w-28 rounded-lg overflow-hidden bg-slate-100 aspect-[1.35/1] shadow-2xs">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                </article>
              ))}
            </div>

          </div>

        </div>
      </section>

      

      {/* ============================================================== */}
      {/* 4. VIỆC LÀM TỐT NHẤT (BEST JOBS 3x3 CAROUSEL SHOWCASE)          */}
      {/* ============================================================== */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 my-6">
        <BestJobsSection />
      </section>

      {/* ============================================================== */}
      {/* 5. 2:10 FEATURE: SPLIT COMPANY DIRECTORY & METFONE POSTER      */}
      {/* ============================================================== */}
      <section className="container max-w-7xl mx-auto px-4 sm:px-6 my-10" id="company-section">
        <div className="company-directory-outer-card">
          <div className="flex flex-col md:flex-row gap-6 items-stretch">
            
            {/* Left Column: Top Companies Are Hiring Poster Card (Metfone Hero) */}
            <div className="w-full md:w-[270px] lg:w-[310px] shrink-0">
              <Link
                href="/companies"
                className="block relative rounded-2xl overflow-hidden w-full h-[220px] sm:h-[260px] md:h-full md:min-h-[480px] shadow-xs hover:shadow-md transition group bg-slate-900"
              >
                <img
                  src="/images/home_poster_metfone_hd.png"
                  alt="Top Companies Are Hiring - Grow Your Career"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-102 rounded-2xl"
                />
              </Link>
            </div>

            {/* Right Column: Company Directory List & Filters */}
            <div className="flex-1 min-w-0 flex flex-col justify-between">
              
              {/* Directory Header Row */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Landmark size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                      Company Directory
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Discover top companies and explore career opportunities worldwide.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowAlertModal(true)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-800 hover:bg-slate-50 transition cursor-pointer shrink-0 shadow-2xs"
                >
                  <Bell size={13} className="text-slate-800" />
                  <span>Get Job Alerts</span>
                  <ArrowRight size={13} className="text-slate-800" />
                </button>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-wrap items-center gap-2.5 mb-4">
                {/* Search Input */}
                <div className="relative flex-1 min-w-[180px]">
                  <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search companies..."
                    value={dirSearchQuery}
                    onChange={(e) => {
                      setDirSearchQuery(e.target.value);
                      setDirPage(1);
                    }}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white transition"
                  />
                </div>

                {/* Location Select */}
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={dirLocation}
                    onChange={(e) => {
                      setDirLocation(e.target.value);
                      setDirPage(1);
                    }}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-7 py-2 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Locations</option>
                    <option value="Phnom Penh">Phnom Penh</option>
                    <option value="Siem Reap">Siem Reap</option>
                    <option value="Sihanoukville">Sihanoukville</option>
                    <option value="Remote">Remote</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Role / Industry Select */}
                <div className="relative">
                  <Briefcase size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                  <select
                    value={dirRole}
                    onChange={(e) => {
                      setDirRole(e.target.value);
                      setDirPage(1);
                    }}
                    className="appearance-none bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-7 py-2 text-xs font-bold text-slate-700 focus:outline-none cursor-pointer"
                  >
                    <option value="All">All Roles</option>
                    <option value="Telecom">Telecom & Network</option>
                    <option value="Fintech">Fintech & Payments</option>
                    <option value="Banking">Banking & Finance</option>
                    <option value="Digital Services">Digital Services</option>
                    <option value="Technology">Technology & Cloud</option>
                  </select>
                  <ChevronDown size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>

                {/* Search Button (Dark Navy Pill with White Search Text & Icon) */}
                <button
                  type="button"
                  className="home-dir-search-btn bg-[#0f172a] hover:bg-black text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-xs"
                  style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                >
                  <Search size={13} style={{ color: '#ffffff', stroke: '#ffffff' }} />
                  <span style={{ color: '#ffffff' }} className="text-white font-bold">Search</span>
                </button>
              </div>

              {/* Company Rows (4 rows matching Ref Image 3) */}
              <div className="space-y-2.5 mb-4">
                {paginatedDirCompanies.map((comp) => (
                  <article
                    key={comp.id}
                    className="bg-white border border-slate-200/90 hover:border-slate-300 rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-xs transition-all"
                  >
                    {/* Left: Brand Logo & Information */}
                    <div className="flex items-start gap-3.5 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl border border-slate-100 bg-white p-1 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={comp.logo}
                          alt={comp.name}
                          className="max-h-full max-w-full object-contain select-none"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/sandbox-logo.png';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h3 className="text-sm font-bold text-slate-900 truncate">
                            <Link href={`/companies/${comp.id}`}>{comp.name}</Link>
                          </h3>
                          {comp.verified && (
                            <CheckCircle2 size={14} className="text-blue-600 fill-blue-600 text-white shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mb-1.5">
                          {comp.tagline}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          {comp.tags.map((tag) => (
                            <span key={tag} className="text-[10.5px] font-medium text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Middle: Location & Policy */}
                    <div className="flex sm:flex-col items-start gap-1 text-xs text-slate-500 shrink-0 sm:min-w-[140px]">
                      <span className="flex items-center gap-1 text-slate-600 font-medium text-xs">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{comp.location}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-500 text-[11px]">
                        <Briefcase size={12} className="text-slate-400" />
                        <span>{comp.workPolicy}</span>
                      </span>
                    </div>

                    {/* Right: Open Roles Pill Button & Chevron Circle */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/companies/${comp.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs transition"
                      >
                        <Users size={13} className="text-blue-600" />
                        <span>{comp.openJobsCount} Open Roles</span>
                      </Link>
                      <Link
                        href={`/companies/${comp.id}`}
                        className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-800 transition"
                        aria-label={`View ${comp.name}`}
                      >
                        <ChevronRight size={14} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-semibold text-slate-600">
                <span>
                  Showing {(dirPage - 1) * 4 + 1}–{Math.min(dirPage * 4, filteredDirCompanies.length)} of {filteredDirCompanies.length} companies
                </span>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    className="w-7 h-7 rounded border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                    disabled={dirPage === 1}
                    onClick={() => setDirPage((p) => Math.max(1, p - 1))}
                    aria-label="Previous page"
                  >
                    <ChevronLeft size={13} />
                  </button>

                  {Array.from({ length: totalDirPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      type="button"
                      className={`w-7 h-7 rounded text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                        dirPage === pageNum
                          ? 'bg-slate-900 text-white'
                          : 'border border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                      style={dirPage === pageNum ? { backgroundColor: '#0f172a', color: '#ffffff' } : {}}
                      onClick={() => setDirPage(pageNum)}
                    >
                      <span style={dirPage === pageNum ? { color: '#ffffff' } : {}} className={dirPage === pageNum ? 'text-white' : ''}>
                        {pageNum}
                      </span>
                    </button>
                  ))}

                  <button
                    type="button"
                    className="w-7 h-7 rounded border border-slate-200 text-slate-700 hover:bg-slate-100 disabled:opacity-40 flex items-center justify-center cursor-pointer"
                    disabled={dirPage === totalDirPages}
                    onClick={() => setDirPage((p) => Math.min(totalDirPages, p + 1))}
                    aria-label="Next page"
                  >
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* 6. LATEST OPPORTUNITIES (1 ROW CAROUSEL WITH 3 CARDS)          */}
      {/* ============================================================== */}
      <section id="opportunities-section" className="container max-w-7xl mx-auto px-4 sm:px-6 my-10">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 border-b-2 border-slate-900 pb-2 flex-1 mr-4">
            <span 
              className="text-[12.5px] font-black uppercase tracking-[0.14em] text-slate-950 select-none"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              LATEST OPPORTUNITIES
            </span>
            <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Skeuomorphic Carousel Navigation Arrows */}
            <button
              type="button"
              className={`w-8 h-8 rounded-lg border border-slate-300 bg-gradient-to-b from-white via-slate-50 to-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] flex items-center justify-center text-slate-700 hover:from-slate-50 hover:to-slate-200 active:shadow-inner active:translate-y-[1px] transition-all ${
                !oppCanScrollLeft ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={scrollOppPrev}
              disabled={!oppCanScrollLeft}
              aria-label="Previous internships"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className={`w-8 h-8 rounded-lg border border-slate-300 bg-gradient-to-b from-white via-slate-50 to-slate-200 shadow-[0_1px_3px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,1)] flex items-center justify-center text-slate-700 hover:from-slate-50 hover:to-slate-200 active:shadow-inner active:translate-y-[1px] transition-all ${
                !oppCanScrollRight ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
              }`}
              onClick={scrollOppNext}
              disabled={!oppCanScrollRight}
              aria-label="Next internships"
            >
              <ChevronRight size={16} />
            </button>
            <Link 
              href="/jobs" 
              className="text-xs font-bold text-slate-900 hover:text-blue-600 ml-2"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              View All →
            </Link>
          </div>
        </div>

        {/* Carousel Track with 3 visible cards */}
        <div className="relative overflow-hidden">
          <div
            ref={oppCarouselRef}
            onScroll={checkOppScroll}
            className="flex gap-5 overflow-x-auto scrollbar-none pb-4 scroll-smooth"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {squareOpportunities.map((opp) => (
              <article 
                key={opp.id} 
                className="w-[calc(100%-16px)] sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-14px)] shrink-0 bg-white border border-slate-200 rounded-xl overflow-hidden hover:border-slate-800 transition shadow-xs flex flex-col justify-between"
                style={{ scrollSnapAlign: 'start' }}
              >
                {/* Top Image Box */}
                <div className="relative aspect-[2.1/1] w-full bg-slate-900 overflow-hidden">
                  <img
                    src={opp.coverImage || 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'}
                    alt={opp.title || 'Career Opportunity'}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />

                  {/* Top-Right Circular Bookmark Button */}
                  <button
                    type="button"
                    className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-xs hover:scale-105 active:translate-y-[1px] transition"
                    aria-label="Save opportunity"
                  >
                    <Bookmark size={13} strokeWidth={2.2} />
                  </button>
                </div>

                {/* Card Body */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-1">
                  <div>
                    {/* Company Header Row */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div className="w-8 h-8 shrink-0 flex items-center justify-center bg-transparent">
                        <img
                          src={opp.companyLogo || opp.logo || '/images/sandbox-logo.png'}
                          alt={opp.company || 'Company'}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 truncate">{opp.company}</h4>
                        <div className="text-[11px] font-medium text-slate-500 truncate">
                          {opp.location?.split('/')[0].trim()} • {opp.workPolicy || (opp.remote ? 'Remote' : 'Hybrid')} • {((opp as any).typeLabel || opp.type || 'Full-Time').replace('Paid ', '')}
                        </div>
                      </div>
                    </div>

                    {/* Job Title */}
                    <h3 
                      className="text-[17px] font-black uppercase text-slate-900 group-hover:text-blue-600 line-clamp-2 leading-snug mb-3"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      <Link href={`/jobs/${opp.id}`}>
                        {opp.title}
                      </Link>
                    </h3>
                  </div>

                  {/* Compensation & Crisp High-Contrast Apply Button */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
                    <span className="text-xs font-extrabold text-slate-900 bg-slate-100 px-2.5 py-1 rounded">
                      {opp.salaryAmount || opp.salary || (opp.compensation ? (opp.compensation.startsWith('$') ? opp.compensation.split(' ')[0] : opp.compensation.split('/')[0].trim()) : '$6,200')} {opp.salaryPeriod || (opp.compensation?.includes('/ yr') ? '/ yr' : '/ mo')}
                    </span>

                    {/* High-Contrast Apply CTA (Crisp White Text Always Guaranteed) */}
                    <Link
                      href={`/jobs/${opp.id}`}
                      className="opp-apply-btn text-xs font-bold px-4 py-2 rounded-lg inline-flex items-center gap-1.5 transition-all text-white bg-blue-600 hover:bg-blue-700 active:translate-y-[1px] shadow-xs"
                      style={{ backgroundColor: '#2563eb', color: '#ffffff' }}
                    >
                      <span style={{ color: '#ffffff' }} className="text-white font-bold">Apply →</span>
                    </Link>
                  </div>
                </div>

              </article>
            ))}
          </div>
        </div>

      </section>

      {/* ============================================================== */}
      {/* 7. JOB ALERTS MODAL                                             */}
      {/* ============================================================== */}
      {showAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowAlertModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
            >
              <X size={18} />
            </button>

            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <Bell size={24} />
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-1">
              Never Miss a Career Opportunity
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Subscribe to personalized alerts for top tech, telecom, and fintech companies in Cambodia and worldwide.
            </p>

            {alertSubscribed ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold">
                ✓ You have successfully subscribed to company alerts!
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (alertEmail) setAlertSubscribed(true);
                }}
                className="space-y-3"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={alertEmail}
                  onChange={(e) => setAlertEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#0f172a] hover:bg-black text-white font-bold text-xs rounded-xl transition shadow-xs cursor-pointer"
                  style={{ backgroundColor: '#0f172a', color: '#ffffff' }}
                >
                  <span style={{ color: '#ffffff' }} className="text-white font-bold">Subscribe to Alerts</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
