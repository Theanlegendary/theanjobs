import React from 'react';
import { Link } from 'wouter';
import { Building2, Briefcase, BookmarkCheck, Newspaper, Layers } from 'lucide-react';

const footerColumns = [
  {
    title: 'About',
    links: [
      { label: 'Our Story', href: '/tech-topics' },
      { label: 'Careers', href: '/jobs' },
      { label: 'Our Staff Writers', href: '/tech-topics' },
      { label: 'Content Descriptions', href: '/policy-detail' },
    ],
  },
  {
    title: 'Get Involved',
    links: [
      { label: 'Recruit With Built In', href: '/post-job' },
      { label: 'Become an Expert Contributor', href: '/post-job' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Customer Support', href: '/candidate-dashboard' },
      { label: 'Share Feedback', href: '/candidate-dashboard' },
      { label: 'Report a Bug', href: '/candidate-dashboard' },
      { label: 'Job Tools + Career Resources', href: '/cv-builder' },
      { label: 'Browse Jobs', href: '/jobs' },
      { label: 'A-Z Dictionary', href: '/tech-topics' },
    ],
  },
  {
    title: 'Hubs',
    links: [
      { label: 'Our Sites', href: '/companies' },
      { label: 'Companies Directory', href: '/companies' },
      { label: 'Tech Topics', href: '/tech-topics' },
      { label: 'Best Tech Jobs', href: '/jobs' },
    ],
  },
];

const legalLinks = [
  { label: 'Learning Lab User Agreement', href: '/policy-detail' },
  { label: 'Accessibility Statement', href: '/policy-detail' },
  { label: 'Copyright Policy', href: '/policy-detail' },
  { label: 'Privacy Policy', href: '/policy-detail' },
  { label: 'Terms of Use', href: '/policy-detail' },
  { label: 'Your Privacy Choices/Cookie Settings', href: '/policy-detail' },
  { label: 'CA Notice of Collection', href: '/policy-detail' },
];

export function Footer() {
  return (
    <>
      <footer className="site-footer bg-[#f4f6fc] border-t border-slate-200 text-slate-800" role="contentinfo">
        <div className="footer-inner-container max-w-[1240px] mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="footer-main grid grid-cols-2 md:grid-cols-5 gap-8 sm:gap-10 mb-8">
            {/* Brand Column */}
            <div className="footer-brand-col col-span-2 md:col-span-1">
              <Link className="footer-brand inline-block mb-3.5" href="/" aria-label="Built In Home">
                <img
                  src="/sandbox-logo.png"
                  alt="Built In"
                  className="sandbox-footer-logo h-8 sm:h-9 w-auto object-contain"
                  loading="lazy"
                />
              </Link>
              <p className="text-xs text-slate-500 leading-relaxed max-w-[240px] mb-4 hidden sm:block">
                The premier platform for tech professionals, hiring intelligence, and career growth across global tech hubs.
              </p>
              <div className="copyright-mobile sm:hidden text-xs font-semibold text-slate-600 mb-2">
                &copy; 2026 Built In. All rights reserved.
              </div>
            </div>

            {/* Navigation Columns */}
            {footerColumns.map((column) => (
              <div className="footer-col" key={column.title}>
                <h3 className="font-bold text-slate-900 text-sm mb-3.5 tracking-tight">
                  {column.title}
                </h3>
                <ul className="space-y-2.5 list-none p-0 m-0">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="footer-link text-[13px] text-slate-600 hover:text-blue-600 transition-colors duration-150 inline-block font-normal"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Desktop Copyright */}
          <div className="copyright hidden sm:block text-xs font-bold text-slate-700 mt-6 mb-4">
            &copy; 2026 Built In. All rights reserved.
          </div>

          <hr className="footer-divider border-t border-slate-300 my-4" />

          {/* Bottom Legal Navigation */}
          <nav className="legal-links flex flex-wrap justify-between items-center gap-3 pt-2" aria-label="Legal and Compliance Navigation">
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="legal-link text-[11px] text-slate-500 hover:text-blue-600 hover:underline transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>

      {/* Mobile Sticky Bottom App Bar */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <Link href="/companies" className="mobile-nav-item">
          <Building2 className="w-4 h-4 mini-icon" />
          <span>Companies</span>
        </Link>
        <Link href="/jobs" className="mobile-nav-item">
          <Briefcase className="w-4 h-4 mini-icon" />
          <span>Jobs</span>
        </Link>
        <Link href="/candidate-dashboard" className="mobile-nav-item">
          <BookmarkCheck className="w-4 h-4 mini-icon" />
          <span>Tracker</span>
        </Link>
        <Link href="/tech-topics" className="mobile-nav-item">
          <Newspaper className="w-4 h-4 mini-icon" />
          <span>Articles</span>
        </Link>
        <Link href="/candidate-dashboard" className="mobile-nav-item">
          <Layers className="w-4 h-4 mini-icon" />
          <span>More</span>
        </Link>
      </nav>
    </>
  );
}
