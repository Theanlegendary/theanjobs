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
  BarChart2,
  ChevronRight,
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
  const params = useParams<{ id?: string }>();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const rawId = params.id || searchParams.get('id') || 'job-1';
  const jobId = decodeURIComponent(rawId);

  // Retrieve dynamic job from database
  const job: JobItem =
    getJobById(jobId) ||
    jobsDatabase.find((j) => j.id.toLowerCase() === jobId.toLowerCase()) ||
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
    companiesDatabase.find((c) => c.slug === 'viconship') ||
    companiesDatabase[0];

  // UI Interactive States
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [showApplyModal, setShowApplyModal] = useState(false);

  // AI Fit Tool States
  const [aiUploadedFile, setAiUploadedFile] = useState<string | null>(null);
  const [aiMatchScore, setAiMatchScore] = useState<number | null>(null);
  const aiFileInputRef = useRef<HTMLInputElement>(null);

  // Application Modal States
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [applicantMessage, setApplicantMessage] = useState('');
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
    setAiUploadedFile(null);
    setAiMatchScore(null);
    setAppliedSuccess(false);
  }, [jobId]);

  // Similar jobs calculation
  const similarJobs = jobsDatabase
    .filter((j) => j.id !== job.id)
    .slice(0, 3);

  // Team quote fallback
  const teamQuote = job.teamQuote || {
    text: `At ${company.shortName || company.name}, managing operations and cross-border initiatives alongside an elite team gives you immediate impact. There is real pride in driving industry excellence every day.`,
    author: company.quoteAuthor?.split('·')[0].trim() || 'Nguyen Minh Tri',
    role: company.quoteAuthor?.split('·')[1]?.trim() || `Director of Operations, ${company.shortName || company.name}`,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
  };

  // Gallery fallback
  const galleryPhotos =
    company.photos && company.photos.length >= 6
      ? company.photos.slice(0, 6)
      : [
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=350&q=80',
          'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=350&q=80',
          'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=350&q=80',
          'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=350&q=80',
          'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=350&q=80',
          'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=350&q=80',
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
      setAiUploadedFile(file.name);
      setAiMatchScore(94);
      showToast(`Analyzed ${file.name}: 94% Match Score!`);
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
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-lg shadow-xl flex items-center gap-2 animate-bounce">
          <CheckCircle size={15} className="text-emerald-400" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* ==================================================================== */}
      {/* 1. BREADCRUMBS BAR                                                   */}
      {/* ==================================================================== */}
      <div className="builtin-breadcrumb-wrap" aria-label="Breadcrumb Bar">
        <div className="builtin-breadcrumb-inner flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-blue-600 transition">Home</Link>
            <span className="builtin-breadcrumb-sep">&rsaquo;</span>
            <Link href="/jobs" className="hover:text-blue-600 transition">Jobs</Link>
            <span className="builtin-breadcrumb-sep">&rsaquo;</span>
            <Link href={`/companies/${company.slug}`} className="hover:text-blue-600 transition">
              {company.shortName || company.name}
            </Link>
            <span className="builtin-breadcrumb-sep">&rsaquo;</span>
            <span className="builtin-breadcrumb-current truncate max-w-[260px] sm:max-w-md">
              {job.title}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <Share2 size={13} />
              <span>{copied ? 'Link Copied' : 'Share'}</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={handleSaveToggle}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
            >
              <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-blue-600' : ''} />
              <span>{saved ? 'Saved' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 2. BUILT IN FLAGSHIP HERO SECTION                                     */}
      {/* ==================================================================== */}
      <section className="builtin-hero" aria-label="Job Overview and Action Hero">
        <div className="flagship-hero-container">
          <div className="flagship-job-card">
            
            {/* Top Row: Logo Box, Company Meta, New Badge & Bookmark */}
            <div className="flagship-top-row">
              <div className="flagship-brand-group">
                <div className="flagship-logo-box">
                  <img
                    src={company.logoImg || job.logo || '/sandbox-logo.png'}
                    alt={company.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/sandbox-logo.png';
                    }}
                  />
                </div>
                <div className="flagship-company-meta">
                  <div className="flagship-company-name-row">
                    <Link href={`/companies/${company.slug}`} className="flagship-company-name">
                      {company.name}
                    </Link>
                    <span className="flagship-verified-badge" title="Verified Employer">
                      <CheckCircle size={15} fill="#0A66C2" color="#ffffff" className="shrink-0" />
                    </span>
                  </div>
                  <div className="flagship-company-sub">
                    <span>{job.department || company.industry || 'M&E Engineering'}</span>
                    <span className="sub-dot">•</span>
                    <span>{company.size || company.employees || '500–1,000 employees'}</span>
                  </div>
                </div>
              </div>

              <div className="flagship-top-actions">
                <span className="flagship-badge-new">
                  <span className="new-dot" />
                  New
                </span>
                <button
                  type="button"
                  onClick={handleSaveToggle}
                  className={`flagship-save-btn ${saved ? 'saved' : ''}`}
                  title={saved ? 'Remove from saved' : 'Save job'}
                >
                  <Bookmark size={18} fill={saved ? '#0052cc' : 'none'} className={saved ? 'text-blue-600' : ''} />
                </button>
              </div>
            </div>

            {/* Main Job Title */}
            <h1 className="flagship-job-title">{job.title}</h1>

            {/* Attributes Strip with | dividers */}
            <div className="flagship-specs-strip">
              <div className="flagship-spec-cell">
                <MapPin size={15} className="spec-icon" />
                <span>{job.location}</span>
              </div>
              <span className="flagship-pipe">|</span>
              <div className="flagship-spec-cell">
                <Briefcase size={15} className="spec-icon" />
                <span>{job.workplaceType || 'On-site'}</span>
              </div>
              <span className="flagship-pipe">|</span>
              <div className="flagship-spec-cell">
                <BarChart2 size={15} className="spec-icon" />
                <span>{job.seniority || 'Senior Specialist'}</span>
              </div>
            </div>

            {/* Bottom Row: Salary & Posted Date | Apply Now Button */}
            <div className="flagship-bottom-row">
              <div className="flagship-bottom-left">
                <div className="flagship-salary-cell">
                  <svg className="flagship-sack-icon" viewBox="0 0 576 512" width="16" height="16" fill="#0052cc">
                    <path d="M576 224c0-35.3-28.7-64-64-64h-80v-48c0-61.9-50.1-112-112-112h-64C194.1 0 144 50.1 144 112v48H64C28.7 160 0 188.7 0 224v224c0 35.3 28.7 64 64 64h448c35.3 0 64-28.7 64-64V224zM256 64h64c26.5 0 48 21.5 48 48v48H208v-48c0-26.5 21.5-48 48-48zm32 352c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"/>
                  </svg>
                  <strong className="flagship-salary-text">
                    {job.compensation} {job.salaryPeriod && !job.compensation.includes('/') ? job.salaryPeriod : ''}
                  </strong>
                </div>
                <span className="flagship-pipe">|</span>
                <div className="flagship-posted-cell">
                  <Clock size={15} className="spec-icon" />
                  <span>{job.datePosted ? (job.datePosted.includes('•') ? job.datePosted : `${job.datePosted} • 2d ago`) : 'Posted recently • 2d ago'}</span>
                </div>
              </div>

              <div className="flagship-bottom-right">
                <button
                  type="button"
                  onClick={() => setShowApplyModal(true)}
                  className="flagship-apply-btn"
                >
                  <span>Apply Now</span>
                  <ChevronRight size={17} strokeWidth={2.5} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. BUILT IN 2-COLUMN MAIN SECTION                                    */}
      {/* ==================================================================== */}
      <main className="builtin-layout">
        
        {/* ================================================================== */}
        {/* LEFT COLUMN: Role Details, Description, Skills, Culture            */}
        {/* ================================================================== */}
        <div className="builtin-column">
          
          {/* Section 1: The Role */}
          <div className="builtin-card" id="card-the-role">
            <div className="builtin-card-header">
              <span>The Role</span>
            </div>
            <div className="builtin-card-body">
              <p className="role-summary-p">
                {job.shortDesc ||
                  'Join a market-leading enterprise managing end-to-end operational execution, carrier strategy, and high-impact account growth across Southeast Asia and global trade lanes.'}
              </p>
              <div className="role-generated-tag">
                &mdash; Summary Generated by Built In &amp; SandBox Intelligence &mdash;
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
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '14px', marginTop: '6px' }}>
                <p className="desc-body-p">
                  {job.fullDesc ||
                    `${company.name} is one of Vietnam's leading integrated operators. We drive multimodal execution, supply chain optimization, and enterprise services connecting Vietnam with major world trade lanes.`}
                </p>

                <div className="desc-subheading">Job Summary</div>
                <p className="desc-body-p">
                  Responsible for managing end-to-end execution, enterprise partner contracts, operational dispatch, and customer delivery across regional and global corridors.
                </p>

                <div className="desc-subheading">Job Description &amp; Core Responsibilities</div>
                <ul className="desc-bullets-list">
                  {job.responsibilities && job.responsibilities.length > 0 ? (
                    job.responsibilities.map((resp, i) => <li key={i}>{resp}</li>)
                  ) : (
                    <>
                      <li>Coordinate operational routing, rate negotiations, and space allocation with key alliances.</li>
                      <li>Manage regulatory compliance, documentation, and operational risk mitigation.</li>
                      <li>Act as direct strategic escalation lead for Tier-1 multinational accounts.</li>
                      <li>Supervise electronic EDI declarations and trade compliance conventions.</li>
                    </>
                  )}
                </ul>

                {readMore && (
                  <div className="mt-3 pt-3 border-t border-slate-100 animate-fadeIn">
                    <div className="desc-subheading">Detailed Requirements &amp; Qualifications</div>
                    <ul className="desc-bullets-list">
                      {job.requirements && job.requirements.length > 0 ? (
                        job.requirements.map((req, i) => <li key={i}>{req}</li>)
                      ) : (
                        <>
                          <li>Bachelor's degree in relevant discipline or industry equivalent.</li>
                          <li>3+ years of progressive professional experience in high-volume environments.</li>
                          <li>Demonstrated competency in commercial negotiation and cross-functional leadership.</li>
                          <li>Fluent communication in English and Vietnamese.</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}

                <button
                  type="button"
                  className="btn-read-more-toggle"
                  onClick={() => setReadMore(!readMore)}
                >
                  <span>{readMore ? 'Show Less' : 'Read Full Description'}</span>
                  {readMore ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                </button>
              </div>
            </div>
          </div>

          {/* Section 2: Skills Required */}
          <div className="builtin-card" id="card-skills-required">
            <div className="builtin-card-body">
              <div className="skills-header-simple">Skills Required</div>
              <ul className="desc-bullets-list" style={{ marginBottom: 0 }}>
                {job.requirements && job.requirements.length > 0 ? (
                  job.requirements.map((item, idx) => <li key={idx}>{item}</li>)
                ) : (
                  <>
                    <li>Bachelor degree in Foreign Trade, Maritime Studies, or Logistics &amp; Supply Chain.</li>
                    <li>3+ years managing FCL/LCL container logistics at an accredited 3PL or liner agency.</li>
                    <li>Proficiency in Incoterms 2020, customs brokerage, and maritime bill-of-lading documentation.</li>
                    <li>Bilingual communication in Vietnamese and English.</li>
                    <li>Customer-focused approach and ability to build and retain commercial business relationships.</li>
                  </>
                )}
              </ul>
            </div>
          </div>

          {/* Section 3: What The Team Is Saying */}
          <div className="builtin-card" id="card-team-saying">
            <div className="builtin-card-body">
              <div className="skills-header-simple">What The Team Is Saying</div>
              
              <div className="quote-box-wrap">
                <div className="quote-white-card">
                  {teamQuote.text}
                </div>
                <div className="quote-navy-card">
                  <img
                    src={teamQuote.avatar}
                    alt={teamQuote.author}
                    className="quote-avatar"
                  />
                  <div>
                    <div className="quote-person-name">{teamQuote.author}</div>
                    <div className="quote-person-title">{teamQuote.role}</div>
                  </div>
                </div>
              </div>

              <div className="quote-faces-row">
                {teamFaceAvatars.map((face, i) => (
                  <img
                    key={i}
                    src={face}
                    alt="Team member"
                    className="quote-face-avatar"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Section 4: Compensation & Benefits Highlights */}
          <div className="builtin-card" id="card-benefits">
            <div className="builtin-card-body">
              <div className="skills-header-simple">
                {company.shortName || company.name} Compensation &amp; Benefits Highlights
              </div>
              
              <div className="benefit-item-row">
                <strong>Healthcare Strength</strong> &mdash; Comprehensive healthcare insurance, annual executive health screenings, 24/7 accident coverage, and mental-wellbeing support for all full-time personnel.
              </div>
              <div className="benefit-item-row">
                <strong>Performance Rewards</strong> &mdash; Guaranteed 13th-month salary plus performance-linked quarterly KPI bonuses, annual profit-sharing distribution, and seniority retention allowances.
              </div>
              <div className="benefit-item-row">
                <strong>Professional Certification</strong> &mdash; 100% company-sponsored professional development programs, industry diploma certification, and leadership pathways across Southeast Asia.
              </div>

              <div style={{ marginTop: '16px' }}>
                <a
                  href={`/companies/${company.slug}`}
                  className="insight-link"
                >
                  Learn more about {company.shortName || company.name}'s Compensation &amp; Benefits &rarr;
                </a>
              </div>
            </div>
          </div>

          {/* Section 5: Company Insights */}
          <div className="builtin-card" id="card-insights">
            <div className="builtin-card-header">
              <span>{company.shortName || company.name} Insights</span>
            </div>
            <div className="insights-list">
              <button
                type="button"
                className="insight-link text-left"
                onClick={() => showToast(`Loading ${company.name} workplace intelligence report...`)}
              >
                What's It Like to Work at {company.shortName || company.name}?
              </button>
              <button
                type="button"
                className="insight-link text-left"
                onClick={() => showToast(`Loading ${company.name} culture values breakdown...`)}
              >
                {company.shortName || company.name} Culture &amp; Values
              </button>
              <button
                type="button"
                className="insight-link text-left"
                onClick={() => showToast(`Loading career advancement ladder metrics...`)}
              >
                {company.shortName || company.name} Career Growth &amp; Development
              </button>
              <button
                type="button"
                className="insight-link text-left"
                onClick={() => showToast(`Loading employee balance review data...`)}
              >
                What's the Work-Life Balance Like at {company.shortName || company.name}?
              </button>
              <button
                type="button"
                className="insight-link text-left"
                onClick={() => showToast(`Loading executive leadership bios...`)}
              >
                {company.shortName || company.name} Leadership &amp; Management
              </button>
              <button
                type="button"
                className="insight-link text-left"
                onClick={() => showToast(`Loading annual growth & stability dossier...`)}
              >
                {company.shortName || company.name} Company Growth, Stability &amp; Outlook
              </button>
            </div>
            
            <div className="job-utility-links">
              <Link href={`/jobs?company=${company.slug}`} className="flex items-center gap-2">
                <Briefcase size={14} />
                <span>View all jobs at {company.shortName || company.name}</span>
              </Link>
              <Link href={`/companies/${company.slug}`} className="flex items-center gap-2">
                <Building2 size={14} />
                <span>View {company.shortName || company.name} Profile</span>
              </Link>
              <button
                type="button"
                onClick={() => showToast('Listing flagged for editorial audit.')}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800"
              >
                <Flag size={14} />
                <span>Report Job</span>
              </button>
            </div>
          </div>

        </div>

        {/* ================================================================== */}
        {/* RIGHT STICKY COLUMN: AI Fit, Company Dossier, Gallery, Similar     */}
        {/* ================================================================== */}
        <div className="builtin-column">
          <div className="sticky-sidebar-wrap">
            
            {/* Panel 1: Am I A Good Fit? (BETA) */}
            <div className="ai-fit-card">
              <div className="ai-fit-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Sparkles size={16} />
                  <span>Am I A Good Fit?</span>
                </div>
                <span className="ai-beta-badge">BETA</span>
              </div>
              <div className="ai-fit-body">
                <div className="ai-insights-lead">
                  <div className="ai-symbol-star">&#10022;</div>
                  <div>
                    <div className="ai-title-lead">Get Personalized Job Insights.</div>
                    <p className="ai-desc-lead">
                      Our AI-powered fit analysis compares your resume with a job listing so you know if your skills &amp; experience align.
                    </p>
                  </div>
                </div>

                <div
                  className="ai-dropzone-box"
                  onClick={() => aiFileInputRef.current?.click()}
                >
                  <input
                    type="file"
                    ref={aiFileInputRef}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx"
                    onChange={handleAiCvUpload}
                  />
                  <UploadCloud size={28} className="text-blue-600 mx-auto mb-2" />
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '8px' }}>
                    {aiUploadedFile ? aiUploadedFile : 'Drag & drop resume or click to select'}
                  </div>
                  <button type="button" className="btn-ai-upload">
                    {aiUploadedFile ? 'Replace Resume' : 'Upload Resume'}
                  </button>
                </div>

                {/* Analysis Result Output Container */}
                {aiMatchScore && (
                  <div
                    id="ai-analysis-feedback"
                    style={{
                      marginTop: '14px',
                      background: '#eff6ff',
                      border: '1px solid #bfdbfe',
                      borderRadius: '6px',
                      padding: '12px',
                      fontSize: '12px',
                      color: '#1e3a8a',
                    }}
                  >
                    <div style={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                      <CheckCircle size={15} className="text-blue-600 shrink-0" />
                      <span>Match Score: {aiMatchScore}% &bull; Strong Fit</span>
                    </div>
                    <div>Your commercial profile and consultative client experience match the SMB territory role requirements!</div>
                  </div>
                )}
              </div>
            </div>

            {/* Panel 2: The Company */}
            <div className="builtin-card">
              <div className="builtin-card-header">
                <span>The Company</span>
              </div>
              <div className="builtin-card-body">
                {/* Quick Stats Grid */}
                <div className="company-stats-grid">
                  <div className="company-stat-cell">
                    <Building2 size={14} className="text-blue-600 shrink-0" />
                    <span className="truncate">HQ: {company.hq}</span>
                  </div>
                  <div className="company-stat-cell">
                    <Calendar size={14} className="text-blue-600 shrink-0" />
                    <span>Year Founded: {company.founded}</span>
                  </div>
                  <div className="company-stat-cell" style={{ gridColumn: '1 / -1' }}>
                    <Users size={14} className="text-blue-600 shrink-0" />
                    <span>{company.size}</span>
                  </div>
                </div>

                <div className="desc-subheading" style={{ marginTop: 0 }}>What We Do</div>
                <p className="desc-body-p">
                  {company.desc ||
                    `${company.name} operates premier facilities, enterprise services, and solutions connecting Vietnam with global markets.`}
                </p>

                <div className="desc-subheading">Why Work With Us</div>
                <p className="desc-body-p">
                  Join an accredited industry leader driving national infrastructure. We empower our teams with career mentoring, international academy certifications, and high-impact performance incentives.
                </p>

                {/* Gallery */}
                <div className="desc-subheading">Gallery</div>
                <div className="company-gallery-grid">
                  {galleryPhotos.map((photo, i) => (
                    <div
                      key={i}
                      className="gallery-photo-thumb"
                      style={{ backgroundImage: `url('${photo}')` }}
                    />
                  ))}
                </div>

                {/* Offices */}
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', marginTop: '8px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <div className="desc-subheading" style={{ margin: 0 }}>
                      {company.shortName || company.name} Regional Offices
                    </div>
                    <Link href={`/companies/${company.slug}`} className="insight-link" style={{ fontSize: '11px' }}>
                      LEARN MORE &rarr;
                    </Link>
                  </div>
                  <div style={{ fontSize: '12.5px', fontBold: 700, color: 'var(--navy)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Laptop size={14} className="text-blue-600 shrink-0" />
                    <span>Hybrid Workspace</span>
                  </div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '2px' }}>
                    {company.address || `${company.hq} & Regional Strategic Hubs`}
                  </div>
                  <div className="workplace-pill-row">
                    Typical time on-site: 4 days a week
                  </div>
                </div>
              </div>
            </div>

            {/* Panel 3: Similar Jobs */}
            <div className="builtin-card">
              <div className="builtin-card-header">
                <span>Similar Jobs</span>
              </div>
              <div>
                {similarJobs.map((simJob) => (
                  <Link
                    key={simJob.id}
                    href={`/jobs/${simJob.id}`}
                    className="similar-job-item"
                  >
                    <div className="similar-job-left">
                      <div className="similar-job-company">{simJob.company}</div>
                      <div className="similar-job-title">{simJob.title}</div>
                      <div className="similar-job-cats">
                        {simJob.department || 'Technology & Operations'}
                      </div>
                    </div>
                    <div className="similar-job-right">
                      <span>{simJob.workplaceType || 'Hybrid'}</span>
                      <span className="truncate">{simJob.location.split('/')[0].trim()}</span>
                      <strong>{simJob.compensation.split('-')[0].trim()}</strong>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </div>
        </div>

      </main>

      {/* ==================================================================== */}
      {/* 4. EASY APPLY MODAL                                                  */}
      {/* ==================================================================== */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl relative">
            <button
              type="button"
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition"
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            {appliedSuccess ? (
              <div className="py-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-xl font-black text-slate-900">Application Submitted!</h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
                  Your application for <strong className="text-slate-900">{job.title}</strong> at <strong className="text-slate-900">{job.company}</strong> has been transmitted successfully.
                </p>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl inline-block text-xs font-mono text-slate-700">
                  Tracking Code: <strong>{appliedRefCode}</strong>
                </div>
                <div className="pt-4">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl border border-slate-200 p-1 flex items-center justify-center bg-white shrink-0">
                    <img
                      src={company.logoImg || job.logo || '/sandbox-logo.png'}
                      alt={company.name}
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 leading-tight">
                      Apply for {job.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      {job.company} &bull; {job.location}
                    </p>
                  </div>
                </div>

                <form onSubmit={handleApplySubmit} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@example.com"
                      value={applicantEmail}
                      onChange={(e) => setApplicantEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. +84 901 234 567"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cover Note (Optional)
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Brief note to the hiring manager..."
                      value={applicantMessage}
                      onChange={(e) => setApplicantMessage(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send size={14} />
                      <span>Submit Application to {company.shortName || company.name}</span>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
