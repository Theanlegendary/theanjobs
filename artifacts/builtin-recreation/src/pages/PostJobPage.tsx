import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  CheckCircle,
  PlusCircle,
  Eye,
  ArrowRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function PostJobPage() {
  const [, setLocation] = useLocation();

  const [postType, setPostType] = useState<'job' | 'internship' | 'news'>('job');
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [category, setCategory] = useState('AI & Machine Learning');
  const [seniority, setSeniority] = useState('Senior Level');
  const [workplaceType, setWorkplaceType] = useState<'Hybrid' | 'Remote' | 'On-site'>('Hybrid');
  const [locationStr, setLocationStr] = useState('Ho Chi Minh City, VN or Remote');
  const [compensation, setCompensation] = useState('$5,000 - $8,000 / month');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [publishedId, setPublishedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !company || !contactEmail) {
      alert('Please fill out all required fields marked with *');
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      const generatedId = 'job-' + Date.now();
      const newJob = {
        id: generatedId,
        title,
        company,
        companySlug: company.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        logo: '/images/brands/viconship.svg',
        location: locationStr,
        workplaceType,
        seniority,
        department: category,
        compensation: compensation.split('/')[0].trim(),
        salaryPeriod: compensation.includes('/') ? '/' + compensation.split('/')[1].trim() : '',
        perks: ['Health Insurance', 'Performance Bonus', 'Equipment Stipend'],
        datePosted: 'Today',
        timeAgo: 'Just now',
        badge: postType === 'internship' ? 'Internship' : 'Verified',
        shortDesc: description.substring(0, 160) + '...',
        fullDesc: description,
        responsibilities: [
          'Lead key engineering deliverables in coordination with product management.',
          'Uphold high standards for code quality, testing, and continuous deployment.',
          'Participate in architecture reviews and cross-functional team initiatives.'
        ],
        requirements: requirements.split('\n').filter(Boolean)
      };

      try {
        const prev = JSON.parse(localStorage.getItem('thesandbox_employer_jobs') || '[]');
        localStorage.setItem('thesandbox_employer_jobs', JSON.stringify([newJob, ...prev]));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setSubmitting(false);
      setPublishedId(generatedId);
    }, 600);
  };

  return (
    <div className="post-job-page-container">
      {/* 1. Breadcrumbs */}
      <div className="post-job-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Post a Verified Job or Editorial Announcement</span>
        </div>
      </div>

      {/* 2. Header Banner */}
      <section className="post-job-hero-banner">
        <div className="container hero-banner-inner">
          <span className="hero-banner-tag">EMPLOYER & RECRUITER PORTAL</span>
          <h1 className="hero-banner-title">Post a Verified Opportunity</h1>
          <p className="hero-banner-sub">
            Reach 85,000+ accredited software engineers, data scientists, and supply chain specialists across Vietnam, Singapore, and global tech hubs.
          </p>
        </div>
      </section>

      {/* 3. Main Form Grid */}
      <main className="container post-job-main-grid">
        {/* Left Column: Input Form */}
        <div className="post-job-form-column">
          {publishedId ? (
            <div className="published-success-card">
              <CheckCircle size={48} className="success-icon" />
              <h2>Listing Successfully Published!</h2>
              <p>
                Your opportunity is now live in the global directory with verified badge status. Candidates can view specifications and apply directly on the page.
              </p>
              <div className="success-actions-row">
                <Link href={`/jobs/${publishedId}`} className="btn-view-live">
                  View Live Job Detail Page →
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setPublishedId(null);
                    setTitle('');
                    setDescription('');
                    setRequirements('');
                  }}
                  className="btn-create-another"
                >
                  Post Another Listing
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="post-job-card-form">
              <div className="form-type-selector">
                <button
                  type="button"
                  className={`type-btn ${postType === 'job' ? 'active' : ''}`}
                  onClick={() => setPostType('job')}
                >
                  <Briefcase size={16} /> Full-Time / Contract Job
                </button>
                <button
                  type="button"
                  className={`type-btn ${postType === 'internship' ? 'active' : ''}`}
                  onClick={() => setPostType('internship')}
                >
                  <Sparkles size={16} /> Internship / Fellowship
                </button>
              </div>

              <div className="form-group">
                <label htmlFor="job-title">Job or Opportunity Title *</label>
                <input
                  id="job-title"
                  type="text"
                  required
                  placeholder="e.g. Senior Distributed Systems Engineer"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="company-name">Hiring Organization / Company *</label>
                  <input
                    id="company-name"
                    type="text"
                    required
                    placeholder="e.g. Datadog or Viconship"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-email">Recruiter Contact Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    placeholder="careers@company.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label htmlFor="job-category">Specialization Area</label>
                  <select
                    id="job-category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="AI & Machine Learning">AI & Machine Learning</option>
                    <option value="Cloud Infrastructure & Systems">Cloud Infrastructure & Systems</option>
                    <option value="Maritime & Port Logistics">Maritime & Port Logistics</option>
                    <option value="Frontend & Client Platform">Frontend & Client Platform</option>
                    <option value="DevSecOps & SRE">DevSecOps & SRE</option>
                    <option value="Product & Design">Product & Design</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="job-seniority">Seniority Level</label>
                  <select
                    id="job-seniority"
                    value={seniority}
                    onChange={(e) => setSeniority(e.target.value)}
                  >
                    <option value="Internship / Student">Internship / Student</option>
                    <option value="Junior Level">Junior Level</option>
                    <option value="Mid-Level">Mid-Level</option>
                    <option value="Senior Level">Senior Level</option>
                    <option value="Staff / Principal">Staff / Principal</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="work-type">Workplace Model</label>
                  <select
                    id="work-type"
                    value={workplaceType}
                    onChange={(e) => setWorkplaceType(e.target.value as any)}
                  >
                    <option value="Hybrid">Hybrid</option>
                    <option value="Remote">100% Remote</option>
                    <option value="On-site">On-site</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label htmlFor="job-loc">Location / Office Hub</label>
                  <input
                    id="job-loc"
                    type="text"
                    placeholder="e.g. Ho Chi Minh City, VN or Singapore"
                    value={locationStr}
                    onChange={(e) => setLocationStr(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="job-comp">Compensation or Monthly Stipend</label>
                  <input
                    id="job-comp"
                    type="text"
                    placeholder="e.g. $4,000 - $6,500 / month or 35M - 50M VND"
                    value={compensation}
                    onChange={(e) => setCompensation(e.target.value)}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="job-desc">Role Overview & Mission</label>
                <textarea
                  id="job-desc"
                  rows={4}
                  placeholder="Describe the challenges your engineering team is solving and what makes this position impactful..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="job-reqs">Requirements & Qualifications (One per line)</label>
                <textarea
                  id="job-reqs"
                  rows={4}
                  placeholder="• 4+ years building high-concurrency services&#10;• Experience with Rust, Go, or Python&#10;• Solid grasp of distributed data stores"
                  value={requirements}
                  onChange={(e) => setRequirements(e.target.value)}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-publish-listing"
              >
                {submitting ? 'Verifying & Publishing Listing...' : 'Publish Verified Opportunity Listing'}
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Live Card Preview */}
        <aside className="post-job-preview-column">
          <div className="preview-sticky-card">
            <div className="preview-card-header">
              <Eye size={16} />
              <span>Live Search & Feed Preview</span>
            </div>

            <div className="preview-card-body">
              <div className="preview-badge-pill">
                {postType === 'internship' ? '💼 Internship' : '✓ Verified Opening'}
              </div>
              <h3 className="preview-job-title">
                {title || 'Senior Distributed Systems Engineer'}
              </h3>
              <div className="preview-company-name">
                {company || 'Your Organization'}
              </div>
              <div className="preview-meta-row">
                <span><MapPin size={13} /> {locationStr}</span>
                <span>•</span>
                <span>{workplaceType}</span>
              </div>
              <div className="preview-salary-pill">
                {compensation || '$5,000 - $8,000 / month'}
              </div>
              <p className="preview-desc-snippet">
                {description ? description.substring(0, 110) + '...' : 'Preview description text will render live as you type in the editor form.'}
              </p>

              <div className="preview-btn-mock">
                Apply on Page →
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
