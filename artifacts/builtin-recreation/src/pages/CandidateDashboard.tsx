import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Briefcase,
  CheckCircle,
  Clock,
  FileText,
  Bookmark,
  Calendar,
  Award,
  ArrowRight,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

export default function CandidateDashboard() {
  const [applications, setApplications] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('thesandbox_applications');
      if (stored) {
        setApplications(JSON.parse(stored));
      } else {
        // Sample default application
        setApplications([
          {
            id: 'app-default-1',
            refCode: 'APP-DD892A',
            jobId: 'intern-datadog',
            jobTitle: 'Summer 2026 AI Research & Engineering Intern',
            company: 'Datadog',
            location: 'New York, NY (Hybrid)',
            salary: '$6,200 / month',
            candidateName: 'David Sterling',
            candidateEmail: 'david.sterling@example.com',
            cvFileName: 'David_Sterling_Systems_CV.pdf',
            status: 'Under Review',
            submittedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
            dateFormatted: '2 days ago'
          }
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="candidate-dashboard-page-container">
      {/* 1. Breadcrumbs */}
      <div className="dash-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Candidate Career Dashboard</span>
        </div>
      </div>

      {/* 2. Banner */}
      <section className="dash-hero-banner">
        <div className="container banner-inner">
          <div>
            <span className="dash-pill-tag">VERIFIED APPLICANT PORTAL</span>
            <h1 className="dash-title">Candidate Career Hub & Applications</h1>
            <p className="dash-subtitle">
              Monitor your job applications, view stage progression across employer ATS pipelines, and manage your credentials.
            </p>
          </div>
          <div className="dash-banner-actions">
            <Link href="/cv-builder" className="btn-dash-builder">
              <FileText size={15} /> Open ATS Resume Builder
            </Link>
            <Link href="/jobs" className="btn-dash-jobs">
              <Briefcase size={15} /> Explore New Openings
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Main Dashboard Content */}
      <main className="container dash-main-grid">
        {/* KPI Stats Row */}
        <div className="dash-kpi-row">
          <div className="dash-kpi-card">
            <span className="kpi-label">Active Applications</span>
            <strong className="kpi-val">{applications.length}</strong>
            <span className="kpi-hint">Transmitted to employer ATS</span>
          </div>
          <div className="dash-kpi-card">
            <span className="kpi-label">Interviews Scheduled</span>
            <strong className="kpi-val">1</strong>
            <span className="kpi-hint">Datadog Core Systems Pod</span>
          </div>
          <div className="dash-kpi-card">
            <span className="kpi-label">Verified Certifications</span>
            <strong className="kpi-val">3</strong>
            <span className="kpi-hint">FIATA & AWS Certified</span>
          </div>
          <div className="dash-kpi-card">
            <span className="kpi-label">ATS Profile Index</span>
            <strong className="kpi-val">96%</strong>
            <span className="kpi-hint">Optimized for tech parsers</span>
          </div>
        </div>

        {/* Section: Applications Table */}
        <section className="dash-section-card">
          <div className="dash-card-header">
            <h3>Transmitted Job & Fellowship Applications</h3>
            <span className="dash-count-pill">{applications.length} Submissions</span>
          </div>

          {applications.length > 0 ? (
            <div className="applications-table-wrapper">
              <table className="dash-table">
                <thead>
                  <tr>
                    <th>Role & Organization</th>
                    <th>Compensation</th>
                    <th>Attached Resume</th>
                    <th>Date Applied</th>
                    <th>Application Stage</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id}>
                      <td>
                        <Link href={`/jobs/${app.jobId}`} className="app-role-link">
                          {app.jobTitle}
                        </Link>
                        <div className="app-company-sub">{app.company} • {app.location}</div>
                        <div className="app-ref-code">Ref: {app.refCode}</div>
                      </td>
                      <td>
                        <span className="app-salary-tag">{app.salary}</span>
                      </td>
                      <td>
                        <div className="app-file-row">
                          <FileText size={14} />
                          <span>{app.cvFileName || 'Resume.pdf'}</span>
                        </div>
                      </td>
                      <td>
                        <span className="app-date">{app.dateFormatted || 'Recently'}</span>
                      </td>
                      <td>
                        <span className="app-status-badge status-review">
                          <span className="status-dot" /> {app.status || 'Under Review'}
                        </span>
                      </td>
                      <td>
                        <Link href={`/jobs/${app.jobId}`} className="btn-view-app-job">
                          View Details →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty-applications-box">
              <Briefcase size={36} className="empty-icon" />
              <h4>No submitted applications found</h4>
              <p>Apply directly to open roles without popup forms. Your applications will track here automatically.</p>
              <Link href="/jobs" className="btn-start-applying">
                Browse Verified Opportunities →
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
