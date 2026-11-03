import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import {
  Users,
  CheckCircle,
  Clock,
  FileText,
  Search,
  Filter,
  PlusCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Eye
} from 'lucide-react';

export default function EmployerAts() {
  const [candidates, setCandidates] = useState<any[]>([]);
  const [filterStage, setFilterStage] = useState('all');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('thesandbox_ats_candidates');
      if (stored) {
        setCandidates(JSON.parse(stored));
      } else {
        // Sample candidate records
        setCandidates([
          {
            id: 'cand-1',
            name: 'Alex Morgan',
            role: 'Summer 2026 AI Research & Engineering Intern',
            company: 'Datadog',
            email: 'alex.morgan@stanford.edu',
            phone: '+1 (555) 432-8765',
            date: 'Today',
            status: 'Screening',
            score: '96% Match'
          },
          {
            id: 'cand-2',
            name: 'Nguyen Minh Tri',
            role: 'Senior Ocean Freight Operations Specialist',
            company: 'Viconship Container Corporation',
            email: 'tri.nguyen@vla.com.vn',
            phone: '(+84) 90 987 6543',
            date: 'Yesterday',
            status: 'Interview',
            score: '94% Match'
          },
          {
            id: 'cand-3',
            name: 'Chloe Tan',
            role: 'Frontend Platform & Web Performance Intern',
            company: 'ByteDance',
            email: 'chloe.tan@nus.edu.sg',
            phone: '+65 9123 4567',
            date: '3 days ago',
            status: 'Offered',
            score: '98% Match'
          }
        ]);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const advanceStage = (id: string, newStage: string) => {
    const updated = candidates.map((c) => (c.id === id ? { ...c, status: newStage } : c));
    setCandidates(updated);
    try {
      localStorage.setItem('thesandbox_ats_candidates', JSON.stringify(updated));
    } catch (e) {}
  };

  const filtered = filterStage === 'all' ? candidates : candidates.filter((c) => c.status.toLowerCase() === filterStage.toLowerCase());

  return (
    <div className="employer-ats-page-container">
      {/* 1. Breadcrumbs */}
      <div className="ats-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Employer ATS Candidate Pipeline</span>
        </div>
      </div>

      {/* 2. Top Banner */}
      <section className="ats-hero-banner">
        <div className="container banner-inner">
          <div>
            <span className="ats-pill-tag">RECRUITER ENTERPRISE COCKPIT</span>
            <h1 className="ats-title">Candidate Pipeline & ATS Management</h1>
            <p className="ats-subtitle">
              Review inbound candidates, inspect AI match scores, and progress applicants across recruitment stages with zero clutter.
            </p>
          </div>
          <div className="ats-banner-actions">
            <Link href="/post-job" className="btn-ats-post">
              <PlusCircle size={15} /> Post New Verified Job
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Main ATS Pipeline */}
      <main className="container ats-main-grid">
        {/* Stage Filter Pills */}
        <div className="ats-filter-bar">
          <div className="filter-pills-row">
            {['all', 'New', 'Screening', 'Interview', 'Offered'].map((stg) => (
              <button
                key={stg}
                type="button"
                className={`stage-pill-btn ${filterStage.toLowerCase() === stg.toLowerCase() ? 'active' : ''}`}
                onClick={() => setFilterStage(stg)}
              >
                {stg === 'all' ? 'All Applicants' : stg}
              </button>
            ))}
          </div>
          <span className="ats-total-count">{filtered.length} Inbound Candidates</span>
        </div>

        {/* Candidates Table */}
        <div className="ats-table-card">
          <table className="ats-table">
            <thead>
              <tr>
                <th>Applicant Information</th>
                <th>Target Position</th>
                <th>AI Match Score</th>
                <th>Applied Date</th>
                <th>Pipeline Stage</th>
                <th>Move Stage</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((cand) => (
                <tr key={cand.id}>
                  <td>
                    <div className="cand-name">{cand.name}</div>
                    <div className="cand-contact">{cand.email} • {cand.phone}</div>
                  </td>
                  <td>
                    <div className="cand-role">{cand.role}</div>
                    <div className="cand-company">{cand.company}</div>
                  </td>
                  <td>
                    <span className="cand-score-tag">
                      <Sparkles size={13} /> {cand.score || '95% Match'}
                    </span>
                  </td>
                  <td>
                    <span className="cand-date">{cand.date}</span>
                  </td>
                  <td>
                    <span className={`cand-stage-badge stage-${cand.status.toLowerCase()}`}>
                      {cand.status}
                    </span>
                  </td>
                  <td>
                    <select
                      className="stage-select-dropdown"
                      value={cand.status}
                      onChange={(e) => advanceStage(cand.id, e.target.value)}
                    >
                      <option value="New">New</option>
                      <option value="Screening">Screening</option>
                      <option value="Interview">Interview</option>
                      <option value="Offered">Offered</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
