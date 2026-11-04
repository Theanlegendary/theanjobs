import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'wouter';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  Sparkles,
  ArrowRight,
  Bookmark,
  Share2,
  Tag,
  GraduationCap,
  Laptop,
  ShieldCheck,
  Building2,
  Calendar,
  Users,
  ChevronDown,
  ChevronUp,
  UploadCloud,
  FileText,
  X,
  Send,
  Flag,
  Home as HomeIcon,
  Zap,
  TrendingUp,
  Award,
  DollarSign,
  Heart,
  Umbrella,
  Coffee,
  HelpCircle,
  ExternalLink,
  MessageSquare,
  Check,
  Compass,
  FileCheck2,
} from 'lucide-react';
import {
  getJobById,
  jobsDatabase,
  JobItem,
  getCompanyBySlug,
  companiesDatabase,
  CompanyProfile,
} from '@/data/portalData';
import { SEO, StructuredData, generateJobPostingSchema } from '@/lib/seo';
import './JobDetail.css';

export default function JobDetail() {
  const params = useParams<{ id?: string; slug?: string }>();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const rawId = params.id || params.slug || searchParams.get('id') || 'job-1';
  const jobId = decodeURIComponent(rawId);

  // Retrieve dynamic job from database
  const job: JobItem =
    getJobById(jobId) ||
    (params.slug ? getJobById(params.slug) : undefined) ||
    jobsDatabase.find((j) => j.id.toLowerCase() === jobId.toLowerCase()) ||
    jobsDatabase.find((j) => j.slug && j.slug.toLowerCase() === jobId.toLowerCase()) ||
    jobsDatabase.find((j) => j.id === 'job-1') ||
    jobsDatabase[0];

  // Retrieve dynamic company profile from database
  const company: CompanyProfile =
    getCompanyBySlug(job.companySlug) ||
    companiesDatabase.find(
      (c) =>
        c.slug.toLowerCase() === job.companySlug.toLowerCase() ||
        c.id.toLowerCase() === job.companySlug.toLowerCase()
    ) ||
    companiesDatabase.find((c) => c.slug === 'snap-inc') ||
    companiesDatabase[0];

  // UI Interactive States
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showInquiryModal, setShowInquiryModal] = useState(false);
  const [salaryPeriodMode, setSalaryPeriodMode] = useState<'annual' | 'monthly'>('annual');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // AI Fit Tool States
  const [aiUploadedFile, setAiUploadedFile] = useState<string | null>('Senior_PMM_Resume_Alex_Chen.pdf');
  const [aiMatchScore, setAiMatchScore] = useState<number>(94);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const aiFileInputRef = useRef<HTMLInputElement>(null);

  // Application Modal States
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantLinkedIn, setApplicantLinkedIn] = useState('');
  const [applicantNote, setApplicantNote] = useState('');
  const [appliedSuccess, setAppliedSuccess] = useState(false);
  const [appliedRefCode, setAppliedRefCode] = useState('');

  // Toast Notification
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3000);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setReadMore(false);
    setAppliedSuccess(false);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 380);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [jobId]);

  // Similar jobs calculation
  const similarJobs = jobsDatabase
    .filter((j) => j.id !== job.id)
    .slice(0, 3);

  // Team quote fallback
  const teamQuote = job.teamQuote || {
    text: `At ${company.shortName || company.name}, driving innovation in our domain alongside an elite team gives you immediate operational impact. There's real ownership and support to do your best work every day.`,
    author: company.quoteAuthor?.split('•')[0].trim() || 'Alex Tran',
    role: company.quoteAuthor?.split('•')[1]?.trim() || `Lead Product Management, ${company.shortName || company.name}`,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  };

  // Gallery fallback
  const galleryPhotos =
    company.photos && company.photos.length >= 6
      ? company.photos.slice(0, 6)
      : [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80',
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80',
        ];

  // Team face avatars
  const teamFaceAvatars = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=80&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=80&q=80',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=80&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=80&q=80',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=80&q=80',
  ];

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSaveToggle = () => {
    const next = !saved;
    setSaved(next);
    showToast(next ? 'Job saved to your bookmarks!' : 'Job removed from saved list.');
  };

  const handleAiCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setAiUploadedFile(file.name);
      setTimeout(() => {
        setIsAnalyzing(false);
        setAiMatchScore(96);
        showToast(`Analyzed ${file.name}: 96% Match Score!`);
      }, 700);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !applicantEmail) {
      alert('Please enter your full name and email address.');
      return;
    }
    const refCode = 'APP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const newApp = {
      id: 'app-' + Date.now(),
      refCode,
      jobId: job.id,
      jobTitle: job.title,
      company: job.company,
      location: job.location,
      salary: job.compensation,
      applicantName,
      applicantEmail,
      applicantPhone,
      status: 'Application Received',
      submittedAt: new Date().toISOString(),
    };

    try {
      const prev = JSON.parse(localStorage.getItem('thesandbox_applications') || '[]');
      localStorage.setItem('thesandbox_applications', JSON.stringify([newApp, ...prev]));
    } catch (err) {
      console.error(err);
    }

    setAppliedRefCode(refCode);
    setAppliedSuccess(true);
  };

  // FAQs
  const faqs = [
    {
      q: `What is the day-to-day culture like at ${company.name}?`,
      a: `Teams at ${company.name} operate with high autonomy, direct product ownership, and an experiment-driven mindset. Cross-functional syncs happen organically between product management, engineering, and data science.`,
    },
    {
      q: 'What is the compensation and equity structure?',
      a: `Compensation includes competitive base pay (${job.compensation}), annual performance bonuses (~15%), and equity grants (RSUs) with standard 4-year vesting and quarterly distribution.`,
    },
    {
      q: 'What does the hybrid work flexibility look like?',
      a: 'We embrace a 2-day in-office collaboration model with 3 days flexible remote work, plus an annual home-office and wellness budget.',
    },
    {
      q: 'What are the career growth and advancement paths?',
      a: `Annual promotion cycles, transparent career ladders from Lead to Principal/Director tracks, and sponsored leadership development programs.`,
    },
  ];

  return (
    <div className="job-detail-page-container">
      {/* SEO & Schema Metadata */}
      <SEO
        title={`${job.title} at ${job.company} — Job Details`}
        description={job.shortDesc || job.fullDesc?.substring(0, 160)}
        canonical={`${typeof window !== 'undefined' ? window.location.origin : ''}/jobs/${job.id}`}
        ogImage={company.logoImg || job.logo || '/sandbox-logo.png'}
        ogType="website"
        keywords={[job.title, job.company, job.location, 'Job Detail', 'Careers']}
      />

      <StructuredData
        data={generateJobPostingSchema({
          title: job.title,
          company: job.company,
          location: job.location,
          description: job.shortDesc || job.fullDesc || '',
          datePosted: new Date(Date.now() - 86400000 * 2).toISOString(),
          employmentType: 'FULL_TIME',
          salary: job.compensation,
          url: `${typeof window !== 'undefined' ? window.location.origin : ''}/jobs/${job.id}`,
        })}
      />

      {/* Floating Toast Notification */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 border border-slate-700/50 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle size={15} className="text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Sticky Bottom Apply Bar */}
      {isScrolled && (
        <aside className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl py-3 px-4 sm:px-8 transition-all animate-in fade-in duration-200" aria-label="Quick Application Toolbar">
          <div className="max-w-[1180px] mx-auto flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <img
                src={company.logoImg || job.logo || '/sandbox-logo.png'}
                alt={company.name}
                className="w-10 h-10 rounded-xl object-contain border border-slate-200 p-1 bg-white shrink-0 shadow-sm"
              />
              <div className="min-w-0">
                <h4 className="text-sm font-bold text-slate-900 truncate">{job.title}</h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span className="font-semibold text-blue-600">{company.name}</span>
                  <span>•</span>
                  <span>{job.location}</span>
                  <span>•</span>
                  <span className="font-bold text-slate-800">{job.compensation}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleSaveToggle}
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
              >
                <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-blue-600' : ''} />
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>
              <button
                type="button"
                onClick={() => setShowApplyModal(true)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900 hover:bg-blue-600 text-white text-xs font-extrabold shadow-lg hover:shadow-blue-500/25 transition-all transform active:scale-95 cursor-pointer"
              >
                <Send size={13} />
                <span>Easy Apply with CV</span>
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* ==================================================================== */}
      {/* 1. BREADCRUMBS BAR                                                   */}
      {/* ==================================================================== */}
      <nav className="builtin-breadcrumb-wrap" aria-label="Breadcrumb Bar">
        <div className="builtin-breadcrumb-inner flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Link href="/" className="hover:text-blue-600 font-medium transition">Home</Link>
            <span className="builtin-breadcrumb-sep text-slate-300">/</span>
            <Link href="/jobs" className="hover:text-blue-600 font-medium transition">Jobs</Link>
            <span className="builtin-breadcrumb-sep text-slate-300">/</span>
            <Link href={`/companies/${company.slug}`} className="hover:text-blue-600 font-medium transition">
              {company.shortName || company.name}
            </Link>
            <span className="builtin-breadcrumb-sep text-slate-300">/</span>
            <span className="builtin-breadcrumb-current truncate max-w-[260px] sm:max-w-md font-semibold text-slate-900">
              {job.title}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold cursor-pointer transition"
            >
              <Share2 size={13} />
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <button
              type="button"
              onClick={handleSaveToggle}
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-semibold cursor-pointer transition ${
                saved ? 'bg-blue-50 text-blue-600 border border-blue-200' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ==================================================================== */}
      {/* 2. MODERN ELEVATED 3-CARD HERO SECTION                               */}
      {/* ==================================================================== */}
      <section className="builtin-hero" aria-label="Job Overview and Action Hero">
        <div className="builtin-hero-inner">
          
          {/* Card 1: Identity & Role Scope */}
          <div className="builtin-hero-card hero-card-identity">
            <div>
              <div className="hero-brand-row">
                <div className="hero-brand-logo">
                  <img
                    src={company.logoImg || job.logo || '/sandbox-logo.png'}
                    alt={company.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/sandbox-logo.png';
                    }}
                  />
                </div>
                <Link href={`/companies/${company.slug}`} className="hero-brand-name">
                  <span>{company.name}</span>
                  <CheckCircle size={14} className="text-blue-600 shrink-0" fill="#2563eb" color="#ffffff" />
                </Link>
              </div>
              <h1 className="hero-job-title">{job.title}</h1>
            </div>
            <div className="hero-posted-time">
              <Clock size={13} />
              <span>{job.datePosted || job.timeAgo || 'Posted Recently'}</span>
            </div>
          </div>

          {/* Card 2: Operational Specifications & Compensation */}
          <div className="builtin-hero-card hero-card-specs">
            <div className="hero-applicant-pill">
              <span className="live-pulse-dot" />
              <span>Verified Direct Listing</span>
            </div>
            <div className="hero-specs-list">
              <div className="hero-spec-item">
                <span className="hero-spec-icon-box"><MapPin size={13} /></span>
                <span className="hero-spec-text">{job.location}</span>
              </div>
              <div className="hero-spec-item">
                <span className="hero-spec-icon-box"><Laptop size={13} /></span>
                <span className="hero-spec-text">{job.workplaceType || 'Hybrid'}</span>
              </div>
              <div className="hero-spec-item spec-salary">
                <span className="hero-spec-icon-box"><DollarSign size={13} /></span>
                <span className="hero-spec-text font-bold text-emerald-600">
                  {job.compensation} {job.salaryPeriod || 'Annually'}
                </span>
              </div>
              <div className="hero-spec-item">
                <span className="hero-spec-icon-box"><GraduationCap size={13} /></span>
                <span className="hero-spec-text">{job.seniority || 'Mid-Senior Level'}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Action & Category Tagline */}
          <div className="builtin-hero-card hero-card-trust">
            <div>
              <div className="hero-categories-text">
                {job.department || 'Technology • Strategy • Operations'}
              </div>
              <div className="hero-tagline-text">
                {company.name} &mdash; {company.industry || 'Accredited Industry Enterprise'}
              </div>
            </div>
            <div className="hero-trust-badge">
              <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
              <span>Direct employer transmission • 100% verified employer</span>
            </div>
          </div>

        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. BUILT IN 2-COLUMN MAIN SECTION                                    */}
      {/* ==================================================================== */}
      <main className="builtin-layout">
        
        {/* ================================================================== */}
        {/* LEFT COLUMN: Role Details, Description, Features, Culture          */}
        {/* ================================================================== */}
        <div className="builtin-column">
          
          {/* Section 1: The Role */}
          <div className="builtin-card" id="card-the-role">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box"><Briefcase size={16} /></span>
                <span>The Role</span>
              </div>
              <span className="badge-soft-blue">Active Opening</span>
            </div>
            <div className="builtin-card-body">
              <p className="role-summary-p">
                {job.shortDesc ||
                  'Join a market-leading enterprise managing end-to-end operational execution, carrier strategy, and high-impact account growth across global trade corridors.'}
              </p>
              <div className="role-generated-tag">
                <Sparkles size={13} className="text-blue-500" />
                <span>Role Summary Curated by Built In &amp; SandBox Intelligence</span>
              </div>

              {/* Action Buttons */}
              <div className="role-actions-row">
                <button
                  type="button"
                  className="btn-builtin-apply"
                  onClick={() => setShowApplyModal(true)}
                >
                  <Send size={15} />
                  <span>Easy Apply with CV</span>
                </button>
                <button
                  type="button"
                  className="btn-builtin-save"
                  onClick={handleSaveToggle}
                >
                  <Bookmark size={15} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-blue-600' : ''} />
                  <span>{saved ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  type="button"
                  className="btn-builtin-share"
                  onClick={handleShare}
                >
                  <Share2 size={15} />
                  <span>Share</span>
                </button>
              </div>

              <div className="role-detailed-content">
                <p className="desc-body-p">
                  {job.fullDesc ||
                    `${company.name} is one of the industry's premier tech and operational organizations. We drive innovation, product measurement, and cross-functional solutions connecting millions of users worldwide.`}
                </p>

                <div className="desc-subheading">Job Summary</div>
                <p className="desc-body-p">
                  Responsible for leading strategic product marketing, driving scalable product &amp; measurement decisions, and collaborating closely with cross-functional partners across engineering, product, and leadership.
                </p>

                <div className="desc-subheading">Job Description &amp; Core Responsibilities</div>
                <ul className="desc-bullets-list">
                  {job.responsibilities && job.responsibilities.length > 0 ? (
                    job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)
                  ) : (
                    <>
                      <li>Partner with product and technical leads to define, execute, and deliver high-impact measurement solutions.</li>
                      <li>Manage complex operational frameworks, performance analytics, and risk mitigation.</li>
                      <li>Act as direct strategic escalation lead for Tier-1 multinational accounts and initiatives.</li>
                      <li>Supervise go-to-market execution, client alpha/beta tests, and continuous product iteration.</li>
                    </>
                  )}
                </ul>

                {/* Read Full Description Expandable Area */}
                <div className={`desc-expandable-section ${readMore ? 'expanded' : ''}`}>
                  <div className="desc-subheading">Why This Role Matters</div>
                  <p className="desc-body-p">
                    In this position, you will operate at the nexus of technology, business strategy, and user satisfaction. You will shape our next-generation architecture while mentoring team members and establishing industry-wide best practices.
                  </p>
                  <div className="desc-subheading">Additional Qualifications</div>
                  <ul className="desc-bullets-list">
                    <li>Demonstrated track record of delivering measurable outcomes in complex, matrixed environments.</li>
                    <li>Exceptional communication skills with the ability to synthesize technical data for executive stakeholders.</li>
                    <li>Familiarity with modern enterprise development tools, tracking suites, and privacy-safe frameworks.</li>
                  </ul>
                </div>

                <button
                  type="button"
                  className="btn-read-more-toggle"
                  onClick={() => setReadMore(!readMore)}
                >
                  <span>{readMore ? 'Read Less Description' : 'Read Full Description'}</span>
                  {readMore ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
              </div>
            </div>
          </div>

          {/* NEW FEATURE 1: Interactive Compensation & Equity Breakdown */}
          <div className="builtin-card" id="card-compensation">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-emerald-600 bg-emerald-50"><DollarSign size={16} /></span>
                <span>Compensation &amp; Total Rewards Breakdown</span>
              </div>
              <div className="salary-toggle-pills">
                <button
                  type="button"
                  className={`salary-toggle-pill ${salaryPeriodMode === 'annual' ? 'active' : ''}`}
                  onClick={() => setSalaryPeriodMode('annual')}
                >
                  Annual
                </button>
                <button
                  type="button"
                  className={`salary-toggle-pill ${salaryPeriodMode === 'monthly' ? 'active' : ''}`}
                  onClick={() => setSalaryPeriodMode('monthly')}
                >
                  Monthly
                </button>
              </div>
            </div>
            <div className="builtin-card-body">
              {/* Visual Salary Range Slider */}
              <div className="comp-range-block">
                <div className="comp-range-top">
                  <span className="comp-range-lbl">Base Salary Range (75th Percentile)</span>
                  <strong className="comp-range-val text-emerald-600">
                    {salaryPeriodMode === 'annual' ? '$162,000 – $284,000 / yr' : '$13,500 – $23,666 / mo'}
                  </strong>
                </div>
                <div className="comp-range-bar-track">
                  <div className="comp-range-bar-fill" style={{ width: '80%' }} />
                  <div className="comp-range-bar-marker" style={{ left: '55%' }}>
                    <span className="marker-tip">Median $223K</span>
                  </div>
                </div>
                <div className="comp-range-ticks">
                  <span>Entry: $162K</span>
                  <span>Target: $223K</span>
                  <span>Ceiling: $284K</span>
                </div>
              </div>

              {/* 3 Component Breakdown Cards */}
              <div className="comp-cards-grid">
                <div className="comp-sub-card">
                  <span className="comp-sub-label">Base Salary</span>
                  <strong className="comp-sub-val">{salaryPeriodMode === 'annual' ? '$162K - $284K' : '$13.5K - $23.6K'}</strong>
                  <span className="comp-sub-note">Direct bi-weekly payroll</span>
                </div>
                <div className="comp-sub-card">
                  <span className="comp-sub-label">Estimated Equity (RSUs)</span>
                  <strong className="comp-sub-val">{salaryPeriodMode === 'annual' ? '$65,000 / yr' : '$5,417 / mo'}</strong>
                  <span className="comp-sub-note">4-yr standard vesting schedule</span>
                </div>
                <div className="comp-sub-card">
                  <span className="comp-sub-label">Target Bonus</span>
                  <strong className="comp-sub-val">{salaryPeriodMode === 'annual' ? '15% (~$33.4K)' : '~$2,787 / mo'}</strong>
                  <span className="comp-sub-note">Paid bi-annually on KPIs</span>
                </div>
              </div>

              <div className="comp-footer-highlight">
                <TrendingUp size={16} className="text-emerald-500 shrink-0" />
                <span>
                  <strong>Total Package Estimate:</strong> {salaryPeriodMode === 'annual' ? '~$321,450 / year' : '~$26,787 / month'} (Top 10% benchmark for product marketing in metro tech hubs).
                </span>
              </div>
            </div>
          </div>

          {/* NEW FEATURE 2: 4-Stage Interview Journey Roadmap */}
          <div className="builtin-card" id="card-interview-roadmap">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-blue-600 bg-blue-50"><Compass size={16} /></span>
                <span>Hiring Journey &amp; Interview Roadmap</span>
              </div>
              <span className="badge-soft-green">Avg: 2–3 Weeks</span>
            </div>
            <div className="builtin-card-body">
              <p className="text-xs text-slate-500 mb-4">
                Transparent hiring process designed to respect your time and provide comprehensive insights into our team.
              </p>

              <div className="interview-steps-pipeline">
                <div className="interview-step-cell">
                  <div className="step-number-bubble">1</div>
                  <div className="step-cell-content">
                    <strong className="step-cell-title">Recruiter Screen</strong>
                    <span className="step-cell-duration">30 min video call</span>
                    <p className="step-cell-desc">Overview of role scope, career aspirations, culture alignment, and total compensation expectations.</p>
                  </div>
                </div>

                <div className="interview-step-cell">
                  <div className="step-number-bubble">2</div>
                  <div className="step-cell-content">
                    <strong className="step-cell-title">Hiring Manager Deep Dive</strong>
                    <span className="step-cell-duration">45 min video call</span>
                    <p className="step-cell-desc">Discussion of measurement frameworks, attribution methodologies, and past project architecture.</p>
                  </div>
                </div>

                <div className="interview-step-cell">
                  <div className="step-number-bubble">3</div>
                  <div className="step-cell-content">
                    <strong className="step-cell-title">Cross-Functional Panel</strong>
                    <span className="step-cell-duration">3 × 45 min virtual panel</span>
                    <p className="step-cell-desc">Meet partners across Product, Data Science, and Engineering for interactive problem-solving.</p>
                  </div>
                </div>

                <div className="interview-step-cell">
                  <div className="step-number-bubble">4</div>
                  <div className="step-cell-content">
                    <strong className="step-cell-title">Executive Alignment &amp; Offer</strong>
                    <span className="step-cell-duration">1–2 business days</span>
                    <p className="step-cell-desc">Final conversation with team leadership, package presentation, and collaborative start planning.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Skills Required */}
          <div className="builtin-card" id="card-skills">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-indigo-600 bg-indigo-50"><Award size={16} /></span>
                <span>Skills &amp; Qualifications</span>
              </div>
            </div>
            <div className="builtin-card-body">
              <ul className="desc-bullets-list mb-4">
                {job.requirements && job.requirements.length > 0 ? (
                  job.requirements.map((req, i) => <li key={i}>{req}</li>)
                ) : (
                  <>
                    <li>Demonstrated proficiency in Product Marketing, Measurement, Attribution, and SQL.</li>
                    <li>3+ years of professional experience in a related tech discipline.</li>
                    <li>Strong problem-solving capability, technical rigor, and clear communication skills.</li>
                    <li>Experience operating in fast-paced collaborative environments with cross-functional teams.</li>
                  </>
                )}
              </ul>

              <div className="skills-tags-cluster">
                {(job.skills || ['Product Marketing', 'Measurement', 'Attribution', 'SQL', 'GTM Strategy', 'Analytics']).map((skill, i) => (
                  <span key={i} className="skill-pill-chip">
                    <Check size={12} className="text-blue-600" />
                    <span>{skill}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: What The Team Is Saying */}
          <div className="builtin-card" id="card-team-saying">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-amber-600 bg-amber-50"><MessageSquare size={16} /></span>
                <span>What The Team Is Saying</span>
              </div>
            </div>
            <div className="builtin-card-body">
              <div className="quote-box-wrap">
                <div className="quote-white-card">
                  <p className="quote-text-p">&ldquo;{teamQuote.text}&rdquo;</p>
                </div>
                <div className="quote-author-row">
                  <img
                    src={teamQuote.avatar}
                    alt={teamQuote.author}
                    className="quote-author-avatar-img"
                  />
                  <div className="quote-author-info">
                    <strong className="quote-author-name">{teamQuote.author}</strong>
                    <span className="quote-author-role">{teamQuote.role}</span>
                  </div>
                </div>
              </div>

              {/* Team Face Avatars */}
              <div className="team-faces-row">
                <span className="team-faces-label">Join 88+ team members hiring this quarter:</span>
                <div className="team-faces-cluster">
                  {teamFaceAvatars.map((url, i) => (
                    <img key={i} src={url} alt={`Teammate ${i}`} className="team-face-thumb" />
                  ))}
                  <span className="team-faces-more">+82</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 4: Compensation & Benefits Highlights Grid */}
          <div className="builtin-card" id="card-benefits">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-rose-600 bg-rose-50"><Heart size={16} /></span>
                <span>{company.name} Benefits &amp; Perks Highlights</span>
              </div>
            </div>
            <div className="builtin-card-body">
              <div className="benefits-cards-grid">
                <div className="benefit-cell">
                  <div className="benefit-icon-box text-rose-500"><Heart size={18} /></div>
                  <div>
                    <strong className="benefit-cell-title">Comprehensive Healthcare</strong>
                    <p className="benefit-cell-desc">100% employer-covered medical, dental, vision, and mental wellness coverage.</p>
                  </div>
                </div>

                <div className="benefit-cell">
                  <div className="benefit-icon-box text-emerald-500"><DollarSign size={18} /></div>
                  <div>
                    <strong className="benefit-cell-title">401(k) Match &amp; Equity</strong>
                    <p className="benefit-cell-desc">6% dollar-for-dollar 401(k) match with immediate vesting, plus annual RSU equity refreshes.</p>
                  </div>
                </div>

                <div className="benefit-cell">
                  <div className="benefit-icon-box text-blue-500"><Laptop size={18} /></div>
                  <div>
                    <strong className="benefit-cell-title">Flexible Hybrid Work</strong>
                    <p className="benefit-cell-desc">2 days collaborative office time, 3 days remote, plus $1,500 home office tech stipend.</p>
                  </div>
                </div>

                <div className="benefit-cell">
                  <div className="benefit-icon-box text-amber-500"><GraduationCap size={18} /></div>
                  <div>
                    <strong className="benefit-cell-title">Learning &amp; Conferences</strong>
                    <p className="benefit-cell-desc">$2,500 annual budget for industry conferences, certifications, and advanced courses.</p>
                  </div>
                </div>

                <div className="benefit-cell">
                  <div className="benefit-icon-box text-purple-500"><Coffee size={18} /></div>
                  <div>
                    <strong className="benefit-cell-title">16 Weeks Paid Parental Leave</strong>
                    <p className="benefit-cell-desc">Generous paid bonding leave for all new parents, plus baby bonding support stipends.</p>
                  </div>
                </div>

                <div className="benefit-cell">
                  <div className="benefit-icon-box text-indigo-500"><Umbrella size={18} /></div>
                  <div>
                    <strong className="benefit-cell-title">Unlimited PTO &amp; Recharges</strong>
                    <p className="benefit-cell-desc">Flexible paid time off with mandatory company-wide recharge days each quarter.</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <Link
                  href={`/companies/${company.slug}`}
                  className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                >
                  <span>Learn more about {company.name}'s Culture &amp; Careers</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

          {/* Section 5: Company Insights FAQ Accordion */}
          <div className="builtin-card" id="card-insights">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-sky-600 bg-sky-50"><HelpCircle size={16} /></span>
                <span>{company.name} Insights &amp; FAQs</span>
              </div>
            </div>
            <div className="builtin-card-body">
              <div className="faq-accordion-list">
                {faqs.map((f, i) => (
                  <div key={i} className="faq-accordion-item">
                    <button
                      type="button"
                      className="faq-accordion-btn"
                      onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
                    >
                      <span className="faq-question-text">{f.q}</span>
                      {openFaqIndex === i ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                    </button>
                    {openFaqIndex === i && (
                      <div className="faq-answer-panel">
                        <p>{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="insights-footer-links">
                <Link href={`/jobs?company=${encodeURIComponent(company.name)}`} className="insight-link-row">
                  <Briefcase size={14} />
                  <span>View all open roles at {company.name} ({company.jobsCount || 88})</span>
                </Link>
                <Link href={`/companies/${company.slug}`} className="insight-link-row">
                  <Building2 size={14} />
                  <span>View {company.name} Full Profile &amp; Tech Stack</span>
                </Link>
                <button
                  type="button"
                  onClick={() => showToast('Listing reported to editorial desk.')}
                  className="insight-link-row text-slate-400 hover:text-slate-600"
                >
                  <Flag size={14} />
                  <span>Report this Job Listing</span>
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* ================================================================== */}
        {/* RIGHT COLUMN: AI Fit, Company Bio, Recruiter, Similar Jobs        */}
        {/* ================================================================== */}
        <div className="builtin-column">
          
          {/* Card 1: Interactive AI Resume & Fit Analyzer */}
          <div className="builtin-card" id="card-ai-fit">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-blue-600 bg-blue-50"><Sparkles size={16} /></span>
                <span>Am I A Good Fit?</span>
              </div>
              <span className="badge-soft-blue">AI Beta</span>
            </div>
            <div className="builtin-card-body">
              <p className="text-xs text-slate-500 mb-3">
                Our AI-powered engine compares your experience against this role's measurement and attribution requirements.
              </p>

              {/* Match Score Display */}
              <div className="ai-score-card">
                <div className="ai-score-donut">
                  <span className="ai-score-number">{aiMatchScore}%</span>
                  <span className="ai-score-label">MATCH</span>
                </div>
                <div className="ai-score-text">
                  <strong className="text-sm text-slate-900 block font-bold">Strong Candidate Fit</strong>
                  <span className="text-xs text-slate-500">
                    Your background strongly aligns with Product Marketing, Attribution, and Cross-functional GTM.
                  </span>
                </div>
              </div>

              {/* AI Key Insights Breakdown */}
              <div className="ai-criteria-list">
                <div className="ai-criterion-row positive">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span>5+ years Product Marketing &amp; GTM experience</span>
                </div>
                <div className="ai-criterion-row positive">
                  <CheckCircle size={14} className="text-emerald-500 shrink-0" />
                  <span>Attribution models &amp; SQL data analysis verified</span>
                </div>
                <div className="ai-criterion-row tip">
                  <Zap size={14} className="text-amber-500 shrink-0" />
                  <span>Bonus: Highlight any incrementality lift test cases</span>
                </div>
              </div>

              {/* Resume File Selector / Upload */}
              <input
                ref={aiFileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                style={{ display: 'none' }}
                onChange={handleAiCvUpload}
              />

              <div
                className="ai-dropzone-box"
                onClick={() => aiFileInputRef.current?.click()}
              >
                <UploadCloud size={20} className="text-blue-500 mb-1" />
                <span className="text-xs font-bold text-slate-800">
                  {isAnalyzing ? 'Analyzing Resume...' : (aiUploadedFile || 'Click to Upload Different Resume')}
                </span>
                <span className="text-[11px] text-slate-400">PDF, DOCX up to 10MB</span>
              </div>
            </div>
          </div>

          {/* Card 2: The Company Overview */}
          <div className="builtin-card" id="card-company">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-slate-700 bg-slate-100"><Building2 size={16} /></span>
                <span>The Company</span>
              </div>
            </div>
            <div className="builtin-card-body">
              {/* Quick Specs Grid */}
              <div className="company-specs-grid">
                <div className="co-spec-pill">
                  <MapPin size={13} className="text-blue-500" />
                  <span>HQ: {company.hq || 'Santa Monica, CA'}</span>
                </div>
                <div className="co-spec-pill">
                  <Calendar size={13} className="text-blue-500" />
                  <span>Founded: {company.founded || 2011}</span>
                </div>
                <div className="co-spec-pill">
                  <Users size={13} className="text-blue-500" />
                  <span>{company.size || '5,300+ Members'}</span>
                </div>
              </div>

              <div className="desc-subheading mt-3">What We Do</div>
              <p className="desc-body-p">
                {company.desc ||
                  'Teams experiment at the intersection of computer vision, augmented reality, and large-scale consumer infrastructure powering communication for hundreds of millions worldwide.'}
              </p>

              <div className="desc-subheading">Gallery</div>
              <div className="company-gallery-grid">
                {galleryPhotos.map((src, i) => (
                  <div key={i} className="gallery-thumb-wrap">
                    <img src={src} alt={`${company.name} office ${i + 1}`} className="gallery-thumb-img" />
                  </div>
                ))}
              </div>

              <div className="company-office-footer">
                <div>
                  <strong className="text-xs font-bold text-slate-800 block">{company.name} Headquarters &amp; Hubs</strong>
                  <span className="text-[11.5px] text-slate-500">Accredited Tech Campus • 9 Global Facilities</span>
                </div>
                <Link href={`/companies/${company.slug}`} className="text-xs font-bold text-blue-600 hover:text-blue-800">
                  Profile &rarr;
                </Link>
              </div>
            </div>
          </div>

          {/* NEW FEATURE 3: Meet The Hiring Team Spotlight */}
          <div className="builtin-card" id="card-recruiter">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-violet-600 bg-violet-50"><Users size={16} /></span>
                <span>Meet the Hiring Team</span>
              </div>
              <span className="badge-soft-green">Active Recruiter</span>
            </div>
            <div className="builtin-card-body">
              <div className="flex items-center gap-3.5 mb-3">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=140&q=80"
                  alt="Sarah Jenkins"
                  className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                />
                <div>
                  <strong className="text-sm font-bold text-slate-900 block">Sarah Jenkins</strong>
                  <span className="text-xs text-slate-500">Staff Talent Partner @ {company.name}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mb-3 space-y-1">
                <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                  <CheckCircle size={13} />
                  <span>Typically replies in less than 24 hours</span>
                </div>
                <p className="text-[11.5px] text-slate-500">
                  &ldquo;I'm actively reviewing portfolios for this role. Feel free to submit with your CV or reach out with any questions!&rdquo;
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowInquiryModal(true)}
                className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare size={14} />
                <span>Ask a Question About This Role</span>
              </button>
            </div>
          </div>

          {/* Card 4: Similar Jobs */}
          <div className="builtin-card" id="card-similar-jobs">
            <div className="builtin-card-header">
              <div className="card-header-title-lockup">
                <span className="card-header-icon-box text-slate-700 bg-slate-100"><Briefcase size={16} /></span>
                <span>Similar Jobs You May Like</span>
              </div>
            </div>
            <div className="builtin-card-body p-0">
              <div className="similar-jobs-list">
                {similarJobs.map((sim) => (
                  <Link
                    key={sim.id}
                    href={`/jobs/${sim.id}`}
                    className="similar-job-card-row group"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-blue-600 block mb-0.5">{sim.company}</span>
                      <h5 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition truncate">
                        {sim.title}
                      </h5>
                      <span className="text-[11px] text-slate-400 block mt-1">
                        {sim.location} • {sim.workplaceType || 'Hybrid'}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-xs font-black text-slate-800 block">
                        {sim.compensation}
                      </span>
                      <span className="text-[10px] text-slate-400">Annually</span>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="p-3 text-center border-t border-slate-100">
                <Link href="/jobs" className="text-xs font-bold text-blue-600 hover:text-blue-800 inline-flex items-center gap-1">
                  <span>Browse 1,200+ More Tech Jobs</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* ==================================================================== */}
      {/* 4. MODAL: EASY APPLY WITH CV                                         */}
      {/* ==================================================================== */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => {
                setShowApplyModal(false);
                setAppliedSuccess(false);
              }}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            {appliedSuccess ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-2">Application Submitted!</h3>
                <p className="text-xs text-slate-600 mb-4 max-w-sm mx-auto">
                  Your application for <strong>{job.title}</strong> at <strong>{company.name}</strong> was directly transmitted to the hiring team.
                </p>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 mb-6">
                  Reference ID: <strong>{appliedRefCode}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => setShowApplyModal(false)}
                  className="w-full py-3 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-blue-600 transition"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <span className="text-xs font-bold text-blue-600 uppercase tracking-wide block mb-1">
                    {company.name}
                  </span>
                  <h3 className="text-lg font-black text-slate-900">
                    Apply for {job.title}
                  </h3>
                  <span className="text-xs text-slate-500">{job.location} • {job.compensation}</span>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Chen"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="alex.chen@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 019-2834"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">LinkedIn or Portfolio URL</label>
                    <input
                      type="url"
                      placeholder="https://linkedin.com/in/alexchen"
                      value={applicantLinkedIn}
                      onChange={(e) => setApplicantLinkedIn(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Resume / CV Attachment</label>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-blue-600" />
                        <span className="font-semibold text-slate-800">{aiUploadedFile || 'Senior_PMM_Resume.pdf'}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">Attached</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Cover Note (Optional)</label>
                    <textarea
                      rows={3}
                      placeholder="Brief note to the hiring manager on why this role is the ideal next step..."
                      value={applicantNote}
                      onChange={(e) => setApplicantNote(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-xs shadow-lg transition-all cursor-pointer"
                    >
                      Submit Application Now &rarr;
                    </button>
                    <p className="text-[10.5px] text-slate-400 text-center mt-2">
                      🔒 Direct encryption: Your application details are never sold or shared publicly.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL: ASK RECRUITER A QUESTION */}
      {showInquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl relative border border-slate-100">
            <button
              type="button"
              onClick={() => setShowInquiryModal(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X size={18} />
            </button>

            <h3 className="text-base font-black text-slate-900 mb-1">Message Sarah Jenkins</h3>
            <span className="text-xs text-slate-500 block mb-4">Staff Talent Partner @ {company.name}</span>

            <textarea
              rows={4}
              placeholder="Ask about team structure, compensation, work style, or growth opportunities..."
              className="w-full p-3 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none mb-3"
            />

            <button
              type="button"
              onClick={() => {
                setShowInquiryModal(false);
                showToast('Message sent to recruiter Sarah Jenkins!');
              }}
              className="w-full py-2.5 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              Send Message
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
