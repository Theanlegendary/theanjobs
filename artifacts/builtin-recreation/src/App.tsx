import { useState, type AnchorHTMLAttributes, type FormEvent } from 'react';
import { Search, Menu, X, ChevronRight } from 'lucide-react';

const companyLogos = [
  ['Gitlab Logo', 'https://static.builtin.com/dist/images/home/topCompanies/gitlab.svg', 'https://builtin.com/company/gitlab'],
  ['Braze Logo', 'https://static.builtin.com/dist/images/home/topCompanies/braze.svg', 'https://builtin.com/company/braze'],
  ['Capital One Logo', 'https://static.builtin.com/dist/images/home/topCompanies/capitalone.svg', 'https://builtin.com/company/capital-one'],
  ['ServiceNow Logo', 'https://static.builtin.com/dist/images/home/topCompanies/servicenow.svg', 'https://builtin.com/company/servicenow'],
  ['Datadog Logo', 'https://static.builtin.com/dist/images/home/topCompanies/datadog.svg', 'https://builtin.com/company/datadog'],
  ['GM Logo', 'https://static.builtin.com/dist/images/home/topCompanies/gm.svg', 'https://builtin.com/company/general-motors'],
  ['Pfizer Logo', 'https://static.builtin.com/dist/images/home/topCompanies/pfizer.svg', 'https://builtin.com/company/pfizer'],
  ['PNC Logo', 'https://static.builtin.com/dist/images/home/topCompanies/pnc.svg', 'https://builtin.com/company/pnc-financial-services-group'],
];

const benefits = [
  ['CompanyInsights_Home.svg', 'Company Insights', 'For 100K+ Employers'],
  ['Jobs_Home.svg', '500K+ Jobs', 'All In One Place'],
  ['AIPowered_Home.svg', 'AI-Powered', 'Platform For Today'],
  ['GlobalPresence_Home.svg', 'Global Presence', 'Local Feel'],
];

const exploreGroups = [
  {
    title: 'Remote',
    links: [
      ['Tech Companies', '/companies'],
      ['Companies Hiring Remotely', '/companies/hiring/remote'],
      ['Fully Remote Companies', '/companies/location/fully-remote'],
    ],
  },
  {
    title: 'More Resources',
    links: [
      ['Tech + Startup Salaries', '/salaries'],
      ['Tech News', '/tech-topics'],
      ['Tech Hubs', '/tech-hubs'],
      ['Tech Dictionary', '/tech-dictionary'],
    ],
  },
];

