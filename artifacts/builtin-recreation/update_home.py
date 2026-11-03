import sys
import os

home_path = r'C:\Users\DELL\Downloads\Builtin-Clone\Builtin-Clone\artifacts\builtin-recreation\src\pages\Home.tsx'
with open(home_path, 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Ensure LayoutGrid is imported
if 'LayoutGrid' not in code:
    code = code.replace('Briefcase,', 'Briefcase,\n  LayoutGrid,', 1)

# 2. Add homeDirectoryCompanies and expertShowcaseData before export default function Home
dataset_code = '''
interface HomeDirectoryCompany {
  id: string;
  name: string;
  verified: boolean;
  logo: string;
  tagline: string;
  tags: string[];
  location: string;
  workPolicy: string;
  openJobsCount: number;
}

const homeDirectoryCompanies: HomeDirectoryCompany[] = [
  {
    id: 'servicenow',
    name: 'ServiceNow',
    verified: true,
    logo: '/images/home_logo_servicenow.png',
    tagline: "Build what's next with the world's top cloud platform.",
    tags: ['Technology', 'Cloud', 'Enterprise'],
    location: 'Santa Clara, CA & Singapore',
    workPolicy: 'Hybrid',
    openJobsCount: 48,
  },
  {
    id: 'gm',
    name: 'General Motors (Software & AV)',
    verified: true,
    logo: '/images/home_logo_gm.png',
    tagline: 'Drive the future of mobility with GM.',
    tags: ['Automotive', 'Software', 'Innovation'],
    location: 'Detroit, MI & Remote',
    workPolicy: 'On-site',
    openJobsCount: 34,
  },
  {
    id: 'pfizer',
    name: 'Pfizer Digital & R&D',
    verified: true,
    logo: '/images/home_logo_pfizer.png',
    tagline: 'Innovating breakthrough for better health.',
    tags: ['Healthcare', 'R&D', 'Digital Health'],
    location: 'New York, NY & Global',
    workPolicy: 'Hybrid',
    openJobsCount: 28,
  },
  {
    id: 'grab',
    name: 'Grab',
    verified: true,
    logo: '/images/logo_grab_clean.png',
    tagline: 'Connecting people and possibilities across Southeast Asia.',
    tags: ['Superapp', 'Fintech', 'Mobility'],
    location: 'Singapore',
    workPolicy: 'Hybrid',
    openJobsCount: 48,
  },
  {
    id: 'shopee',
    name: 'Shopee (Sea Group)',
    verified: true,
    logo: '/images/logo_shopee_clean.png',
    tagline: 'Empowering everyone to live better through digital platforms.',
    tags: ['E-Commerce', 'Marketplace', 'Tech'],
    location: 'Singapore & Bangkok',
    workPolicy: 'Hybrid',
    openJobsCount: 72,
  },
  {
    id: 'axon',
    name: 'Axon Enterprise',
    verified: true,
    logo: '/images/logo_axon_clean.png',
    tagline: 'Building a safer world with connected public safety tech.',
    tags: ['Public Safety', 'Cloud', 'AI Hardware'],
    location: 'Scottsdale, AZ & Remote',
    workPolicy: 'On-site',
    openJobsCount: 31,
  },
  {
    id: 'datadog',
    name: 'Datadog',
    verified: true,
    logo: 'https://static.builtin.com/dist/images/home/topCompanies/datadog.svg',
    tagline: 'Cloud infrastructure and observability platform.',
    tags: ['DevOps', 'Observability', 'Cloud'],
    location: 'New York, NY',
    workPolicy: 'Hybrid',
    openJobsCount: 38,
  },
  {
    id: 'bytedance',
    name: 'ByteDance',
    verified: true,
    logo: '/images/bytedance_logo.png',
    tagline: 'Inspire creativity and enrich life through global platforms.',
    tags: ['AI Research', 'Social Media', 'Content'],
    location: 'Singapore',
    workPolicy: 'Hybrid',
    openJobsCount: 120,
  },
  {
    id: 'vinfast',
    name: 'VinFast Global',
    verified: true,
    logo: '/images/brands/vinfast.svg',
    tagline: 'Leading smart electric mobility and sustainable transport.',
    tags: ['Electric Vehicles', 'Clean Tech', 'Robotics'],
    location: 'Hai Phong & Singapore',
    workPolicy: 'Hybrid',
    openJobsCount: 65,
  },
  {
    id: 'stripe',
    name: 'Stripe',
    verified: true,
    logo: 'https://static.builtin.com/dist/images/home/topCompanies/stripe.svg',
    tagline: 'Financial infrastructure for the global internet economy.',
    tags: ['Fintech', 'Payments', 'APIs'],
    location: 'San Francisco & Dublin',
    workPolicy: 'Remote',
    openJobsCount: 45,
  },
];

const expertShowcaseData = [
  {
    id: 'm-1',
    name: 'Dr. Elina Rozova',
    role: 'Professor & Researcher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    photo: '/images/expert_elina_full.png',
    bio: 'Expert in AI and Machine Learning with 20+ years of experience.',
    tags: ['AI & Machine Learning', 'Research'],
  },
  {
    id: 'm-2',
    name: 'Marcus Chen',
    role: 'Senior Software Engineer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    photo: '/images/expert_marcus_full.png',
    bio: 'Build scalable products with modern technologies.',
    tags: ['Web Development', 'System Design'],
  },
  {
    id: 'm-3',
    name: 'Sarah Jenkins',
    role: 'Head of Product Design',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    photo: '/images/expert_sarah_full.png',
    bio: 'Turn ideas into impactful products.',
    tags: ['Product Design', 'UX/UI'],
  },
  {
    id: 'm-4',
    name: 'David Pham',
    role: 'VP of Product & Engineering',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    photo: '/images/expert_david_full.png',
    bio: 'Scale products and teams for global impact.',
    tags: ['Product Strategy', 'Leadership'],
  },
];
'''

if 'homeDirectoryCompanies' not in code:
    code = code.replace('export default function Home() {', dataset_code + '\nexport default function Home() {', 1)

# 3. Add directory state inside Home()
state_code = '''  const [dirSearchQuery, setDirSearchQuery] = useState('');
  const [dirLocation, setDirLocation] = useState('All');
  const [dirRole, setDirRole] = useState('All');
  const [dirPage, setDirPage] = useState(1);

  const filteredDirCompanies = useMemo(() => {
    return homeDirectoryCompanies.filter((comp) => {
      if (dirLocation !== 'All' && !comp.location.toLowerCase().includes(dirLocation.toLowerCase())) {
        return false;
      }
      if (dirRole !== 'All' && !comp.tags.some((t) => t.toLowerCase().includes(dirRole.toLowerCase()))) {
        return false;
      }
      if (dirSearchQuery.trim()) {
        const q = dirSearchQuery.toLowerCase().trim();
        const matchName = comp.name.toLowerCase().includes(q);
        const matchTagline = comp.tagline.toLowerCase().includes(q);
        const matchTags = comp.tags.some((t) => t.toLowerCase().includes(q));
        const matchLoc = comp.location.toLowerCase().includes(q);
        if (!matchName && !matchTagline && !matchTags && !matchLoc) return false;
      }
      return true;
    });
  }, [dirSearchQuery, dirLocation, dirRole]);

  const totalDirPages = Math.max(1, Math.ceil(filteredDirCompanies.length / 3));
  const paginatedDirCompanies = useMemo(() => {
    const start = (dirPage - 1) * 3;
    return filteredDirCompanies.slice(start, start + 3);
  }, [dirPage, filteredDirCompanies]);
'''

if 'dirSearchQuery' not in code:
    code = code.replace('const [companyPage, setCompanyPage] = useState(1);', state_code + '\n  const [companyPage, setCompanyPage] = useState(1);', 1)

# 4. Replace the old Company Directory & Mentor sections with the new mockup design
new_sections_jsx = '''      {/* ============================================================== */}
      {/* 2026 FEATURED COMPANY DIRECTORY & PARTNER POSTER (MOCKUP MATCH) */}
      {/* ============================================================== */}
      <section id="company-section" className="container home-trusted-companies-section">
        {/* Left Side: OUR PARTNERS - Trusted Companies Poster Card */}
        <div className="home-trusted-partner-poster">
          <div className="poster-bg-img" style={{ backgroundImage: `url('/images/trusted_companies_banner.jpg')` }} />
          <div className="poster-gradient-overlay" />
          
          <div className="poster-inner-content">
            <div className="poster-badge-top">
              <span className="poster-dash">—</span>
              <span>OUR PARTNERS</span>
              <span className="poster-dash">—</span>
            </div>

            <h3 className="poster-main-heading">
              Trusted<br />Companies
            </h3>

            <p className="poster-subtext">
              Join leading organizations in logistics and global trade.
            </p>

            <Link href="/jobs" className="poster-explore-btn">
              <span>Explore Opportunities</span>
              <ArrowRight size={14} />
            </Link>

            <div className="poster-social-proof">
              <div className="poster-avatar-stack">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Partner 1" className="stack-avatar" />
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Partner 2" className="stack-avatar" />
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Partner 3" className="stack-avatar" />
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=100&q=80" alt="Partner 4" className="stack-avatar" />
                <span className="stack-count-badge">+1.2k</span>
              </div>
              <span className="poster-proof-caption">Companies in our network</span>
            </div>
          </div>
        </div>

        {/* Right Side: Company Directory Panel */}
        <div className="home-directory-main-panel">
          {/* Header Row */}
          <div className="home-dir-header-bar">
            <div className="home-dir-title-box">
              <div className="home-dir-icon-square">
                <Building2 size={24} className="text-blue-600" />
              </div>
              <div className="home-dir-text-group">
                <h2 className="home-dir-heading">Company Directory</h2>
                <p className="home-dir-subhead">Discover top companies and explore career opportunities worldwide.</p>
              </div>
            </div>

            <Link href="/companies" className="home-dir-view-all-pill">
              <span>View All Companies</span>
              <ArrowRight size={13} />
            </Link>
          </div>

          {/* Search & Filter Row */}
          <div className="home-dir-filter-row">
            <div className="home-dir-search-box">
              <Search size={15} className="home-dir-search-icon" />
              <input
                type="text"
                placeholder="Search companies, industry or location..."
                value={dirSearchQuery}
                onChange={(e) => {
                  setDirSearchQuery(e.target.value);
                  setDirPage(1);
                }}
                className="home-dir-search-input"
              />
            </div>

            <div className="home-dir-dropdown-pill">
              <MapPin size={13} className="text-slate-600" />
              <select
                value={dirLocation}
                onChange={(e) => {
                  setDirLocation(e.target.value);
                  setDirPage(1);
                }}
                className="home-dir-select"
              >
                <option value="All">All Locations</option>
                <option value="Singapore">Singapore</option>
                <option value="New York">New York</option>
                <option value="Detroit">Detroit</option>
                <option value="Santa Clara">Santa Clara</option>
                <option value="Remote">Remote</option>
              </select>
              <ChevronDown size={11} className="text-slate-400" />
            </div>

            <div className="home-dir-dropdown-pill">
              <LayoutGrid size={13} className="text-slate-600" />
              <select
                value={dirRole}
                onChange={(e) => {
                  setDirRole(e.target.value);
                  setDirPage(1);
                }}
                className="home-dir-select"
              >
                <option value="All">All Roles</option>
                <option value="Technology">Technology & Cloud</option>
                <option value="Automotive">Automotive</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Superapp">Superapp</option>
              </select>
              <ChevronDown size={11} className="text-slate-400" />
            </div>

            <button
              type="button"
              className="home-dir-search-btn"
              onClick={() => setDirPage(1)}
            >
              <Search size={13} />
              <span>Search</span>
            </button>
          </div>

          {/* 3 Stacked Company Cards */}
          <div className="home-dir-cards-stack">
            {paginatedDirCompanies.map((comp) => (
              <article key={comp.id} className="home-dir-company-card">
                {/* Left Logo */}
                <div className="home-dir-card-logo-wrap">
                  <img
                    src={comp.logo}
                    alt={comp.name}
                    className="home-dir-card-logo"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/sandbox-logo-light.png';
                    }}
                  />
                </div>

                {/* Middle Info */}
                <div className="home-dir-card-body">
                  <div className="home-dir-name-row">
                    <h3 className="home-dir-company-title">
                      <Link href={`/companies/${comp.id}`}>{comp.name}</Link>
                    </h3>
                    {comp.verified && (
                      <span className="home-dir-verified-check" title="Verified">✓</span>
                    )}
                  </div>

                  <p className="home-dir-company-tagline">{comp.tagline}</p>

                  <div className="home-dir-tag-pills">
                    {comp.tags.map((tag) => (
                      <span key={tag} className="home-dir-pill-chip">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Right Meta & CTA */}
                <div className="home-dir-card-meta-pane">
                  <div className="home-dir-loc-policy">
                    <span className="home-dir-loc-line">
                      <MapPin size={12} className="meta-pin-icon" />
                      <span>{comp.location}</span>
                    </span>
                    <span className="home-dir-policy-line">
                      <HomeIcon size={12} className="meta-policy-icon" />
                      <span>{comp.workPolicy}</span>
                    </span>
                  </div>

                  <div className="home-dir-roles-pill">
                    <Users size={12} className="roles-pill-icon" />
                    <span>{comp.openJobsCount} Open Roles</span>
                  </div>

                  <Link href={`/companies/${comp.id}`} className="home-dir-circle-arrow-btn" aria-label={`View ${comp.name}`}>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination Row */}
          <div className="home-dir-pagination-footer">
            <div className="home-dir-showing-count">
              <LayoutGrid size={13} className="text-slate-400" />
              <span>
                Showing {(dirPage - 1) * 3 + 1}–{Math.min(dirPage * 3, filteredDirCompanies.length)} of {filteredDirCompanies.length} Companies
              </span>
            </div>

            <div className="home-dir-page-nav-btns">
              <button
                type="button"
                className="home-dir-page-nav-arrow"
                disabled={dirPage === 1}
                onClick={() => setDirPage((p) => Math.max(1, p - 1))}
                aria-label="Previous page"
              >
                <ChevronLeft size={14} />
              </button>

              {Array.from({ length: totalDirPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  className={`home-dir-page-num ${dirPage === pageNum ? 'active' : ''}`}
                  onClick={() => setDirPage(pageNum)}
                >
                  {pageNum}
                </button>
              ))}

              <button
                type="button"
                className="home-dir-page-nav-arrow"
                disabled={dirPage === totalDirPages}
                onClick={() => setDirPage((p) => Math.min(totalDirPages, p + 1))}
                aria-label="Next page"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* OUR EXPERTS SHOWCASE (CLEAN 4-CARD MOCKUP MATCH)               */}
      {/* ============================================================== */}
      <section id="mentor-section" className="container home-experts-section">
        {/* Section Header */}
        <div className="home-experts-header">
          <div className="experts-header-left">
            <div className="experts-icon-square">
              <Users size={22} className="text-blue-600" />
            </div>
            <div>
              <h2 className="experts-main-heading">Our Experts</h2>
              <p className="experts-subheading">Learn from industry leaders and top professionals.</p>
            </div>
          </div>

          <Link href="/mentors/m-1" className="experts-view-all-btn">
            <span>View All Experts</span>
            <ArrowRight size={13} />
          </Link>
        </div>

        {/* Carousel / 4 Cards Row */}
        <div className="home-experts-carousel-container">
          <button
            type="button"
            className="experts-floating-arrow experts-arrow-prev"
            onClick={() => {
              const el = document.querySelector('.home-experts-grid');
              el?.scrollBy({ left: -320, behavior: 'smooth' });
            }}
            aria-label="Previous expert"
          >
            <ChevronLeft size={18} strokeWidth={2.4} />
          </button>

          <button
            type="button"
            className="experts-floating-arrow experts-arrow-next"
            onClick={() => {
              const el = document.querySelector('.home-experts-grid');
              el?.scrollBy({ left: 320, behavior: 'smooth' });
            }}
            aria-label="Next expert"
          >
            <ChevronRight size={18} strokeWidth={2.4} />
          </button>

          <div className="home-experts-grid">
            {expertShowcaseData.map((expert) => (
              <article key={expert.id} className="home-expert-card">
                {/* Top Photo with Online Badge */}
                <div className="expert-card-photo-box">
                  <img
                    src={expert.photo || expert.avatar}
                    alt={expert.name}
                    className="expert-card-photo"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = expert.avatar;
                    }}
                  />
                  <div className="expert-card-online-badge">
                    <span className="expert-online-dot" />
                    <span>Online</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="expert-card-body">
                  {/* Avatar + Name & Role */}
                  <div className="expert-person-row">
                    <img
                      src={expert.avatar}
                      alt={expert.name}
                      className="expert-avatar-circle"
                    />
                    <div className="expert-info-group">
                      <h3 className="expert-person-name">
                        <Link href={`/mentors/${expert.id}`}>{expert.name}</Link>
                      </h3>
                      <div className="expert-person-role">{expert.role}</div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="expert-bio-text">{expert.bio}</p>

                  {/* Skill Chips */}
                  <div className="expert-chips-row">
                    {expert.tags.map((tag) => (
                      <span key={tag} className="expert-tag-chip">{tag}</span>
                    ))}
                  </div>

                  {/* Solid Black Button */}
                  <Link
                    href={`/mentors/${expert.id}`}
                    className="expert-book-btn"
                  >
                    <Calendar size={14} />
                    <span>Book a 1-on-1 Session</span>
                    <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
'''

start_marker = '<section id="company-section"'
end_marker = '{/* ==============================================================\n          1.5 / CREATE CV'
if end_marker not in code:
    end_marker = '{/* ==============================================================\r\n          1.5 / CREATE CV'
if end_marker not in code:
    end_marker = '<section id="create-cv-section"'

s_idx = code.find(start_marker)
e_idx = code.find(end_marker)

if s_idx != -1 and e_idx != -1:
    code = code[:s_idx] + new_sections_jsx + '\n\n      ' + code[e_idx:]
    with open(home_path, 'w', encoding='utf-8') as f:
        f.write(code)
    print('Home.tsx successfully updated!')
else:
    print(f'Error finding markers: s_idx={s_idx}, e_idx={e_idx}')
