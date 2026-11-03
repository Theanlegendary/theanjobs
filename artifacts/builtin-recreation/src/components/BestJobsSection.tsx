import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'wouter';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  Building2,
} from 'lucide-react';
import { jobsDatabase, JobItem } from '@/data/portalData';

// Safe ID sanitize helper ensuring clean URL-safe routing
export function toSafeJobId(id: string): string {
  return encodeURIComponent(id.trim().toLowerCase().replace(/[^a-z0-9_-]/g, '-'));
}

export interface BestJobDisplayItem {
  id: string;
  safeRoute: string;
  title: string;
  company: string;
  salary: string;
  location: string;
  isHot?: boolean;
  logoType: 'vietnhat' | 'vinmec' | 'seev' | 'chailease' | 'fpt' | 'pvcfc' | 'vsf' | 'viettel' | 'default';
  logoImg?: string;
}

// Logo renderer matching exact corporate identity from the reference image (large, prominent, borderless)
function CompanyLogoRenderer({ type, logoImg }: { type: BestJobDisplayItem['logoType']; logoImg?: string }) {
  switch (type) {
    case 'vietnhat':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center select-none scale-110">
          <div className="w-[66px] h-[36px] sm:w-[74px] sm:h-[40px] border-[2px] border-[#003399] rounded-full flex flex-col items-center justify-center bg-white px-1 shadow-2xs">
            <span className="text-[10px] sm:text-[11px] font-black tracking-tight text-[#cc0000] leading-none uppercase">VIET NHAT</span>
            <span className="text-[9px] sm:text-[10px] font-extrabold text-[#003399] leading-none mt-0.5">E & C</span>
          </div>
          <span className="text-[7.5px] sm:text-[8px] font-bold text-[#003399] leading-tight mt-1 tracking-tight uppercase">VIỆT NHẬT E&C JSC</span>
        </div>
      );
    case 'vinmec':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center select-none scale-110">
          {/* Golden Lotus emblem */}
          <svg className="w-9 h-7 sm:w-10 sm:h-8 mb-0.5" viewBox="0 0 32 26" fill="none">
            <path d="M16 1C17.5 7 21 12 25 14C20 15 17 18 16 25C15 18 12 15 7 14C11 12 14.5 7 16 1Z" fill="#bfa054" />
            <path d="M16 8C19 12 24 15 31 16C25 18 21 21 19 25C17.5 20 16 15 16 8Z" fill="#a48235" opacity="0.9" />
            <path d="M16 8C13 12 8 15 1 16C7 18 11 21 13 25C14.5 20 16 15 16 8Z" fill="#a48235" opacity="0.9" />
          </svg>
          <span className="text-[14px] sm:text-[15px] font-black text-[#0d3b66] tracking-wider leading-none">VINMEC</span>
          <span className="text-[6px] sm:text-[6.5px] font-semibold text-[#8a795d] tracking-widest uppercase mt-0.5">HEALTHCARE SYSTEM</span>
        </div>
      );
    case 'seev':
      return (
        <div className="w-full h-full flex items-center justify-center select-none">
          <span className="text-[34px] sm:text-[38px] font-black tracking-tight text-[#1a365d] font-sans">
            SEEV
          </span>
        </div>
      );
    case 'chailease':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center select-none scale-110">
          <svg className="w-9 h-9 sm:w-10 sm:h-10 text-[#bfa054]" viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="16" cy="16" r="7" />
            <circle cx="24" cy="16" r="7" />
            <circle cx="20" cy="23" r="7" />
          </svg>
          <span className="text-[9.5px] sm:text-[10.5px] font-bold text-[#bfa054] tracking-wider uppercase mt-0.5">CHAILEASE</span>
        </div>
      );
    case 'fpt':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center select-none scale-110">
          <div className="flex items-center gap-1 mb-1">
            <div className="w-4 h-4 rounded-full bg-[#f36f21]" />
            <div className="w-4 h-4 rounded-full bg-[#005ba9]" />
            <div className="w-4 h-4 rounded-full bg-[#3cb878]" />
          </div>
          <span className="text-[13px] sm:text-[14px] font-black text-[#f36f21] tracking-tight">FPT Education</span>
          <span className="text-[7px] sm:text-[7.5px] font-semibold text-slate-500 tracking-tighter uppercase">TỔ CHỨC GIÁO DỤC</span>
        </div>
      );
    case 'pvcfc':
      return (
        <div className="w-full h-full flex flex-col items-center justify-center select-none scale-110">
          <svg className="w-9 h-9 sm:w-10 sm:h-10" viewBox="0 0 24 24" fill="none">
            <path d="M12 2C12 2 17 8 17 14C17 17.866 14.761 21 12 21C9.239 21 7 17.866 7 14C7 8 12 2 12 2Z" fill="#15803d" />
            <path d="M12 7C12 7 15 11 15 15C15 17.5 13.5 19 12 19C10.5 19 9 17.5 9 15C9 11 12 7 12 7Z" fill="#eab308" />
          </svg>
          <span className="text-[7.5px] sm:text-[8px] font-extrabold text-[#15803d] tracking-tighter leading-none mt-0.5">PETROVIETNAM</span>
          <span className="text-[10px] sm:text-[11px] font-black text-[#1e40af] tracking-tight leading-none mt-0.5">PVCFC</span>
        </div>
      );
    case 'vsf':
      return (
        <div className="w-full h-full flex items-center justify-center select-none gap-1 sm:gap-1.5 scale-110">
          <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#dc2626]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 7L12 17L22 7H17L12 12L7 7H2Z" />
            <path d="M7 3L12 8L17 3H22L12 13L2 3H7Z" opacity="0.6" />
          </svg>
          <span className="text-[22px] sm:text-[24px] font-black text-[#dc2626] tracking-tight">VSF</span>
        </div>
      );
    default:
      if (logoImg) {
        return (
          <img
            src={logoImg}
            alt="Company Logo"
            className="max-h-full max-w-full object-contain scale-110"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
        );
      }
      return (
        <div className="w-full h-full flex items-center justify-center text-slate-700">
          <Building2 size={32} />
        </div>
      );
  }
}