const browseData = `
What's It Like to Work at 2K?|https://builtin.com/company/2k/faq/workplace-perception
What's It Like to Work at Achieve?|https://builtin.com/company/achieve/faq/workplace-perception
What's It Like to Work at Adyen?|https://builtin.com/company/adyen/faq/workplace-perception
What's It Like to Work at Amalgamated Sugar?|https://builtin.com/company/amalgamated-sugar/faq/workplace-perception
What's It Like to Work at Applied Systems?|https://builtin.com/company/applied-systems/faq/workplace-perception
What's It Like to Work at Arm?|https://builtin.com/company/arm/faq/workplace-perception
What's It Like to Work at Atlassian?|https://builtin.com/company/atlassian/faq/workplace-perception
What's It Like to Work at BlackRock?|https://builtin.com/company/blackrock/faq/workplace-perception
What's It Like to Work at Block?|https://builtin.com/company/block-inc/faq/workplace-perception
What's It Like to Work at Capco?|https://builtin.com/company/capco/faq/workplace-perception
What's It Like to Work at Cargill?|https://builtin.com/company/cargill/faq/workplace-perception
What's It Like to Work at CarGurus?|https://builtin.com/company/cargurus/faq/workplace-perception
What's It Like to Work at CDW?|https://builtin.com/company/cdw/faq/workplace-perception
What's It Like to Work at Celonis?|https://builtin.com/company/celonis/faq/workplace-perception
What's It Like to Work at Cencora?|https://builtin.com/company/cencora/faq/workplace-perception
What's It Like to Work at Chamberlain Group?|https://builtin.com/company/chamberlain-group/faq/workplace-perception
What's It Like to Work at Comcast?|https://builtin.com/company/comcast-3/faq/workplace-perception
What's It Like to Work at Coupa?|https://builtin.com/company/coupa-software-0/faq/workplace-perception
What's It Like to Work at Cox Enterprises?|https://builtin.com/company/cox-enterprises/faq/workplace-perception
What's It Like to Work at Ericsson?|https://builtin.com/company/ericsson/faq/workplace-perception
What's It Like to Work at Federal Reserve Bank of Boston?|https://builtin.com/company/federal-reserve-bank-boston/faq/workplace-perception
What's It Like to Work at Federal Reserve Bank of Chicago?|https://builtin.com/company/federal-reserve-bank-chicago/faq/workplace-perception
What's It Like to Work at GitLab?|https://builtin.com/company/gitlab/faq/workplace-perception
What's It Like to Work at Gusto?|https://builtin.com/company/gusto/faq/workplace-perception
What's It Like to Work at HERE Technologies?|https://builtin.com/company/here/faq/workplace-perception
What's It Like to Work at Mastercard?|https://builtin.com/company/mastercard/faq/workplace-perception
What's It Like to Work at Mondelēz International?|https://builtin.com/company/mondelez-international/faq/workplace-perception
What's It Like to Work at Optimum?|https://builtin.com/company/optimum/faq/workplace-perception
What's It Like to Work at PEAK6?|https://builtin.com/company/peak6/faq/workplace-perception
What's It Like to Work at Pluralsight?|https://builtin.com/company/pluralsight/faq/workplace-perception
What's It Like to Work at Remitly?|https://builtin.com/company/remitly/faq/workplace-perception
What's It Like to Work at Spectrum?|https://builtin.com/company/spectrum-0/faq/workplace-perception
What's It Like to Work at Take-Two Interactive Software?|https://builtin.com/company/take-two-interactive-software/faq/workplace-perception
What's It Like to Work at Tapestry - Coach and Kate Spade?|https://builtin.com/company/tapestry/faq/workplace-perception
What's It Like to Work at Webflow?|https://builtin.com/company/webflow/faq/workplace-perception
Best Places To Work|https://builtin.com/awards/us/current/best-places-to-work
Best Places To Work in Atlanta, GA|https://builtin.com/awards/atlanta/current/best-places-to-work
Best Places To Work in Austin, TX|https://builtin.com/awards/austin/current/best-places-to-work
Best Places To Work in Boston, MA|https://builtin.com/awards/boston/current/best-places-to-work
Best Places To Work in Chicago, IL|https://builtin.com/awards/chicago/current/best-places-to-work
Best Places To Work in Colorado|https://builtin.com/awards/colorado/current/best-places-to-work
Best Places To Work in Dallas, TX|https://builtin.com/awards/dallas/current/best-places-to-work
Best Places To Work in Houston, TX|https://builtin.com/awards/houston/current/best-places-to-work
Best Places To Work in Los Angeles, CA|https://builtin.com/awards/los-angeles/current/best-places-to-work
Best Places To Work in Miami, FL|https://builtin.com/awards/miami/current/best-places-to-work
Best Places To Work in NYC|https://builtin.com/awards/new-york-city/current/best-places-to-work
Best Places To Work in San Diego, CA|https://builtin.com/awards/san-diego/current/best-places-to-work
Best Places To Work in San Francisco, CA|https://builtin.com/awards/san-francisco/current/best-places-to-work
Best Places To Work in Seattle, WA|https://builtin.com/awards/seattle/current/best-places-to-work
Best Places To Work in Washington, DC|https://builtin.com/awards/washington-dc/current/best-places-to-work
Best Remote Companies To Work For|https://builtin.com/awards/remote/current/best-places-to-work
Tech Jobs & Startup Jobs in Atlanta, GA|https://builtin.com/jobs/atlanta
Tech Jobs & Startup Jobs in Baltimore, MD|https://builtin.com/jobs/baltimore
Tech Jobs & Startup Jobs in Birmingham, AL|https://builtin.com/jobs/birmingham
Tech Jobs & Startup Jobs in Charlotte, NC|https://builtin.com/jobs/charlotte
Tech Jobs & Startup Jobs in Columbus, OH|https://builtin.com/jobs/columbus
Tech Jobs & Startup Jobs in Dallas, TX|https://builtin.com/jobs/dallas-fort-worth
Tech Jobs & Startup Jobs in Washington, DC|https://builtin.com/jobs/washington-dc
Tech Jobs & Startup Jobs in Detroit, MI|https://builtin.com/jobs/detroit
Tech Jobs & Startup Jobs in Houston, TX|https://builtin.com/jobs/houston
Tech Jobs & Startup Jobs in Jacksonville, FL|https://builtin.com/jobs/jacksonville
Tech Jobs & Startup Jobs in Kansas City, MO|https://builtin.com/jobs/kansas-city
Tech Jobs & Startup Jobs in Las Vegas, NV|https://builtin.com/jobs/las-vegas
Tech Jobs & Startup Jobs in Miami, FL|https://builtin.com/jobs/miami
Tech Jobs & Startup Jobs in Minneapolis, MN|https://builtin.com/jobs/minneapolis-saint-paul
Tech Jobs & Startup Jobs in Nashville, TN|https://builtin.com/jobs/nashville
Tech Jobs & Startup Jobs in Orlando, FL|https://builtin.com/jobs/orlando
Tech Jobs & Startup Jobs in Philadelphia, PA|https://builtin.com/jobs/philadelphia
Tech Jobs & Startup Jobs in Phoenix, AZ|https://builtin.com/jobs/phoenix-mesa-scottsdale
Tech Jobs & Startup Jobs in Pittsburgh, PA|https://builtin.com/jobs/pittsburgh
Tech Jobs & Startup Jobs in Portland, OR|https://builtin.com/jobs/portland
Tech Jobs & Startup Jobs in Raleigh, NC|https://builtin.com/jobs/raleigh-durham
Tech Jobs & Startup Jobs in Salt Lake City, UT|https://builtin.com/jobs/salt-lake-city
Tech Jobs & Startup Jobs in San Antonio, TX|https://builtin.com/jobs/san-antonio
Tech Jobs & Startup Jobs in San Diego, CA|https://builtin.com/jobs/san-diego
Tech Jobs & Startup Jobs in St. Louis, MO|https://builtin.com/jobs/st-louis
Tech Jobs & Startup Jobs in Tampa Bay, FL|https://builtin.com/jobs/tampa-bay
Remote Jobs in Atlanta, GA|https://builtin.com/jobs/remote/atlanta
Remote Jobs in Baltimore, MD|https://builtin.com/jobs/remote/baltimore
Remote Jobs in Birmingham, AL|https://builtin.com/jobs/remote/birmingham
Remote Jobs in Charlotte, NC|https://builtin.com/jobs/remote/charlotte
Remote Jobs in Columbus, OH|https://builtin.com/jobs/remote/columbus
Remote Jobs in Dallas, TX|https://builtin.com/jobs/remote/dallas-fort-worth
Remote Jobs in Washington, DC|https://builtin.com/jobs/remote/washington-dc
Remote Jobs in Detroit, MI|https://builtin.com/jobs/remote/detroit
Remote Jobs in Houston, TX|https://builtin.com/jobs/remote/houston
Remote Jobs in Jacksonville, FL|https://builtin.com/jobs/remote/jacksonville
Remote Jobs in Kansas City, MO|https://builtin.com/jobs/remote/kansas-city
Remote Jobs in Las Vegas, NV|https://builtin.com/jobs/remote/las-vegas
Remote Jobs in Miami, FL|https://builtin.com/jobs/remote/miami
Remote Jobs in Minneapolis, MN|https://builtin.com/jobs/remote/minneapolis-saint-paul
Remote Jobs in Nashville, TN|https://builtin.com/jobs/remote/nashville
Remote Jobs in Orlando, FL|https://builtin.com/jobs/remote/orlando
Remote Jobs in Philadelphia, PA|https://builtin.com/jobs/remote/philadelphia
Remote Jobs in Phoenix, AZ|https://builtin.com/jobs/remote/phoenix-mesa-scottsdale
Remote Jobs in Pittsburgh, PA|https://builtin.com/jobs/remote/pittsburgh
Remote Jobs in Portland, OR|https://builtin.com/jobs/remote/portland
Remote Jobs in Raleigh, NC|https://builtin.com/jobs/remote/raleigh-durham
Remote Jobs in Salt Lake City, UT|https://builtin.com/jobs/remote/salt-lake-city
Remote Jobs in San Antonio, TX|https://builtin.com/jobs/remote/san-antonio
Remote Jobs in San Diego, CA|https://builtin.com/jobs/remote/san-diego
Remote Jobs in St. Louis, MO|https://builtin.com/jobs/remote/st-louis
Remote Jobs in Tampa Bay, FL|https://builtin.com/jobs/remote/tampa-bay
Biotech Jobs in San Diego, CA|https://builtin.com/jobs/san-diego/biotech
Cybersecurity Jobs in Atlanta, GA|https://builtin.com/jobs/atlanta/cybersecurity-it/security
Cybersecurity Jobs in Dallas, TX|https://builtin.com/jobs/dallas-fort-worth/cybersecurity-it/security
Marketing Jobs in Atlanta, GA|https://builtin.com/jobs/atlanta/marketing
Marketing Jobs in Dallas, TX|https://builtin.com/jobs/dallas-fort-worth/marketing
Marketing Jobs in Washington, DC|https://builtin.com/jobs/washington-dc/marketing
Marketing Jobs in Houston, TX|https://builtin.com/jobs/houston/marketing
Marketing Jobs in Philadelphia, PA|https://builtin.com/jobs/philadelphia/marketing
Marketing Jobs in Phoenix, AZ|https://builtin.com/jobs/phoenix-mesa-scottsdale/marketing
Marketing Jobs in San Diego, CA|https://builtin.com/jobs/san-diego/marketing
Remote Data Science Jobs|https://builtin.com/jobs/remote/data-analytics/data-science
Remote Design & UX Jobs|https://builtin.com/jobs/remote/design-ux
Remote Marketing Jobs|https://builtin.com/jobs/remote/marketing
Remote Product Manager Jobs|https://builtin.com/jobs/remote/product
Remote Sales Jobs|https://builtin.com/jobs/remote/sales
Remote Software Engineer Jobs|https://builtin.com/jobs/remote/dev-engineering
Sales Jobs in Dallas, TX|https://builtin.com/jobs/dallas-fort-worth/sales
Sales Jobs in Atlanta, GA|https://builtin.com/jobs/atlanta/sales
Sales Jobs in Houston, TX|https://builtin.com/jobs/houston/sales
Sales Jobs in Phoenix, AZ|https://builtin.com/jobs/phoenix-mesa-scottsdale/sales
Sales Jobs in Raleigh, NC|https://builtin.com/jobs/raleigh-durham/sales
Sales Jobs in San Diego, CA|https://builtin.com/jobs/san-diego/sales
Software Engineer Jobs in Atlanta, GA|https://builtin.com/jobs/atlanta/dev-engineering
Software Engineer Jobs in Dallas, TX|https://builtin.com/jobs/dallas-fort-worth/dev-engineering
Software Engineer Jobs in Houston, TX|https://builtin.com/jobs/houston/dev-engineering
Software Engineer Jobs in San Diego, CA|https://builtin.com/jobs/san-diego/dev-engineering
`;
const browseLinks = browseData.trim().split('\n').map((line) => {
  const divider = line.indexOf('|');
  return [line.slice(0, divider), line.slice(divider + 1)];
});

