import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'wouter';
import {
  Building2,
  MapPin,
  Users,
  Calendar,
  Globe,
  Mail,
  Phone,
  CheckCircle,
  Briefcase,
  Layers,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Compass,
  Sparkles,
  Heart,
  Maximize2,
  X,
  Share2
} from 'lucide-react';
import { getCompanyBySlug, companiesDatabase, jobsDatabase, CompanyProfile } from '@/data/portalData';

export default function CompanyDetail() {
  const params = useParams<{ id?: string }>();
  const searchParams = new URLSearchParams(window.location.search);
  const companySlug = params.id || searchParams.get('slug') || searchParams.get('id') || 'servicenow';

  const company: CompanyProfile = getCompanyBySlug(companySlug) || companiesDatabase[0];
  const [activeTab, setActiveTab] = useState<'overview' | 'jobs' | 'tech' | 'culture' | 'offices' | 'awards'>('overview');
  const [isSaved, setIsSaved] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  // Related jobs for this company
  const companyJobs = jobsDatabase.filter(
    (j) =>
      j.companySlug.toLowerCase() === company.slug.toLowerCase() ||
      j.companySlug.toLowerCase() === company.id.toLowerCase() ||
      j.company.toLowerCase().includes(company.shortName.toLowerCase())
  );

  // Similar companies for sidebar
  const similarCompanies = companiesDatabase
    .filter((c) => c.id !== company.id && c.slug !== company.slug)
    .slice(0, 3);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [companySlug]);

  return (
    <div className="company-detail-page-container">
      {/* 1. Breadcrumbs */}
      <div className="company-breadcrumb-bar">
        <div className="container company-breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <Link href="/companies" className="crumb-link">Companies</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{company.name}</span>
        </div>
      </div>

      {/* 2. Asymmetric 25% / 75% Built In Layout Grid */}
      <div className="container company-layout-grid">
        {/* ============================================================= */}
        {/* LEFT COLUMN (25%): Profile Card, Hiring Depts, Contact Info  */}
        {/* ============================================================= */}
        <aside className="company-left-col">
          {/* Card: Main Overview Card */}
          <div className="co-sidebar-card co-overview-card">
            <div className="co-logo-holder">
              <img
                src={company.logoImg}
                alt={company.name}
                className="co-profile-logo"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/sandbox-logo-light.png';
                }}
              />
            </div>

            <div className="co-meta-top">
              <span className="co-tier-pill">{company.tier}</span>
              <h1 className="co-profile-name">
                <span>{company.name}</span>
                <CheckCircle size={17} className="verified-blue" />
              </h1>
              <p className="co-tagline">{company.desc.substring(0, 115)}...</p>

              {/* Save Company 1.5px Outlined Button */}
              <button
                type="button"
                className={`btn-co-save ${isSaved ? 'saved' : ''}`}
                onClick={() => setIsSaved(!isSaved)}
                aria-label="Save this company"
              >
                <Heart size={15} fill={isSaved ? '#ef4444' : 'none'} color={isSaved ? '#ef4444' : '#1e293b'} />
                <span>{isSaved ? 'Company Saved' : 'Save Company'}</span>
              </button>
            </div>

            <div className="co-specs-dl">
              <div className="co-spec-row">
                <span className="co-spec-label"><MapPin size={14} /> Headquarters</span>
                <span className="co-spec-value">{company.hq}</span>
              </div>
              <div className="co-spec-row">
                <span className="co-spec-label"><Users size={14} /> Organization Size</span>
                <span className="co-spec-value">{company.size}</span>
              </div>
              <div className="co-spec-row">
                <span className="co-spec-label"><Calendar size={14} /> Founded</span>
                <span className="co-spec-value">{company.founded}</span>
              </div>
              <div className="co-spec-row">
                <span className="co-spec-label"><Building2 size={14} /> Industry Sector</span>
                <span className="co-spec-value">{company.industry}</span>
              </div>
            </div>

            {/* Contact Dossier */}
            <div className="co-contact-dossier">
              <div className="contact-row">
                <strong>Hotline:</strong>
                <span>{company.phone || '+1 (408) 501-8550'}</span>
              </div>
              <div className="contact-row">
                <strong>Careers Email:</strong>
                <span>{company.email || 'careers@' + (company.slug || 'company') + '.com'}</span>
              </div>
              <div className="contact-row">
                <strong>HQ Campus:</strong>
                <span>{company.address || company.hq}</span>
              </div>
            </div>

            <div className="co-links-group">
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-co-website"
              >
                <Globe size={15} /> Official Corporate Website <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Card: We're Hiring */}
          <div className="co-sidebar-card co-hiring-depts-card">
            <div className="co-card-header-sm">
              <span className="co-hiring-status-dot" />
              <h3>Active Hiring Pipelines</h3>
              <span className="co-roles-count-pill">{company.jobsCount} Openings</span>
            </div>
            <div className="co-depts-list">
              {company.hiringCategories.map((cat, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveTab('jobs')}
                  className="co-dept-row"
                >
                  <span className="co-dept-name">{cat.name}</span>
                  <span className="co-dept-count">{cat.count} roles</span>
                </button>
              ))}
            </div>
          </div>

          {/* Card: Similar Top Employers */}
          <div className="co-sidebar-card co-similar-card">
            <h4 className="co-certs-title">Similar Top Employers</h4>
            <div className="co-similar-list">
              {similarCompanies.map((sim) => (
                <Link key={sim.id} href={`/companies/${sim.id}`} className="sim-company-row">
                  <img
                    src={sim.logoImg}
                    alt={sim.name}
                    className="sim-logo"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/sandbox-logo-light.png';
                    }}
                  />
                  <div className="sim-info">
                    <span className="sim-name">{sim.name}</span>
                    <span className="sim-jobs">{sim.jobsCount} open roles</span>
                  </div>
                  <ChevronRight size={14} className="sim-arrow" />
                </Link>
              ))}
            </div>
          </div>

          {/* Card: Accreditations & Certifications */}
          <div className="co-sidebar-card co-certs-card">
            <h4 className="co-certs-title">Accreditations & Compliance</h4>
            <div className="co-certs-list">
              {company.certs.map((cert, i) => (
                <div key={i} className="cert-item-row">
                  <ShieldCheck size={14} className="cert-shield-icon" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ============================================================= */}
        {/* RIGHT COLUMN (75%): Cover Banner, Tabs & Rich Content Panels */}
        {/* ============================================================= */}
        <main className="company-right-col">
          {/* Top Banner Card with Cover Photo */}
          <div className="company-cover-banner-card">
            <div className="cover-photo-wrap">
              <img
                src={company.heroImg}
                alt={company.name}
                className="cover-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/images/dir_servicenow.png';
                }}
              />
              <div className="cover-overlay" />
              <div className="cover-content">
                <div>
                  <span className="cover-sub-label">{company.industry}</span>
                  <h2 className="cover-title">{company.name}</h2>
                </div>
                <div className="cover-active-badge">
                  <span className="pulse-circle" /> Actively Hiring in 2026
                </div>
              </div>
            </div>

            {/* Sticky Tabs Navbar */}
            <div className="company-tabs-navbar">
              <button
                type="button"
                className={`co-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                type="button"
                className={`co-tab-btn ${activeTab === 'jobs' ? 'active' : ''}`}
                onClick={() => setActiveTab('jobs')}
              >
                Open Positions ({companyJobs.length || company.jobsCount})
              </button>
              <button
                type="button"
                className={`co-tab-btn ${activeTab === 'tech' ? 'active' : ''}`}
                onClick={() => setActiveTab('tech')}
              >
                Technology Stack
              </button>
              <button
                type="button"
                className={`co-tab-btn ${activeTab === 'culture' ? 'active' : ''}`}
                onClick={() => setActiveTab('culture')}
              >
                Culture & Values
              </button>
              <button
                type="button"
                className={`co-tab-btn ${activeTab === 'offices' ? 'active' : ''}`}
                onClick={() => setActiveTab('offices')}
              >
                Offices & Locations
              </button>
              <button
                type="button"
                className={`co-tab-btn ${activeTab === 'awards' ? 'active' : ''}`}
                onClick={() => setActiveTab('awards')}
              >
                Awards & Accreditations
              </button>
            </div>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="co-tab-pane">
              <div className="pane-card">
                <h3 className="pane-section-title">About {company.shortName}</h3>
                <p className="pane-lead-text">{company.desc}</p>

                {/* 3 KPI Metric Cards */}
                <div className="co-kpi-grid">
                  <div className="kpi-card">
                    <span className="kpi-label">{company.stat1Label}</span>
                    <strong className="kpi-val">{company.stat1Val}</strong>
                  </div>
                  <div className="kpi-card">
                    <span className="kpi-label">{company.stat2Label}</span>
                    <strong className="kpi-val">{company.stat2Val}</strong>
                  </div>
                  <div className="kpi-card">
                    <span className="kpi-label">{company.stat3Label}</span>
                    <strong className="kpi-val">{company.stat3Val}</strong>
                  </div>
                </div>

                {/* Leadership Quote */}
                <div className="co-quote-card">
                  <blockquote className="co-quote-text">
                    "{company.quoteText}"
                  </blockquote>
                  <cite className="co-quote-cite">— {company.quoteAuthor}</cite>
                </div>

                {/* Photo Highlights */}
                {company.photos && company.photos.length > 0 && (
                  <div className="pane-sub-section">
                    <div className="sub-section-header">
                      <h4>Life & Campus Highlights</h4>
                      <button
                        type="button"
                        onClick={() => setActiveTab('culture')}
                        className="link-view-all-jobs"
                      >
                        Explore all photos &rarr;
                      </button>
                    </div>
                    <div className="co-photos-grid-mini">
                      {company.photos.slice(0, 4).map((photo, i) => (
                        <div
                          key={i}
                          className="co-photo-thumb-wrap"
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          <img
                            src={photo}
                            alt={`${company.name} office ${i + 1}`}
                            className="co-photo-thumb-img"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/dir_servicenow.png';
                            }}
                          />
                          <div className="co-photo-zoom-overlay">
                            <Maximize2 size={16} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Featured Jobs Section */}
                <div className="pane-sub-section">
                  <div className="sub-section-header">
                    <h4>Featured Openings at {company.shortName}</h4>
                    <button
                      type="button"
                      onClick={() => setActiveTab('jobs')}
                      className="link-view-all-jobs"
                    >
                      View all {companyJobs.length || company.jobsCount} roles &rarr;
                    </button>
                  </div>

                  <div className="featured-jobs-list">
                    {companyJobs.length > 0 ? (
                      companyJobs.map((job) => (
                        <div key={job.id} className="featured-job-row-card">
                          <div className="job-row-main">
                            <Link href={`/jobs/${job.id}`} className="job-row-title">
                              {job.title}
                            </Link>
                            <div className="job-row-meta">
                              <span><MapPin size={13} /> {job.location}</span>
                              <span>•</span>
                              <span>{job.workplaceType}</span>
                              <span>•</span>
                              <strong className="job-row-comp">{job.compensation}</strong>
                            </div>
                          </div>
                          <Link href={`/jobs/${job.id}`} className="btn-job-row-apply">
                            View & Apply on Page &rarr;
                          </Link>
                        </div>
                      ))
                    ) : (
                      <div className="no-direct-jobs-notice">
                        <Briefcase size={24} className="notice-icon" />
                        <div>
                          <strong>Explore {company.jobsCount} open roles across departments</strong>
                          <p>Click below to inspect open positions or submit an open candidate inquiry.</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setActiveTab('jobs')}
                          className="btn-browse-roles"
                        >
                          Inspect Open Positions
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Open Positions */}
          {activeTab === 'jobs' && (
            <div className="co-tab-pane">
              <div className="pane-card">
                <div className="jobs-pane-header">
                  <div>
                    <h3 className="pane-section-title">Open Positions at {company.name}</h3>
                    <p className="pane-sub-text">All positions feature direct on-page application with zero popup forms.</p>
                  </div>
                  <span className="badge-total-jobs">{companyJobs.length || company.jobsCount} Available Roles</span>
                </div>

                <div className="jobs-list-container">
                  {companyJobs.map((job) => (
                    <div key={job.id} className="co-job-card-large">
                      <div className="co-job-top">
                        <div className="co-job-badge-tag">{job.badge || 'Active Opening'}</div>
                        <span className="co-job-time">{job.timeAgo}</span>
                      </div>
                      <Link href={`/jobs/${job.id}`} className="co-job-title-link">
                        {job.title}
                      </Link>
                      <p className="co-job-short-desc">{job.shortDesc}</p>

                      <div className="co-job-meta-strip">
                        <span><MapPin size={14} /> {job.location}</span>
                        <span>•</span>
                        <span>{job.workplaceType}</span>
                        <span>•</span>
                        <strong className="co-job-salary">{job.compensation} {job.salaryPeriod}</strong>
                      </div>

                      <div className="co-job-footer">
                        <div className="co-job-perks-pills">
                          {job.perks.slice(0, 3).map((perk, i) => (
                            <span key={i} className="co-mini-perk">✓ {perk}</span>
                          ))}
                        </div>
                        <Link href={`/jobs/${job.id}`} className="btn-co-job-apply">
                          Apply on Page <ChevronRight size={15} />
                        </Link>
                      </div>
                    </div>
                  ))}

                  {/* Fallback extra department positions */}
                  {company.hiringCategories.map((cat, i) => (
                    <div key={`dept-${i}`} className="co-dept-hiring-box">
                      <div className="dept-box-info">
                        <h4>{cat.name}</h4>
                        <p>{cat.count} openings actively recruiting for candidate batches.</p>
                      </div>
                      <Link href={`/jobs?search=${encodeURIComponent(company.shortName)}`} className="btn-dept-explore">
                        Browse Positions in {cat.name} &rarr;
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Technology Stack */}
          {activeTab === 'tech' && (
            <div className="co-tab-pane">
              <div className="pane-card">
                <h3 className="pane-section-title">Core Technology Stack & Infrastructure</h3>
                <p className="pane-sub-text">
                  Production systems, languages, and distributed architectures powering {company.shortName}'s operations.
                </p>

                <div className="tech-stack-grid">
                  {company.techStack.map((tech, i) => (
                    <div key={i} className="tech-card">
                      <div className="tech-card-header">
                        <span className="tech-category-tag">{tech.category}</span>
                      </div>
                      <h4 className="tech-name">{tech.name}</h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 4: Culture & Values */}
          {activeTab === 'culture' && (
            <div className="co-tab-pane">
              <div className="pane-card">
                <h3 className="pane-section-title">Culture & Engineering Values</h3>
                <p className="pane-sub-text">The operational philosophy guiding our distributed teams.</p>

                <div className="culture-pillars-list">
                  {company.cultureValues.map((val, i) => (
                    <div key={i} className="culture-pillar-card">
                      <div className="pillar-title-row">
                        <Compass size={18} className="pillar-icon" />
                        <h4>{val.title}</h4>
                      </div>
                      <p className="pillar-desc">{val.desc}</p>
                    </div>
                  ))}
                </div>

                {/* Full Photo Gallery with Lightbox */}
                {company.photos && company.photos.length > 0 && (
                  <div className="pane-sub-section" style={{ marginTop: '32px' }}>
                    <h4 className="pane-section-title" style={{ fontSize: '16px', marginBottom: '14px' }}>
                      Campus & Engineering Spaces
                    </h4>
                    <div className="co-photos-gallery-full">
                      {company.photos.map((photo, i) => (
                        <div
                          key={i}
                          className="co-photo-thumb-wrap large"
                          onClick={() => setSelectedPhoto(photo)}
                        >
                          <img
                            src={photo}
                            alt={`${company.name} facility ${i + 1}`}
                            className="co-photo-thumb-img"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/images/dir_servicenow.png';
                            }}
                          />
                          <div className="co-photo-zoom-overlay">
                            <Maximize2 size={18} />
                            <span>Enlarge Photo</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tab 5: Offices */}
          {activeTab === 'offices' && (
            <div className="co-tab-pane">
              <div className="pane-card">
                <h3 className="pane-section-title">Offices & Operational Facilities</h3>
                <div className="offices-grid">
                  {company.offices.map((off, i) => (
                    <div key={i} className="office-card">
                      <span className="office-type-badge">{off.type}</span>
                      <h4 className="office-name">{off.name}</h4>
                      <div className="office-loc">
                        <MapPin size={14} /> {off.location}
                      </div>
                      <p className="office-spec">{off.spec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Awards */}
          {activeTab === 'awards' && (
            <div className="co-tab-pane">
              <div className="pane-card">
                <h3 className="pane-section-title">Industry Recognitions & Accreditations</h3>
                <div className="awards-grid">
                  {company.awards.map((aw, i) => (
                    <div key={i} className="award-card">
                      <div className="award-badge-pill">{aw.badge}</div>
                      <h4 className="award-title">{aw.title}</h4>
                      <p className="award-org">{aw.org}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="co-lightbox-backdrop" onClick={() => setSelectedPhoto(null)}>
          <div className="co-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="co-lightbox-close"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close"
            >
              <X size={20} />
            </button>
            <img src={selectedPhoto} alt="Campus view enlarged" className="lightbox-img" />
            <div className="lightbox-caption">
              <strong>{company.name}</strong> &middot; Operational Campus & Engineering Facilities
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