// Fetch helper that reads directly from the data directory (portalData)
function mapJobItemToDisplay(j: JobItem): BestJobDisplayItem {
  let logoImg = j.logo;
  const c = j.company.toLowerCase();
  const cs = j.companySlug?.toLowerCase() || '';

  // Explicit high-fidelity real brand logo mapping
  if (c.includes('braze') || cs.includes('braze')) logoImg = '/images/braze_logo.svg';
  else if (c.includes('google') || cs.includes('google')) logoImg = '/images/google_logo.svg';
  else if (c.includes('datadog') || cs.includes('datadog')) logoImg = '/images/datadog_logo.png';
  else if (c.includes('bytedance') || cs.includes('bytedance')) logoImg = '/images/bytedance_logo.png';
  else if (c.includes('berkeley') || c.includes('tbsi')) logoImg = '/images/tbsi_logo.svg';
  else if (c.includes('nus') || c.includes('singapore')) logoImg = '/images/nus_logo.svg';
  else if (c.includes('automotive') || c.includes('mobility')) logoImg = '/images/home_logo_gm.png';
  else if (c.includes('viconship') || cs.includes('vsc')) logoImg = '/images/viconship.svg';
  else if (c.includes('dhl')) logoImg = '/images/dhl.svg';
  else if (c.includes('newport') || cs.includes('snp')) logoImg = '/images/saigon-newport.svg';
  else if (c.includes('metfone')) logoImg = '/images/logo_metfone_kh.png';
  else if (c.includes('cellcard')) logoImg = '/images/logo_cellcard_kh.png';
  else if (c.includes('aba')) logoImg = '/images/logo_aba_kh.png';
  else if (c.includes('truemoney')) logoImg = '/images/logo_truemoney_kh.png';
  else if (c.includes('fpt')) logoImg = '/images/logo_fpt.png';
  else if (c.includes('vinmec')) logoImg = '/images/logo_vinmec.png';
  else if (c.includes('viet nhat') || c.includes('vietnhat') || c.includes('việt nhật')) logoImg = '/images/logo_vietnhat.png';
  else if (c.includes('seev') || cs.includes('seev') || c.includes('sei')) logoImg = '/images/logo_seev.png';
  else if (c.includes('chailease')) logoImg = '/images/logo_chailease.png';
  else if (c.includes('pvcfc') || c.includes('phân bón')) logoImg = '/images/logo_pvcfc.png';
  else if (c.includes('vinsmart') || c.includes('vsf')) logoImg = '/images/logo_vsf.png';
  else if (c.includes('servicenow')) logoImg = '/images/home_logo_servicenow.png';
  else if (c.includes('general motors') || cs.includes('gm')) logoImg = '/images/home_logo_gm.png';
  else if (c.includes('pfizer')) logoImg = '/images/home_logo_pfizer.png';
  else if (c.includes('grab')) logoImg = '/images/logo_grab_clean.png';
  else if (c.includes('shopee')) logoImg = '/images/logo_shopee_clean.png';
  else if (c.includes('axon')) logoImg = '/images/logo_axon_clean.png';

  // Format salary presentation
  let displaySalary = j.compensation || 'Thương lượng';
  if (displaySalary.toLowerCase().includes('negotiable')) {
    displaySalary = 'Thương lượng';
  } else if (displaySalary.toLowerCase().includes('30tr')) {
    displaySalary = '30tr-30tr đ/tháng';
  } else if (displaySalary.toLowerCase().includes('200tr')) {
    displaySalary = '200tr-300tr đ/tháng';
  }

  const safeId = toSafeJobId(j.id);

  return {
    id: j.id,
    safeRoute: `/jobs/${safeId}`,
    title: j.title,
    company: j.company,
    salary: displaySalary,
    location: j.location,
    isHot: true,
    logoType: 'default',
    logoImg: logoImg || j.logo,
  };
}