const footerColumns = [
  {
    title: 'About',
    links: [
      ['Our Story', 'https://builtin.com/our-story'],
      ['Careers', 'https://employers.builtin.com/careers/'],
      ['Our Staff Writers', 'https://builtin.com/our-staff'],
      ['Content Descriptions', 'https://builtin.com/content-descriptions'],
    ],
  },
  {
    title: 'Get Involved',
    links: [
      ['Recruit With Built In', 'https://employers.builtin.com/membership?utm_medium=BIReferral&utm_source=foremployers'],
      ['Become an Expert Contributor', 'https://builtin.com/expert-contributors'],
    ],
  },
  {
    title: 'Resources',
    links: [
      ['Customer Support', 'https://knowledgebase.builtin.com/s/'],
      ['Share Feedback', 'https://form.jotform.com/223044927257054'],
      ['Report a Bug', 'https://knowledgebase.builtin.com/s/contactsupport'],
      ['Job Tools + Career Resources', 'https://builtin.com/articles/grow-your-career'],
      ['Browse Jobs', 'https://builtin.com/browse-jobs'],
      ['A-Z', 'https://builtin.com/tech-dictionary'],
    ],
  },
  {
    title: 'Hubs',
    links: [['Our Sites', 'https://builtin.com/our-sites']],
  },
];

