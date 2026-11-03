import { type FormEvent, useState } from 'react';
import {
  ChevronDown,
  House,
  Menu,
  Search,
  X,
  PhoneCall,
  Briefcase,
  Building2,
  Newspaper,
  UserCheck,
  FileText,
  PlusCircle,
  Sparkles,
} from 'lucide-react';
import '../china-job-portal.css';

const origin = 'https://chinajob.mohrss.gov.cn';
const asset = (path: string) => `${origin}${path}`;
const isExternal = (href: string) => /^https?:\/\//.test(href);

export const navigation = [
  {
    label: '1. Tin Tức & Báo Chí',
    href: '/#news-section',
    children: [
      ['Tin Biên Tập (Editor Posts)', '/#news-section'],
      ['Sản Phẩm & HR Marketing', '/#news-section'],
      ['Tạp Chí Chuyên Gia (Expert)', '/#news-section'],
      ['Báo Cáo Công Nghệ Toàn Văn', '/tech-topics'],
    ],
  },
  {
    label: '2. Thời Sự Tuyển Dụng',
    href: '/jobs',
    highlight: true,
    children: [
      ['Tất Cả Cơ Hội (Master-Detail)', '/jobs'],
      ['Việc Làm Công Nghệ (Jobs)', '/jobs?type=job'],
      ['Thực Tập Hưởng Lương (Intern)', '/jobs?type=intern'],
      ['Học Bổng Toàn Cầu (Scholarship)', '/jobs?type=scholarship'],
    ],
  },
  {
    label: '3. Doanh Nghiệp (Phnom Penh Post)',
    href: '/companies',
    children: [
      ['Trang Báo Doanh Nghiệp', '/companies'],
      ['Báo Cáo Mở Rộng Thị Trường', '/companies'],
      ['Danh Bạ Nhà Tuyển Dụng', '/companies'],
    ],
  },
  {
    label: '4. Cố Vấn (Mentors)',
    href: '/mentors/m-1',
  },
  {
    label: '5. Tạo CV (Create CV)',
    href: '/cv-builder',
  },
  {
    label: 'Bài Viết Nghiên Cứu',
    href: '/tech-topics',
  },
];

export function ChinaHeader({ onSearch }: { onSearch?: (query: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '/';

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (query.trim()) {
      if (onSearch) {
        onSearch(query.trim());
      } else {
        window.location.assign(`/jobs?search=${encodeURIComponent(query.trim())}`);
      }
    }
  };

  return (
    <header className="header-main">
      {/* 1. Golden Utility Bar */}
      <div className="utility-bar">
        <div className="container utility-inner">
          <div className="utility-left">
            <span className="welcome-tag">
              Cổng Thông Tin Công Nghệ, Thời Sự Tuyển Dụng & Cố Vấn Nghề Nghiệp Toàn Cầu
            </span>
          </div>
          <div className="utility-right">
            <span className="hotline">
              <PhoneCall size={12} className="inline-icon" />
              Đường dây nóng HR & Biên tập: +84-024-84661166
            </span>
            <span className="util-sep">|</span>
            <a href="mailto:contact@career-network.org" className="email">
              Email: contact@career-network.org
            </a>
          </div>
        </div>
      </div>

      {/* 2. Brand Row */}
      <div className="container brand-row">
        <a href="/" className="brand" aria-label="Sandbox Career Network Home">
          <img
            src="/sandbox-logo.png"
            alt="Sandbox Career Network"
            style={{ height: '42px', width: 'auto' }}
          />
        </a>
        <div className="org-mark">
          Bản quyền thuộc Cổng Thông Tin Tuyển Dụng & Phát Triển Kỹ Năng Nghề Nghiệp
          <br />
          Đồng hành cùng Mạng Lưới Doanh Nghiệp Công Nghệ Quốc Tế & Nhật Báo Kinh Tế
        </div>
      </div>

      {/* 3. Main Navigation Bar */}
      <div className="nav-wrap">
        <div className="container nav-line">
          {/* Home Icon */}
          <a
            className={`home-mark ${currentPath === '/' ? 'active' : ''}`}
            href="/"
            aria-label="Trang chủ"
            title="Trang chủ"
          >
            <House size={18} strokeWidth={2.2} />
          </a>

          {/* Main Navigation Items */}
          <nav
            className={`main-nav ${menuOpen ? 'mobile-open' : ''}`}
            aria-label="Main Navigation"
          >
            {navigation.map((item) => {
              const isActive =
                currentPath === item.href ||
                (item.href !== '/' && !item.href.startsWith('/#') && currentPath.startsWith(item.href));

              return (
                <div
                  className={`nav-item ${openMenu === item.label ? 'open' : ''} ${isActive ? 'active' : ''} ${item.highlight ? 'highlight-item' : ''}`}
                  key={item.label}
                >
                  <button
                    className="nav-trigger"
                    type="button"
                    onClick={() => {
                      if (item.children) {
                        setOpenMenu(openMenu === item.label ? null : item.label);
                      } else if (item.href.startsWith('/#')) {
                        if (currentPath === '/') {
                          const targetId = item.href.replace('/#', '');
                          const el = document.getElementById(targetId);
                          if (el) el.scrollIntoView({ behavior: 'smooth' });
                        } else {
                          window.location.assign(item.href);
                        }
                      } else if (isExternal(item.href)) {
                        window.open(item.href, '_blank', 'noopener,noreferrer');
                      } else {
                        window.location.assign(item.href);
                      }
                    }}
                  >
                    <span>{item.label}</span>
                    {item.children && <ChevronDown className="chevron" size={13} />}
                  </button>

                  {item.children && (
                    <div className="dropdown">
                      {item.children.map(([label, href]) => (
                        <a
                          key={label}
                          href={href}
                          target={isExternal(href) ? '_blank' : undefined}
                          rel={isExternal(href) ? 'noreferrer' : undefined}
                          onClick={() => {
                            setMenuOpen(false);
                            setOpenMenu(null);
                          }}
                        >
                          {label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Search Box on the Right */}
          <form className="searchbox" onSubmit={submit} role="search">
            <input
              aria-label="Tìm kiếm cơ hội"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Tìm việc, công ty, kỹ năng..."
            />
            <button type="submit" aria-label="Tìm kiếm">
              <Search size={15} />
            </button>
          </form>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-toggle"
            type="button"
            aria-label="Menu điều hướng"
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
    </header>
  );
}
