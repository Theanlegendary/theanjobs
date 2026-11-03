import React, { useState } from 'react';
import { Link } from 'wouter';
import {
  FileText,
  Printer,
  Copy,
  Check,
  Sparkles,
  Download,
  RotateCcw,
  ShieldCheck,
  Briefcase,
  GraduationCap
} from 'lucide-react';

export default function CvBuilderPage() {
  const [name, setName] = useState('David Sterling');
  const [title, setTitle] = useState('Senior Distributed Systems & AI Infrastructure Engineer');
  const [email, setEmail] = useState('david.sterling@example.com');
  const [phone, setPhone] = useState('+1 (555) 321-9876');
  const [location, setLocation] = useState('San Francisco, CA (Open to Remote / Hybrid)');
  const [linkedin, setLinkedin] = useState('linkedin.com/in/davidsterling-systems');
  const [github, setGithub] = useState('github.com/dsterling-core');

  const [summary, setSummary] = useState(
    'Staff-level systems engineer with 8+ years designing high-concurrency streaming pipelines, low-latency microservices in Rust/Go, and distributed ML inference infrastructure handling multi-petabyte telemetry logs. Proven track record improving cluster compute efficiency by 35% and mentoring junior systems developers.'
  );

  const [skills, setSkills] = useState(
    'Rust, Go, Python, C++, Distributed Consensus (Raft/Paxos), Apache Kafka, ClickHouse, Kubernetes, Docker, PyTorch, CUDA, Linux Kernel Tuning, eBPF, gRPC, CI/CD, AWS, GCP'
  );

  const [exp1Title, setExp1Title] = useState('Lead Systems Architect • CloudScale Observability');
  const [exp1Period, setExp1Period] = useState('2023 - Present | San Francisco, CA');
  const [exp1Bullets, setExp1Bullets] = useState(
    '• Architected real-time log ingestion pipeline in Rust processing 120M events/sec with sub-5ms p99 latency.\n• Reduced cloud infrastructure spend by $240,000 annually through memory-efficient zero-copy ring buffers.\n• Spearheaded adoption of eBPF-based network telemetry across 1,800 Kubernetes worker nodes.'
  );

  const [exp2Title, setExp2Title] = useState('Senior Distributed Backend Engineer • DataEngineers Corp');
  const [exp2Period, setExp2Period] = useState('2020 - 2023 | Remote');
  const [exp2Bullets, setExp2Bullets] = useState(
    '• Designed distributed key-value storage engine scaling to 400TB across three multi-region AWS clusters.\n• Automated CI/CD pipeline reducing build and unit testing execution time from 42 mins to 6 mins.\n• Authored 14 core RFCs and mentored 6 junior and mid-level software engineers.'
  );

  const [education, setEducation] = useState(
    'B.S. in Computer Science & Applied Mathematics\nUniversity of California, Berkeley | 2016 - 2020 (GPA 3.86/4.00)'
  );

  const [copied, setCopied] = useState(false);

  const handleCopyText = () => {
    const plainText = `${name}
${title}
Email: ${email} | Tel: ${phone} | Location: ${location}
LinkedIn: ${linkedin} | GitHub: ${github}

================================================================================
PROFESSIONAL SUMMARY
================================================================================
${summary}

================================================================================
TECHNICAL EXPERTISE & SKILLS
================================================================================
${skills}

================================================================================
PROFESSIONAL EXPERIENCE
================================================================================
${exp1Title}
${exp1Period}
${exp1Bullets}

${exp2Title}
${exp2Period}
${exp2Bullets}

================================================================================
EDUCATION & ACADEMIC CREDENTIALS
================================================================================
${education}
`;
    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const calculateAtsScore = () => {
    let score = 70;
    if (name.trim()) score += 5;
    if (email.includes('@')) score += 5;
    if (summary.length > 80) score += 5;
    if (skills.includes(',')) score += 5;
    if (exp1Bullets.includes('•')) score += 5;
    if (education.length > 20) score += 5;
    return Math.min(score, 98);
  };

  const atsScore = calculateAtsScore();

  return (
    <div className="cv-builder-page-wrapper">
      {/* 1. Breadcrumbs */}
      <div className="cv-breadcrumb-bar">
        <div className="container cv-breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Professional ATS Resume Builder</span>
        </div>
      </div>

      {/* 2. Top Banner */}
      <section className="cv-builder-header-banner">
        <div className="container banner-inner">
          <div>
            <span className="builder-pill-tag">100% ATS PARSER COMPLIANT</span>
            <h1 className="builder-title">Sandbox ATS Resume Builder</h1>
            <p className="builder-subtitle">
              Engineered specifically for engineering, research, and logistics candidates. Clean, single-column layout strictly formatted for Workday, Greenhouse, and Lever ATS parsers.
            </p>
          </div>

          <div className="builder-actions-top">
            <button type="button" onClick={handleCopyText} className="btn-copy-plain">
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Plain Text'}</span>
            </button>
            <button type="button" onClick={handlePrint} className="btn-print-pdf">
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. Main Builder Workspace: 2-Columns */}
      <main className="container cv-workspace-grid">
        {/* Left Column: Interactive Form Controls */}
        <div className="cv-editor-column">
          <div className="editor-card">
            <h3 className="editor-section-heading">1. Personal & Contact Information</h3>
            <div className="form-group">
              <label>Full Legal Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Target Professional Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
            </div>
            <div className="form-group">
              <label>Location & Work Eligibility</label>
              <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="form-grid-2">
              <div className="form-group">
                <label>LinkedIn URL</label>
                <input type="text" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </div>
              <div className="form-group">
                <label>GitHub / Portfolio</label>
                <input type="text" value={github} onChange={(e) => setGithub(e.target.value)} />
              </div>
            </div>
          </div>

          <div className="editor-card">
            <h3 className="editor-section-heading">2. Executive Summary</h3>
            <div className="form-group">
              <label>Professional Bio (Quantify your impact)</label>
              <textarea
                rows={4}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
              />
            </div>
          </div>

          <div className="editor-card">
            <h3 className="editor-section-heading">3. Technical Skills & Tools</h3>
            <div className="form-group">
              <label>Keywords & Technologies (Comma-separated)</label>
              <textarea
                rows={3}
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>
          </div>

          <div className="editor-card">
            <h3 className="editor-section-heading">4. Professional Experience</h3>
            <div className="form-group">
              <label>Role 1: Title & Company</label>
              <input type="text" value={exp1Title} onChange={(e) => setExp1Title(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Role 1: Dates & Location</label>
              <input type="text" value={exp1Period} onChange={(e) => setExp1Period(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Role 1: Bullets & Metric Achievements</label>
              <textarea
                rows={4}
                value={exp1Bullets}
                onChange={(e) => setExp1Bullets(e.target.value)}
              />
            </div>

            <hr className="editor-sep" />

            <div className="form-group">
              <label>Role 2: Title & Company</label>
              <input type="text" value={exp2Title} onChange={(e) => setExp2Title(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Role 2: Dates & Location</label>
              <input type="text" value={exp2Period} onChange={(e) => setExp2Period(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Role 2: Bullets & Metric Achievements</label>
              <textarea
                rows={4}
                value={exp2Bullets}
                onChange={(e) => setExp2Bullets(e.target.value)}
              />
            </div>
          </div>

          <div className="editor-card">
            <h3 className="editor-section-heading">5. Education & Credentials</h3>
            <div className="form-group">
              <label>Degrees, Institutions & Honors</label>
              <textarea
                rows={3}
                value={education}
                onChange={(e) => setEducation(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Right Column: Live Real-Time ATS Sheet Preview */}
        <div className="cv-preview-column">
          {/* Score Meter Widget */}
          <div className="ats-score-meter-box">
            <div className="score-top-row">
              <div className="score-label-group">
                <Sparkles size={18} className="score-sparkle" />
                <strong>ATS Compatibility Index</strong>
              </div>
              <span className="score-percentage">{atsScore}% Optimized</span>
            </div>
            <div className="score-bar-bg">
              <div className="score-bar-fill" style={{ width: `${atsScore}%` }} />
            </div>
            <p className="score-tip">
              Standardized formatting detected. No multi-column tables, text boxes, or floating elements that confuse automated parser algorithms.
            </p>
          </div>

          {/* Printable White Resume Paper */}
          <div className="live-resume-paper" id="printable-resume-sheet">
            <header className="resume-header">
              <h1 className="resume-name">{name || 'Your Full Name'}</h1>
              <div className="resume-sub-title">{title || 'Target Job Title'}</div>
              <div className="resume-contact-line">
                <span>{email}</span> • <span>{phone}</span> • <span>{location}</span>
              </div>
              <div className="resume-contact-line">
                <span>{linkedin}</span> • <span>{github}</span>
              </div>
            </header>

            <section className="resume-section">
              <h2 className="resume-section-title">PROFESSIONAL SUMMARY</h2>
              <p className="resume-text">{summary}</p>
            </section>

            <section className="resume-section">
              <h2 className="resume-section-title">CORE SKILLS & TECHNOLOGIES</h2>
              <p className="resume-text">{skills}</p>
            </section>

            <section className="resume-section">
              <h2 className="resume-section-title">PROFESSIONAL EXPERIENCE</h2>
              <div className="resume-job-entry">
                <div className="job-entry-header">
                  <strong>{exp1Title}</strong>
                  <span>{exp1Period}</span>
                </div>
                <div className="job-entry-bullets">
                  {exp1Bullets.split('\n').map((line, idx) => (
                    <div key={idx} className="bullet-line">{line}</div>
                  ))}
                </div>
              </div>

              <div className="resume-job-entry">
                <div className="job-entry-header">
                  <strong>{exp2Title}</strong>
                  <span>{exp2Period}</span>
                </div>
                <div className="job-entry-bullets">
                  {exp2Bullets.split('\n').map((line, idx) => (
                    <div key={idx} className="bullet-line">{line}</div>
                  ))}
                </div>
              </div>
            </section>

            <section className="resume-section">
              <h2 className="resume-section-title">EDUCATION & CREDENTIALS</h2>
              <div className="resume-text">
                {education.split('\n').map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