const legalLinks = [
  ['Learning Lab User Agreement', 'https://builtin.com/learning-lab-user-agreement'],
  ['Accessibility Statement', 'https://builtin.com/accessibility-statement'],
  ['Copyright Policy', 'https://builtin.com/copyright-policy'],
  ['Privacy Policy', 'https://builtin.com/privacy-policy'],
  ['Terms of Use', 'https://builtin.com/community-terms-of-use'],
  ['Your Privacy Choices/Cookie Settings', 'https://builtin.com/california-do-not-sell-my-information'],
  ['CA Notice of Collection', 'https://builtin.com/ca-notice-collection'],
];

function InternalLink({ href, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  const destination = href?.startsWith('/') ? `https://builtin.com${href}` : href;
  return <a href={destination} {...props}>{children}</a>;
}

function App() {
  const [expanded, setExpanded] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = `https://builtin.com/jobs?search=${encodeURIComponent(searchTerm)}`;
  };

  const navItems = [
    ['Companies', 'https://builtin.com/companies'],
    ['Jobs', 'https://builtin.com/jobs'],
    ['Articles', 'https://builtin.com/tech-topics'],
  ];

  return (
    <div className="page-shell">
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="/" aria-label="Built In home" data-testid="brand-home">
            <img src="https://static.builtin.com/dist/images/bi-logo.svg" alt="Built In Logo" />
          </a>
          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map(([label, href]) => <InternalLink key={label} href={href}>{label}</InternalLink>)}
          </nav>
          <div className="account-nav">
            <button className="icon-button search-trigger" type="button" aria-label="Search" aria-expanded={searchOpen} onClick={() => setSearchOpen(!searchOpen)} data-testid="search-toggle">
              <Search size={19} strokeWidth={1.7} />
            </button>
            <a href="https://builtin.com/auth/signup?destination=%2f">Join</a>
            <span aria-hidden="true">|</span>
            <a href="https://builtin.com/auth/login?destination=%2f">Log In</a>
            <a className="employer-link" href="https://employers.builtin.com?utm_medium=BIReferral&utm_source=foremployers">FOR EMPLOYERS</a>
          </div>
          <div className="mobile-controls">
            <button className="icon-button mobile-menu-button" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-toggle">
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {searchOpen && (
          <div className="search-popover">
            <form className="search-form" onSubmit={submitSearch}>
              <input aria-label="Search jobs" placeholder="Search jobs" value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} autoFocus />
              <button type="submit" data-testid="search-submit">Search</button>
            </form>
          </div>
        )}
        {menuOpen && (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {[...navItems, ['Join', '/auth/signup?destination=%2f'], ['Log In', '/auth/login?destination=%2f'], ['FOR EMPLOYERS', 'https://employers.builtin.com?utm_medium=BIReferral&utm_source=foremployers']].map(([label, href]) => (
              <a key={label} href={href.startsWith('/') ? `https://builtin.com${href}` : href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <div className="platform-pill"><span className="sparkle" aria-hidden="true">✧</span>Employer Intelligence Platform</div>
            <h1>We help the world make better decisions about where to work<span className="period">.</span></h1>
            <p className="hero-description">Built In provides the trusted signals that help companies and candidates be visible, trusted, and chosen.</p>
            <div className="hero-actions">
              <a href="https://builtin.com/jobs" className="hero-btn hero-btn-primary">Explore Companies Hiring</a>
              <a href="https://hubs.ly/Q04d4FTh0" className="hero-btn hero-btn-secondary" target="_blank" rel="noreferrer">Explore Employer Solutions</a>
            </div>
            <div className="logo-grid">
              {companyLogos.map(([alt, src, href]) => (
                <a className="logo-cell" href={href} key={alt} aria-label={alt} data-testid={`company-${alt.toLowerCase().replaceAll(' ', '-')}`}>
                  <img src={src} alt={alt} />
                </a>
              ))}
            </div>
            <a className="explore-companies" href="https://builtin.com/companies">Explore 100K+ Companies <span aria-hidden="true">→</span></a>
          </div>
        </section>

        <div className="content-wrap">
          <section className="benefits" aria-label="Built In platform benefits">
            {benefits.map(([image, title, subtitle]) => (
              <div className="benefit" key={title}>
                <img src={`https://static.builtin.com/dist/images/home/${image}`} alt={title} />
                <div><div className="benefit-title">{title}</div><div className="benefit-sub">{subtitle}</div></div>
              </div>
            ))}
          </section>

          <section className="jobs-section">
            <div className="jobs-heading">
              <h2>Start Your Job Search</h2>
              <p>See what millions of people are discovering on Built In today.</p>
            </div>
            <div className="job-shortcuts">
              <a className="job-shortcut" href="https://builtin.com/jobs"><span>All Tech Jobs</span><ChevronRight size={19} aria-hidden="true" /></a>
              <a className="job-shortcut" href="https://builtin.com/jobs/remote"><span>See All Remote Tech Jobs</span><ChevronRight size={19} aria-hidden="true" /></a>
            </div>
            <div className="expand-row">
              <button className="expand-button" type="button" aria-expanded={expanded} aria-controls="browse-links" onClick={() => setExpanded(!expanded)} data-testid="expand-browse-links">
                {expanded ? 'Collapse' : 'Expand'} <span aria-hidden="true">⌄</span>
              </button>
            </div>
            {expanded && (
              <div className="expanded-links" id="browse-links">
                {exploreGroups.map((group) => (
                  <section className="expanded-group" key={group.title}>
                    <h3>{group.title}</h3>
                    <div className="quick-links">
                      {group.links.map(([label, href]) => <a className="quick-link" key={label} href={`https://builtin.com${href}`}>{label}<ChevronRight size={18} aria-hidden="true" /></a>)}
                    </div>
                  </section>
                ))}
                <section className="expanded-group">
                  <h3>Browse Jobs</h3>
                  <div className="browse-grid">
                    {browseLinks.map(([label, href]) => <a href={href} key={href + label}>{label}</a>)}
                  </div>
                </section>
              </div>
            )}
          </section>

          <section className="employer-panel">
            <div className="employer-copy">
              <div className="employer-badge">For Employers</div>
              <h2>What does AI tell candidates about your employer brand?</h2>
              <p>Get your free AI reputation report today.</p>
              <a className="report-button" href="https://employers.builtin.com/Reputationreport/">See AI Report</a>
            </div>
            <div className="employer-image">
              <img src="https://static.builtin.com/dist/images/home/EmployerPortal_Home.png" alt="Employer Portal" />
            </div>
          </section>
        </div>
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <a className="footer-brand" href="/" aria-label="Built In home">
            <img src="https://static.builtin.com/dist/images/9-dark.svg" alt="BuiltIn" />
          </a>
          {footerColumns.map((column) => (
            <div className="footer-col" key={column.title}>
              <h3>{column.title}</h3>
              {column.links.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
            </div>
          ))}
        </div>
        <div className="copyright">© 2026 Built In. All rights reserved.</div>
        <div className="legal-links">
          {legalLinks.map(([label, href]) => <a href={href} key={label}>{label}</a>)}
        </div>
      </footer>

      <nav className="mobile-bottom-nav" aria-label="Quick navigation">
        {[['Companies', '/companies', '◈'], ['Jobs', '/jobs', '⌕'], ['Tracker', '/auth/login?destination=%2f', '▣'], ['Articles', '/tech-topics', '▤'], ['More', '/companies', '⋯']].map(([label, href, icon]) => (
          <a href={href.startsWith('/') ? `https://builtin.com${href}` : href} key={label}><span className="mini-icon" aria-hidden="true">{icon}</span>{label}</a>
        ))}
      </nav>
    </div>
  );
}

export default App;
