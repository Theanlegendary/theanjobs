import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import {
  Briefcase,
  MapPin,
  Clock,
  CheckCircle,
  Building2,
  Sparkles,
  ArrowRight,
  Bookmark,
  Share2,
  DollarSign,
  UploadCloud,
  ExternalLink,
  Flame,
  Check,
  Award,
  ShieldCheck,
  Mail,
  Phone,
  FileText,
  Calendar,
  Users,
  Globe,
  ChevronRight
} from 'lucide-react';
import { getJobById, jobsDatabase, JobItem, getCompanyBySlug, companiesDatabase, CompanyProfile } from '@/data/portalData';
import { SEO, StructuredData, generateJobPostingSchema } from '@/lib/seo';

export default function JobDetail() {
  const params = useParams<{ id?: string }>();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const rawId = params.id || searchParams.get('id') || 'job-vietnhat-1';
  const jobId = decodeURIComponent(rawId);

  // Retrieve job with robust lookup
  const job: JobItem = getJobById(jobId) ||
    jobsDatabase.find(j => j.id.toLowerCase() === jobId.toLowerCase()) ||
    jobsDatabase.find(j => j.id.includes('vietnhat')) ||
    jobsDatabase[0];

  // Retrieve rich company profile from companiesDatabase
  const company: CompanyProfile = getCompanyBySlug(job.companySlug) ||
    companiesDatabase.find(c => c.slug.toLowerCase() === job.companySlug.toLowerCase() || c.id.toLowerCase() === job.companySlug.toLowerCase()) ||
    companiesDatabase[0];

  // States
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidatePhone, setCandidatePhone] = useState('');
  const [candidateNote, setCandidateNote] = useState('');
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [jobId]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!candidateName || !candidateEmail) {
      alert('Vui lòng nhập họ tên và email liên hệ.');
      return;
    }
    setSubmitting(true);

    setTimeout(() => {
      const refCode = 'APP-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const newApp = {
        id: 'app-' + Date.now(),
        refCode,
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        location: job.location,
        salary: job.compensation,
        candidateName,
        candidateEmail,
        candidatePhone,
        cvFileName: cvFile ? cvFile.name : 'Resume_Applicant.pdf',
        status: 'Đã nhận hồ sơ',
        submittedAt: new Date().toISOString(),
      };

      try {
        const prev = JSON.parse(localStorage.getItem('thesandbox_applications') || '[]');
        localStorage.setItem('thesandbox_applications', JSON.stringify([newApp, ...prev]));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setSubmitting(false);
      setSubmittedRef(refCode);
    }, 600);
  };

  // Similar jobs from the directory (other engineering / technical roles)
  const similarJobs = jobsDatabase
    .filter(
      (j) =>
        j.id !== job.id &&
        (j.location.includes('Hà Nội') ||
          j.location.includes('Hồ Chí Minh') ||
          j.companySlug.includes('seev') ||
          j.companySlug.includes('vinmec') ||
          j.companySlug.includes('chailease') ||
          j.companySlug.includes('fpt'))
    )
    .slice(0, 3);

  // Other jobs at this specific company
  const companyOtherJobs = jobsDatabase
    .filter(j => j.companySlug.toLowerCase() === company.slug.toLowerCase() && j.id !== job.id);

  // Relevant skills / tech stack tags
  const skillsList = [
    'AutoCAD MEP',
    'Revit Architecture',
    'Dialux Lighting',
    'Hệ Thống Trạm Biến Áp',
    'Tự Động Hóa SCADA',
    'Điện Động Lực FDI'
  ];

  return (
    <div className="job-detail-page-container">
      {/* SEO Meta Tags */}
      <SEO
        title={`${job.title} — ${job.company}`}
        description={`${job.shortDesc || job.fullDesc?.substring(0, 160)} Ứng tuyển vị trí ${job.title} tại ${job.company}.`}
        canonical={`${typeof window !== 'undefined' ? window.location.origin : ''}/jobs/${job.id}`}
        ogImage={company.logoImg || '/images/og-job.png'}
        ogType="website"
        keywords={[job.title, job.company, job.location, job.department, 'tuyển dụng', 'việc làm']}
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

      {/* 1. BREADCRUMBS BAR */}
      <div className="company-breadcrumb-bar">
        <div className="container company-breadcrumb-inner flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs">
            <Link href="/" className="crumb-link text-slate-500 hover:text-slate-900 transition">Trang chủ</Link>
            <span className="crumb-sep text-slate-300">/</span>
            <Link href="/jobs" className="crumb-link text-slate-500 hover:text-slate-900 transition">Việc làm</Link>
            <span className="crumb-sep text-slate-300">/</span>
            <Link href={`/companies/${company.slug}`} className="crumb-link text-slate-500 hover:text-slate-900 transition">{company.shortName || company.name}</Link>
            <span className="crumb-sep text-slate-300">/</span>
            <span className="crumb-current font-bold text-slate-900 truncate max-w-[280px] sm:max-w-md">{job.title}</span>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold transition cursor-pointer"
            >
              <Share2 size={13} />
              <span>{copied ? 'Đã sao chép link' : 'Chia sẻ'}</span>
            </button>
            <span className="text-slate-300">•</span>
            <button
              type="button"
              onClick={() => setSaved(!saved)}
              className="inline-flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-semibold transition cursor-pointer"
            >
              <Bookmark size={13} fill={saved ? 'currentColor' : 'none'} className={saved ? 'text-blue-600' : ''} />
              <span>{saved ? 'Đã lưu việc làm' : 'Lưu tin'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. TOP HERO SECTION (BUILT IN 3-CARD HERO) */}
      <section className="job-hero-section">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="job-hero-cards-grid">
            
            {/* Card 1: Company & Job Title Header */}
            <div className="job-hero-card">
              <div>
                <div className="hero-company-row">
                  <div className="hero-logo-box">
                    <img
                      src={company.logoImg || job.logo || '/sandbox-logo-light.png'}
                      alt={company.name}
                      className="hero-logo-img"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/sandbox-logo-light.png';
                      }}
                    />
                  </div>
                  <div className="hero-company-name-wrap">
                    <Link href={`/companies/${company.slug}`} className="hero-company-name">
                      <span>{company.name}</span>
                      <CheckCircle size={15} className="verified-icon" />
                    </Link>
                    <span className="hero-dept-label">{job.department || company.industry}</span>
                  </div>
                </div>

                <h1 className="job-hero-title">{job.title}</h1>
              </div>

              <div className="hero-bottom-meta">
                <span className="meta-time-text">
                  <Clock size={13} />
                  <span>{job.datePosted || 'Vừa đăng'}</span>
                </span>
                {job.badge && (
                  <span className="hero-badge-pill flex items-center gap-1">
                    <Flame size={12} className="text-orange-400 fill-orange-400" />
                    <span>{job.badge}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Card 2: Role Specifications */}
            <div className="job-hero-card">
              <h2 className="hero-specs-heading">Thông Số Vị Trí</h2>
              <div className="specs-items-list">
                <div className="spec-item">
                  <MapPin size={16} className="spec-icon text-slate-500" />
                  <div>
                    <div className="spec-label">Địa Điểm Làm Việc</div>
                    <div className="spec-val">{job.location}</div>
                  </div>
                </div>

                <div className="spec-item">
                  <Briefcase size={16} className="spec-icon text-slate-500" />
                  <div>
                    <div className="spec-label">Hình Thức</div>
                    <div className="spec-val">{job.workplaceType} • Toàn thời gian</div>
                  </div>
                </div>

                <div className="spec-item">
                  <Award size={16} className="spec-icon text-slate-500" />
                  <div>
                    <div className="spec-label">Cấp Bậc & Chức Danh</div>
                    <div className="spec-val">{job.seniority || 'Chuyên viên cao cấp'}</div>
                  </div>
                </div>

                <div className="spec-item">
                  <ShieldCheck size={16} className="spec-icon text-slate-500" />
                  <div>
                    <div className="spec-label">Phân Hạng Doanh Nghiệp</div>
                    <div className="spec-val text-blue-700">{company.tier || 'Doanh Nghiệp Tiêu Biểu'}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3: Compensation & Action CTA */}
            <div className="job-hero-card">
              <div>
                <div className="comp-display-box">
                  <span className="comp-label">Thu Nhập & Đãi Ngộ Dự Kiến</span>
                  <div className="comp-value-row">
                    <span className="comp-amount text-blue-700">{job.compensation}</span>
                    <span className="comp-period">{job.salaryPeriod || '/ tháng'}</span>
                  </div>

                  {/* Style 4: Swiss Editorial Slash tags for quick benefits */}
                  {job.perks && job.perks.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600 mt-2">
                      {job.perks.map((perk, idx, arr) => (
                        <span key={idx} className="inline-flex items-center gap-2">
                          <span className="hover:text-blue-600 transition-colors">✓ {perk}</span>
                          {idx < arr.length - 1 && (
                            <span className="text-slate-300 font-normal select-none">/</span>
                          )}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="hero-cta-buttons">
                <a
                  href="#onpage-application"
                  className="btn-hero-apply"
                >
                  <span>Nộp Đơn Ứng Tuyển</span>
                  <ArrowRight size={14} />
                </a>

                <button
                  type="button"
                  onClick={() => setSaved(!saved)}
                  className={`btn-hero-save ${saved ? 'active' : ''}`}
                >
                  <Bookmark size={14} fill={saved ? 'currentColor' : 'none'} />
                  <span>{saved ? 'Đã Lưu' : 'Lưu Tin'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT 2-COLUMN GRID */}
      <main className="container max-w-7xl mx-auto px-4 sm:px-6">
        <div className="job-main-grid">
          
          {/* ========================================================= */}
          {/* LEFT COLUMN (65%): Role Dossier & Application             */}
          {/* ========================================================= */}
          <div className="job-left-column">
            
            {/* Role Overview & Mission Card */}
            <section className="job-detail-card" aria-labelledby="role-overview-heading">
              <div className="card-header-bar flex items-center justify-between">
                <h2 id="role-overview-heading">Chi Tiết Vị Trí & Yêu Cầu Chuyên Môn</h2>
                <span className="text-xs text-slate-400 font-normal">Mã vị trí: {job.id}</span>
              </div>

              <div className="card-content-body">
                {/* Tech Stack / Skills Strip (Style 4 Swiss Editorial Slash) */}
                <div className="mb-6 pb-4 border-b border-slate-100">
                  <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                    Kỹ Năng & Công Cụ Yêu Cầu:
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 text-xs font-medium text-slate-700">
                    {skillsList.map((skill, idx, arr) => (
                      <span key={skill} className="inline-flex items-center gap-2">
                        <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors">
                          {skill}
                        </span>
                        {idx < arr.length - 1 && (
                          <span className="text-slate-300 font-normal select-none">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Lead Summary */}
                <p className="job-lead-p">
                  {job.shortDesc}
                </p>

                {/* Full Description / Mission */}
                {job.fullDesc && (
                  <p className="job-body-p">
                    {job.fullDesc}
                  </p>
                )}

                {/* Key Responsibilities */}
                {job.responsibilities && job.responsibilities.length > 0 && (
                  <div>
                    <h3 className="job-sub-heading flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Trách Nhiệm Công Việc Chính</span>
                    </h3>
                    <ul className="job-bullet-list">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Requirements & Qualifications */}
                {job.requirements && job.requirements.length > 0 && (
                  <div>
                    <h3 className="job-sub-heading flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-blue-600" />
                      <span>Yêu Cầu Năng Lực & Kinh Nghiệm</span>
                    </h3>
                    <ul className="job-bullet-list">
                      {job.requirements.map((req, i) => (
                        <li key={i}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Benefits Grid */}
                {job.perks && job.perks.length > 0 && (
                  <div>
                    <h3 className="job-sub-heading flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      <span>Chế Độ Đãi Ngộ & Quyền Lợi Doanh Nghiệp</span>
                    </h3>
                    <div className="benefits-grid">
                      {job.perks.map((perk, i) => (
                        <div key={i} className="benefit-card">
                          <Check size={15} className="benefit-icon text-emerald-600 shrink-0" strokeWidth={2.5} />
                          <span>{perk}</span>
                        </div>
                      ))}
                      <div className="benefit-card">
                        <Check size={15} className="benefit-icon text-emerald-600 shrink-0" strokeWidth={2.5} />
                        <span>Xem xét tăng lương định kỳ & thưởng KPI</span>
                      </div>
                      <div className="benefit-card">
                        <Check size={15} className="benefit-icon text-emerald-600 shrink-0" strokeWidth={2.5} />
                        <span>Môi trường làm việc chuyên nghiệp, cơ sở vật chất chuẩn quốc tế</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Leadership & Culture Quote Card */}
            {company.quoteText && (
              <div className="team-quote-card">
                <p className="quote-text">
                  "{company.quoteText}"
                </p>
                <div className="quote-author-row">
                  <div className="w-10 h-10 rounded-full bg-slate-900 text-white font-bold flex items-center justify-center text-xs">
                    {company.shortName ? company.shortName.slice(0, 2).toUpperCase() : 'VN'}
                  </div>
                  <div>
                    <div className="quote-author-name">{company.quoteAuthor || company.name}</div>
                    <div className="quote-author-role">{company.shortName || company.name} • {company.tier}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Embedded Direct On-Page Application Section (NO POPUP!) */}
            <section id="onpage-application" className="onpage-apply-card" aria-labelledby="apply-heading">
              <div className="apply-header-wrap">
                <span className="apply-header-badge">ỨNG TUYỂN TRỰC TIẾP</span>
                <h3 id="apply-heading" className="apply-header-title">Nộp Hồ Sơ Ứng Tuyển</h3>
                <p className="apply-header-sub">
                  Hồ sơ được gửi trực tiếp đến phòng nhân sự của <strong>{company.name}</strong>. Phản hồi trong vòng 24–48 giờ làm việc.
                </p>
              </div>

              {submittedRef ? (
                <div className="apply-success-box">
                  <CheckCircle size={44} className="success-icon" />
                  <h3>Nộp Hồ Sơ Thành Công!</h3>
                  <p>
                    Hồ sơ của bạn đã được chuyển tới bộ phận tuyển dụng chuyên trách tại <strong>{company.name}</strong>.
                  </p>
                  <div className="reference-code-badge">
                    Mã tra cứu hồ sơ: <strong>{submittedRef}</strong>
                  </div>
                  <div className="success-actions">
                    <Link href="/jobs" className="btn-view-dashboard">
                      Xem Việc Làm Khác
                    </Link>
                    <button
                      type="button"
                      onClick={() => setSubmittedRef(null)}
                      className="btn-apply-another"
                    >
                      Nộp Đơn Khác
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="onpage-apply-form">
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="fullName">Họ và Tên *</label>
                      <input
                        id="fullName"
                        type="text"
                        required
                        placeholder="Nguyễn Văn A"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">Email Liên Hệ *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        placeholder="candidate@example.com"
                        value={candidateEmail}
                        onChange={(e) => setCandidateEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label htmlFor="phone">Số Điện Thoại</label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="0912 345 678"
                        value={candidatePhone}
                        onChange={(e) => setCandidatePhone(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="cvUpload">Đính Kèm CV (PDF, DOCX) *</label>
                      <input
                        id="cvUpload"
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setCvFile(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="notes">Giới Thiệu Ngắn Hoặc Lời Nhắn Đến Nhà Tuyển Dụng</label>
                    <textarea
                      id="notes"
                      rows={3}
                      placeholder="Tóm tắt 1–2 dự án tiêu biểu hoặc lý do bạn phù hợp với vị trí này..."
                      value={candidateNote}
                      onChange={(e) => setCandidateNote(e.target.value)}
                    />
                  </div>

                  <div className="ai-match-feedback">
                    <Sparkles size={16} className="text-emerald-700 shrink-0" />
                    <span>Hệ thống tự động đồng bộ hồ sơ ứng viên với phòng nhân sự {company.shortName || company.name}.</span>
                  </div>

                  <div className="apply-submit-row">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-submit-application"
                    >
                      {submitting ? 'Đang gửi hồ sơ...' : 'Xác Nhận Nộp Hồ Sơ Ứng Tuyển →'}
                    </button>
                    <p className="apply-legal-note">
                      Bằng cách nộp hồ sơ, bạn đồng ý cho phép nhà tuyển dụng liên hệ qua email và số điện thoại đã cung cấp.
                    </p>
                  </div>
                </form>
              )}
            </section>

          </div>

          {/* ========================================================= */}
          {/* RIGHT COLUMN (35%): Company Directory Profile & Openings  */}
          {/* ========================================================= */}
          <aside className="job-right-column" aria-label="Company Information">
            
            {/* Card 1: Rich Company Directory Profile (Fetched from companiesDatabase) */}
            <div className="co-sidebar-card co-overview-card">
              <div className="co-logo-holder">
                <img
                  src={company.logoImg || job.logo || '/sandbox-logo-light.png'}
                  alt={company.name}
                  className="co-profile-logo"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/sandbox-logo-light.png';
                  }}
                />
              </div>

              <div className="co-meta-top">
                <span className="co-tier-pill">{company.tier || 'Enterprise'}</span>
                <h3 className="co-profile-name">
                  <Link href={`/companies/${company.slug}`} className="hover:underline">
                    {company.name}
                  </Link>
                  <CheckCircle size={16} className="verified-blue shrink-0" />
                </h3>
                <p className="co-tagline">{company.desc ? company.desc.slice(0, 130) + '...' : ''}</p>
              </div>

              {/* Verified Company Stats */}
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-100 my-3 text-center">
                <div className="p-1">
                  <div className="text-base font-black text-slate-900">{company.stat1Val || '180+'}</div>
                  <div className="text-[10.5px] font-medium text-slate-500 mt-0.5">{company.stat1Label || 'Dự Án'}</div>
                </div>
                <div className="p-1 border-x border-slate-100">
                  <div className="text-base font-black text-slate-900">{company.stat2Val || '350+'}</div>
                  <div className="text-[10.5px] font-medium text-slate-500 mt-0.5">{company.stat2Label || 'Kỹ Sư'}</div>
                </div>
                <div className="p-1">
                  <div className="text-base font-black text-emerald-600">{company.stat3Val || '100%'}</div>
                  <div className="text-[10.5px] font-medium text-slate-500 mt-0.5">{company.stat3Label || 'An Toàn'}</div>
                </div>
              </div>

              {/* Company Specs DL */}
              <div className="co-specs-dl">
                <div className="co-spec-row">
                  <span className="co-spec-label"><MapPin size={13} /> Trụ sở chính:</span>
                  <span className="co-spec-value">{company.hq}</span>
                </div>
                <div className="co-spec-row">
                  <span className="co-spec-label"><Users size={13} /> Quy mô nhân sự:</span>
                  <span className="co-spec-value">{company.size}</span>
                </div>
                <div className="co-spec-row">
                  <span className="co-spec-label"><Calendar size={13} /> Năm thành lập:</span>
                  <span className="co-spec-value">{company.founded}</span>
                </div>
                <div className="co-spec-row">
                  <span className="co-spec-label"><Building2 size={13} /> Ngành nghề:</span>
                  <span className="co-spec-value">{company.industry}</span>
                </div>
              </div>

              {/* Official Contact Dossier */}
              <div className="co-contact-dossier bg-slate-50/70 p-3 rounded-xl border border-slate-100 my-3">
                {company.phone && (
                  <div className="contact-row flex items-center justify-between gap-2 py-1 text-xs border-b border-slate-100">
                    <strong className="text-slate-600">Hotline:</strong>
                    <span className="font-semibold text-slate-900">{company.phone}</span>
                  </div>
                )}
                {company.email && (
                  <div className="contact-row flex items-center justify-between gap-2 py-1 text-xs border-b border-slate-100">
                    <strong className="text-slate-600">Email Tuyển Dụng:</strong>
                    <span className="font-semibold text-slate-900">{company.email}</span>
                  </div>
                )}
                {company.address && (
                  <div className="contact-row flex flex-col gap-0.5 pt-1 text-xs">
                    <strong className="text-slate-600">Địa Chỉ:</strong>
                    <span className="text-slate-800 leading-snug">{company.address}</span>
                  </div>
                )}
              </div>

              {/* Certifications & Badges */}
              {company.certs && company.certs.length > 0 && (
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Chứng Chỉ & Năng Lực Doanh Nghiệp:
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-600">
                    {company.certs.map((cert, idx, arr) => (
                      <span key={cert} className="inline-flex items-center gap-2">
                        <span className="font-medium">{cert}</span>
                        {idx < arr.length - 1 && (
                          <span className="text-slate-300 select-none">/</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Corporate Links */}
              <div className="co-links-group mt-4 pt-3 border-t border-slate-100 flex flex-col gap-2">
                {company.website && (
                  <a
                    href={company.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-co-website text-center"
                  >
                    <Globe size={14} /> Website Chính Thức <ExternalLink size={12} />
                  </a>
                )}
                <Link
                  href={`/companies/${company.slug}`}
                  className="w-full py-2.5 px-3 rounded-lg bg-slate-900 hover:bg-black text-white font-bold text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>Xem Hồ Sơ Công Ty & {company.jobsCount || 12} Vị Trí</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            {/* Card 2: Other Openings at This Company */}
            {companyOtherJobs.length > 0 && (
              <div className="sidebar-card">
                <div className="card-header-bar flex items-center justify-between">
                  <h2>Vị Trí Cùng Doanh Nghiệp</h2>
                  <span className="text-xs text-slate-400">{companyOtherJobs.length} vị trí</span>
                </div>
                <div className="p-4 space-y-3">
                  {companyOtherJobs.map((oj) => (
                    <Link
                      key={oj.id}
                      href={`/jobs/${oj.id}`}
                      className="block p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition"
                    >
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 hover:text-blue-600 transition mb-1">
                        {oj.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{oj.location}</span>
                        <span className="font-bold text-slate-900">{oj.compensation}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Card 3: Similar Opportunities in the Directory */}
            <div className="sidebar-card">
              <div className="card-header-bar flex items-center justify-between">
                <h2>Cơ Hội Việc Làm Tương Đương</h2>
                <Link href="/jobs" className="text-xs text-slate-300 hover:text-white">Xem tất cả →</Link>
              </div>
              <div className="p-4 space-y-3">
                {similarJobs.map((sj) => (
                  <Link
                    key={sj.id}
                    href={`/jobs/${sj.id}`}
                    className="flex items-start gap-3 p-3 rounded-lg border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition group"
                  >
                    <div className="w-10 h-10 rounded-lg border border-slate-200 bg-white p-1 flex items-center justify-center shrink-0">
                      <img
                        src={sj.logo || '/sandbox-logo-light.png'}
                        alt={sj.company}
                        className="max-w-full max-h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/sandbox-logo-light.png';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-slate-900 group-hover:text-blue-600 transition truncate leading-snug">
                        {sj.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">{sj.company}</p>
                      <div className="flex items-center justify-between text-[11px] text-slate-600 mt-1.5 font-semibold">
                        <span>{sj.location}</span>
                        <span className="text-blue-700">{sj.compensation}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </main>
    </div>
  );
}