export function BestJobsSection() {
  const [currentPage, setCurrentPage] = useState(0);
  const [jobsList, setJobsList] = useState<BestJobDisplayItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch jobs from the portal directory data source
  useEffect(() => {
    let isMounted = true;

    async function loadDirectoryJobs() {
      try {
        setLoading(true);
        // Direct fetch from portal data directory with fallback
        const topJobIds = [
          'job-vietnhat-1',
          'job-vinmec-1',
          'job-seev-hr',
          'job-chailease-credit',
          'job-fpt-schools',
          'job-seev-maintenance',
          'job-pvcfc-data',
          'job-vsf-sa',
          'job-seev-me',
        ];

        // Gather the 9 target mockup jobs in order
        const matched = topJobIds
          .map((id) => jobsDatabase.find((j) => j.id.toLowerCase() === id.toLowerCase()))
          .filter((j): j is JobItem => Boolean(j));

        // Add any remaining active jobs for subsequent pagination pages
        const remaining = jobsDatabase.filter(
          (j) => !topJobIds.includes(j.id.toLowerCase())
        );

        const allMapped = [...matched, ...remaining].map(mapJobItemToDisplay);

        if (isMounted) {
          setJobsList(allMapped);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching jobs directory:', err);
        if (isMounted) setLoading(false);
      }
    }

    loadDirectoryJobs();
    return () => {
      isMounted = false;
    };
  }, []);

  const JOBS_PER_PAGE = 9;
  const totalPages = Math.max(1, Math.ceil(jobsList.length / JOBS_PER_PAGE));

  const currentJobs = useMemo(() => {
    const start = currentPage * JOBS_PER_PAGE;
    return jobsList.slice(start, start + JOBS_PER_PAGE);
  }, [jobsList, currentPage]);

  const goToPrev = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const goToNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section id="best-jobs-section" className="py-6 my-4">
      <div className="container max-w-7xl mx-auto px-4 sm:px-6">
        {/* Outer Card Wrapper: Exactly 1 single border max */}
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-7 md:p-8 shadow-xs relative overflow-hidden">
          
          {/* Header Row: Ribbon Icon (NO background) + Title + "XEM TẤT CẢ >" */}
          <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              {/* Dual-swirl ribbon icon: NO background as default */}
              <div className="shrink-0 flex items-center justify-center bg-transparent border-0 p-0">
                <svg width="26" height="30" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Left Orange Ribbon Swoosh */}
                  <path
                    d="M3 2C0.5 7 0.5 19 8.5 28C7.5 21 6.5 13 13 4.5C9 1.5 5 1.5 3 2Z"
                    fill="#FF6B00"
                  />
                  {/* Right Blue Ribbon Swoosh */}
                  <path
                    d="M8.5 28C13 26 23.5 18 23.5 9C23.5 2.5 17 0.5 13 4.5C8 12 8 22 8.5 28Z"
                    fill="#0066FF"
                  />
                </svg>
              </div>

              <h2 className="text-xl md:text-2xl font-black text-slate-950 tracking-tight">
                Việc Làm Tốt Nhất
              </h2>
            </div>

            {/* Top Right "XEM TẤT CẢ >" Link */}
            <Link
              href="/jobs"
              className="text-slate-900 hover:text-blue-600 font-bold text-xs sm:text-sm tracking-wider uppercase transition-colors flex items-center gap-1 group py-1"
            >
              <span>XEM TẤT CẢ</span>
              <ChevronRight size={15} className="transition-transform group-hover:translate-x-0.5 text-slate-700 group-hover:text-blue-600" />
            </Link>
          </div>

          {/* 3x3 Grid of Job Cards (9 cards per page on desktop) */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 min-h-[360px]">
              {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-slate-100 p-4 animate-pulse flex items-start gap-4">
                  <div className="w-[76px] h-[76px] bg-slate-100 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4" />
                    <div className="h-3 bg-slate-100 rounded w-1/2" />
                    <div className="h-3 bg-slate-200 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 min-h-[360px]">
              {currentJobs.map((job) => (
                <Link
                  key={job.id}
                  href={job.safeRoute}
                  className="bg-white rounded-2xl border border-slate-200/80 p-3.5 sm:p-4 hover:border-slate-400 hover:shadow-xs transition-all duration-200 flex items-start gap-3.5 relative group no-underline text-inherit"
                >
                  {/* Company Logo: pure logo, NO background, NO border, large & prominent */}
                  <div className="w-[76px] h-[76px] sm:w-[84px] sm:h-[84px] shrink-0 flex items-center justify-center bg-transparent border-0 p-0 group-hover:scale-105 transition-transform">
                    <CompanyLogoRenderer type={job.logoType} logoImg={job.logoImg} />
                  </div>

                  {/* Main Content Column */}
                  <div className="flex-1 min-w-0 pr-0.5">
                    {/* Top Row: Job Title + Hot Badge */}
                    <div className="flex items-start justify-between gap-1.5">
                      <h3
                        className="text-[14px] sm:text-[14.5px] font-bold text-slate-900 group-hover:text-blue-600 transition-colors truncate leading-tight"
                        title={job.title}
                      >
                        {job.title}
                      </h3>

                      {job.isHot && (
                        <span className="shrink-0 inline-flex items-center gap-0.5 text-[10.5px] font-bold text-[#e03e2d] bg-transparent border border-[#ffccc7] px-1.5 py-0.5 rounded leading-none">
                          <Flame size={11} className="fill-[#e03e2d] text-[#e03e2d] bg-transparent" />
                          <span>Hot</span>
                        </span>
                      )}
                    </div>

                    {/* Second Row: Company Name */}
                    <p
                      className="text-xs text-slate-500 font-normal truncate mt-1 leading-normal"
                      title={job.company}
                    >
                      {job.company}
                    </p>

                    {/* Third Row: Salary in Red/Coral Accent - NO background box */}
                    <div className="text-[13px] font-bold text-[#e03e2d] mt-1.5 tracking-tight leading-snug">
                      {job.salary}
                    </div>

                    {/* Fourth Row: Location in Muted Gray */}
                    <p
                      className="text-[11.5px] text-slate-500 font-normal truncate mt-0.5 leading-normal"
                      title={job.location}
                    >
                      {job.location}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Bottom Pagination & Carousel Navigation (NO background on icon buttons) */}
          <div className="flex items-center justify-center gap-3 pt-6 mt-3">
            {/* Prev Chevron Circle: transparent bg, 1 border */}
            <button
              type="button"
              onClick={goToPrev}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 bg-transparent flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-400 transition-all cursor-pointer"
              aria-label="Previous jobs"
            >
              <ChevronLeft size={16} strokeWidth={2.2} />
            </button>

            {/* Pagination Dots (matching the screenshot dot sequence) */}
            <div className="flex items-center gap-1.5 px-2">
              {Array.from({ length: Math.max(8, totalPages) }).map((_, idx) => {
                const isActive = idx === currentPage;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      if (idx < totalPages) setCurrentPage(idx);
                    }}
                    className={`rounded-full transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'w-2.5 h-2.5 bg-[#0066ff] ring-2 ring-blue-100 scale-110'
                        : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                );
              })}
            </div>

            {/* Next Chevron Circle: transparent bg, 1 border */}
            <button
              type="button"
              onClick={goToNext}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-slate-200 bg-transparent flex items-center justify-center text-slate-400 hover:text-slate-800 hover:border-slate-400 transition-all cursor-pointer"
              aria-label="Next jobs"
            >
              <ChevronRight size={16} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
