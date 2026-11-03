import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Link, useLocation } from 'wouter';
import {
  Search,
  Menu,
  X,
  ChevronDown,
  Users,
  FileText,
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  GraduationCap,
  Scale,
} from 'lucide-react';

export function Header({ onCreatePost }: { onCreatePost?: () => void }) {
  const [location, setLocation] = useLocation();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setExploreOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      setLocation(`/jobs?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
    }
  };

  // Original classic navigation items
  const navItems = [
    { label: 'Companies', href: '/companies' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Articles', href: '/tech-topics' },
  ];

  // Additional detail routes & tools grouped into the "More" dropdown button
  const moreTools = [
    {
      label: 'Mentors',
      desc: '1-on-1 industry career guidance',
      href: '/mentors/m-1',
      badge: '1-on-1',
      icon: Users,
    },
    {
      label: 'ATS Resume Builder',
      desc: 'Instant resume polish & score check',
      href: '/cv-builder',
      badge: 'Tool',
      icon: FileText,
    },
    {
      label: 'Candidate Dashboard',
      desc: 'Track submissions & interview progress',
      href: '/candidate-dashboard',
      badge: 'Portal',
      icon: LayoutDashboard,
    },
    {
      label: 'Employer ATS Pipeline',
      desc: 'Applicant tracker & review pipeline',
      href: '/employer-ats',
      badge: 'Hiring',
      icon: Briefcase,
    },
    {
      label: 'Post a Job',
      desc: 'Publish tech roles & opportunities',
      href: '/post-job',
      badge: 'Listing',
      icon: PlusCircle,
    },
    {
      label: 'Courses & Certifications',
      desc: 'FIATA diploma & logistics training',
      href: '/courses',
      badge: 'Study',
      icon: GraduationCap,
    },
    {
      label: 'Policy & Regulatory Gazette',
      desc: 'Cross-border hiring decrees & treaties',
      href: '/policy-detail',
      badge: 'Gazette',
      icon: Scale,
    },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith('/#')) {
      const id = href.replace('/#', '');
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setLocation(href);
      }
    } else {
      setLocation(href);
    }
    setMenuOpen(false);
    setExploreOpen(false);
  };

  return (
    <header className="site-header linkedin-header">
      <div className="header-inner">
        <Link className="brand sandbox-brand" href="/" aria-label="Sandbox Home" data-testid="brand-home">
          <img
            src="/sandbox-logo-light.png"
            alt="Sandbox"
            className="sandbox-main-logo"
          />
        </Link>

        {/* Primary Desktop Navigation: Companies | Jobs | Articles | More ▾ */}
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(({ label, href }) => {
            const isActive =
              location === href ||
              (href !== '/' && !href.startsWith('/#') && location.startsWith(href));
            return (
              <a
                key={label}
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(href);
                }}
                className={isActive ? 'nav-link active' : 'nav-link'}
              >
                {label}
              </a>
            );
          })}

          {/* More / Additional Tools Dropdown Button */}
          <div className="nav-dropdown-wrapper" ref={dropdownRef}>
            <button
              type="button"
              className={`nav-link nav-dropdown-trigger flex items-center gap-1.5 ${exploreOpen ? 'active' : ''}`}
              onClick={() => setExploreOpen(!exploreOpen)}
              aria-expanded={exploreOpen}
              aria-haspopup="true"
            >
              <span>More</span>
              <ChevronDown
                size={14}
                className="transition-transform duration-200"
                style={{
                  transform: exploreOpen ? 'rotate(180deg)' : 'none',
                }}
              />
            </button>

            {exploreOpen && (
              <div className="nav-dropdown-menu" role="menu">
                <div className="dropdown-section-title">TOOLS & SPECIALIZED PAGES</div>
                {moreTools.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                      className="dropdown-item"
                      role="menuitem"
                    >
                      <div className="dropdown-item-icon">
                        <IconComponent size={15} />
                      </div>
                      <div className="dropdown-item-body">
                        <div className="dropdown-item-title-row">
                          <span className="dropdown-item-title">{item.label}</span>
                          <span className="dropdown-item-badge">{item.badge}</span>
                        </div>
                        <div className="dropdown-item-desc">{item.desc}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </nav>

        {/* Classic Account Nav: Search | Join | Log In | FOR EMPLOYERS */}
        <div className="account-nav">
          <button
            className="icon-button search-trigger"
            type="button"
            aria-label="Search"
            aria-expanded={searchOpen}
            onClick={() => setSearchOpen(!searchOpen)}
            data-testid="search-toggle"
          >
            <Search size={19} strokeWidth={1.7} />
          </button>

          <Link href="/candidate-dashboard" className="header-auth-link">Join</Link>
          <span aria-hidden="true" style={{ opacity: 0.4 }}>|</span>
          <Link href="/candidate-dashboard" className="header-auth-link">Log In</Link>
          <Link
            className="employer-link"
            href="/post-job"
          >
            FOR EMPLOYERS
          </Link>
        </div>

        {/* Mobile Hamburger Controls */}
        <div className="mobile-controls">
          <button
            className="icon-button mobile-menu-button"
            type="button"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
            data-testid="mobile-menu-toggle"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Popover Search Bar */}
      {searchOpen && (
        <div className="search-popover">
          <form className="search-form" onSubmit={submitSearch}>
            <input
              aria-label="Search jobs & companies"
              placeholder="Search tech jobs, companies, skills..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              autoFocus
            />
            <button type="submit" data-testid="search-submit">Search</button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile navigation">
          {navItems.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(href);
              }}
              className="mobile-nav-link"
            >
              {label}
            </a>
          ))}

          <div className="mobile-menu-section-title">MORE TOOLS & SERVICES</div>
          {moreTools.map((item) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="mobile-nav-link mobile-nav-sublink"
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <IconComponent size={16} />
                  {item.label}
                </span>
                <span className="dropdown-item-badge" style={{ color: '#fff', background: 'rgba(255,255,255,0.2)' }}>
                  {item.badge}
                </span>
              </a>
            );
          })}

          <div className="mobile-account-links">
            <Link href="/candidate-dashboard" onClick={() => setMenuOpen(false)}>Join</Link>
            <Link href="/candidate-dashboard" onClick={() => setMenuOpen(false)}>Log In</Link>
            <Link
              className="employer-link"
              href="/post-job"
              onClick={() => setMenuOpen(false)}
            >
              FOR EMPLOYERS
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
