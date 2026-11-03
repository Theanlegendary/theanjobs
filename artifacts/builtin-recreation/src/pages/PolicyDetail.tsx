import React from 'react';
import { Link } from 'wouter';
import {
  FileText,
  ShieldCheck,
  Building,
  CheckCircle,
  Clock,
  BookOpen,
  ArrowRight
} from 'lucide-react';

export default function PolicyDetail() {
  return (
    <div className="policy-detail-page-container">
      {/* 1. Breadcrumbs */}
      <div className="policy-breadcrumb-bar">
        <div className="container breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">Decree No. 163/2017/ND-CP Logistics Regulatory Gazette</span>
        </div>
      </div>

      {/* 2. Banner */}
      <section className="policy-hero-banner">
        <div className="container banner-inner">
          <span className="policy-pill-tag">OFFICIAL REGULATORY GAZETTE</span>
          <h1 className="policy-title">
            Decree No. 163/2017/ND-CP on Logistics Services Business in Vietnam
          </h1>
          <p className="policy-sub">
            The foundational legal framework governing logistics service investment conditions, foreign ownership thresholds, and licensing requirements across seaport, air cargo, and freight forwarding enterprises.
          </p>
        </div>
      </section>

      {/* 3. Main Policy Content */}
      <main className="container policy-main-grid">
        <div className="policy-content-card">
          <h3>Key Regulatory Provisions & Foreign Investment Caps</h3>

          <div className="policy-section-block">
            <h4>Article 3: Classification of Logistics Services</h4>
            <p>
              Logistics services governed under this Decree include container handling services, warehousing services, freight forwarding agency services, customs brokerage, and multimodal transport services across maritime, inland waterway, rail, and road networks.
            </p>
          </div>

          <div className="policy-section-block">
            <h4>Article 4: Conditions for Foreign Investors</h4>
            <p>
              Foreign investors engaging in freight forwarding services must establish business entities complying with specific capital participation thresholds:
            </p>
            <ul className="policy-bullets">
              <li><strong>Container Handling & Seaport Berths:</strong> Maximum foreign equity participation of 50%.</li>
              <li><strong>Customs Clearance Services:</strong> 100% domestic joint venture requirement or foreign equity subject to Ministry of Transport licensing.</li>
              <li><strong>Air Freight & Cargo Handling:</strong> Subject to civil aviation foreign ownership ceilings (49%).</li>
              <li><strong>Multimodal Transport Services:</strong> Foreign forwarders must hold Authorized Economic Operator (AEO) status or partner with licensed Vietnamese carriers.</li>
            </ul>
          </div>

          <div className="policy-section-block">
            <h4>Article 5: Limitation of Liability</h4>
            <p>
              Where the customer does not declare the value of goods prior to transport, the logistics provider’s liability shall not exceed 500 million VND per claim or the equivalent established by international conventions ratified by Vietnam.
            </p>
          </div>
        </div>

        <aside className="policy-sidebar">
          <div className="policy-sidebar-card">
            <h4>Official Documents</h4>
            <div className="doc-link-item">
              <FileText size={16} />
              <span>Full Text: Decree 163/2017/ND-CP (PDF)</span>
            </div>
            <div className="doc-link-item">
              <FileText size={16} />
              <span>Circular 80/2021/TT-BTC Customs EDI Guide</span>
            </div>
            <Link href="/companies" className="btn-browse-accredited-cos">
              View Accredited Tier-1 Companies →
            </Link>
          </div>
        </aside>
      </main>
    </div>
  );
}
