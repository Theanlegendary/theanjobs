import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  GraduationCap,
  Award,
  Clock,
  BookOpen,
  CheckCircle,
  FileCheck2,
  Calendar,
  Users,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export default function CourseDetail() {
  const [enrolled, setEnrolled] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const modules = [
    { num: 'Module 01', title: 'Multimodal Transport & Global Trade Corridors', hours: '40 Hours' },
    { num: 'Module 02', title: 'Ocean Container Shipping & Deep-Draft Port Operations', hours: '45 Hours' },
    { num: 'Module 03', title: 'Incoterms 2020 & International Maritime Law', hours: '35 Hours' },
    { num: 'Module 04', title: 'Customs EDI, VNACCS & AEO Security Clearance', hours: '30 Hours' },
    { num: 'Module 05', title: 'Pharmaceutical Cold Chain & Dangerous Goods (DG)', hours: '35 Hours' },
    { num: 'Module 06', title: 'Supply Chain Analytics, Navis N4 & CargoWise ERP', hours: '40 Hours' }
  ];

  const handleEnroll = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    setEnrolled(true);
  };

  return (
    <div className="course-detail-page-container">
      {/* 1. Breadcrumbs */}
      <div className="course-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">FIATA Higher International Diploma in Supply Chain</span>
        </div>
      </div>

      {/* 2. Hero Section */}
      <section className="course-hero-banner">
        <div className="container banner-inner">
          <span className="course-pill-tag">GLOBAL ACCREDITED CREDENTIAL</span>
          <h1 className="course-title">
            FIATA Higher International Diploma in Supply Chain Management
          </h1>
          <p className="course-sub">
            The internationally benchmarked professional certification for freight forwarders, terminal coordinators, and cross-border logistics directors. Delivered in Vietnam with direct FIATA Switzerland accreditation.
          </p>

          <div className="course-meta-tags-row">
            <span><Award size={14} /> FIATA Zurich Accredited</span>
            <span>•</span>
            <span><Clock size={14} /> 225 Lecture & Lab Hours</span>
            <span>•</span>
            <span><GraduationCap size={14} /> Bilingual EN / VN Instruction</span>
          </div>
        </div>
      </section>

      {/* 3. Main Grid */}
      <main className="container course-main-grid">
        <div className="course-left-col">
          {/* Overview */}
          <div className="course-card">
            <h3>Diploma Syllabus & Academic Scope</h3>
            <p>
              Designed in partnership with the International Federation of Freight Forwarders Associations (FIATA) and the Vietnam Logistics Research and Development Institute (VLI). This diploma bridges operational port management with advanced supply chain digital transformation.
            </p>

            <h4 className="modules-heading">Core Curriculum Modules (225 Total Hours)</h4>
            <div className="modules-list">
              {modules.map((m, i) => (
                <div key={i} className="module-item-card">
                  <span className="module-badge">{m.num}</span>
                  <div className="module-info">
                    <h5>{m.title}</h5>
                    <span className="module-hours">{m.hours}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: On-Page Enrollment */}
        <aside className="course-right-col">
          <div className="enroll-card">
            <span className="enroll-tag">COHORT 2026 ADMISSIONS OPEN</span>
            <h3>Enroll in Diploma Cohort</h3>
            <p className="enroll-sub">Complete on-page registration to receive the complete syllabus, tuition grants, and lecture schedules.</p>

            {enrolled ? (
              <div className="enroll-success">
                <CheckCircle size={40} className="success-icon" />
                <h4>Admissions Application Received!</h4>
                <p>Welcome, {name}. The academic coordinator has dispatched syllabus details and invoice documentation to <strong>{email}</strong>.</p>
              </div>
            ) : (
              <form onSubmit={handleEnroll} className="enroll-form">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Elena Rostova"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Business or University Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="elena@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn-enroll-submit">
                  Transmit Cohort Application
                </button>
              </form>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
}
