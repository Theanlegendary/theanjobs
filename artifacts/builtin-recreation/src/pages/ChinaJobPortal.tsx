import { type FormEvent, useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  House,
  Menu,
  Search,
  X,
  BriefcaseBusiness,
  GraduationCap,
  FileCheck2,
  UsersRound,
  PhoneCall,
  Award,
  Globe2,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { ChinaHeader } from '@/components/ChinaHeader';
import primaryArticleSource from '../../research/pages/article-primary.html?raw';
import employmentArticleSource from '../../research/pages/article-employment.html?raw';
import categorySource from '../../research/pages/news-category.html?raw';
import '../china-job-portal.css';

const origin = 'https://chinajob.mohrss.gov.cn';
const asset = (path: string) => `${origin}${path}`;
const localLink = (href: string) => (href.startsWith('http') ? href : href);
const isExternal = (href: string) => /^https?:\/\//.test(href);

type Story = {
  title: string;
  date: string;
  href: string;
  summary?: string;
  image?: string;
  source?: string;
};

// ==========================================================
// 1. English Navigation with Sub-Menus
// ==========================================================
const navigation = [
  {
    label: 'News Channel',
    href: '/zxpd/',
    children: [
      ['Policy Headlines', '/zxpd/szyw/'],
      ['Major News', '/zxpd/zyxw/'],
      ['Core Initiatives', '/zxpd/zxdt/'],
      ['Special Coverage', '/zxpd/ztzx/'],
      ['Global Dynamics', '/zxpd/gjdt/'],
      ['Featured Archive', '/zxpd/wqlb/'],
    ],
  },
  {
    label: 'Services & Programs',
    href: '/ywpd/',
    children: [
      ['Special Columns', '/zbzl/'],
      ['Employment Services', '/ywpd/jyfw/'],
      ['Startup Services', '/hlwcyfw/'],
      ['Skills & Certifications', '/ywpd/pxjd/'],
      ['Labor Relations', '/ywpd/ldgx/'],
      ['Social Security', '/ywpd/shbz/'],
    ],
  },
  {
    label: 'Work Platforms',
    href: 'https://chinajob.mohrss.gov.cn/zy/#/',
    children: [
      ['Digital Career Exhibition', 'https://chinajob.mohrss.gov.cn/zy/#/'],
      ['Employment & Startup Platform', 'http://jc.mohrss.gov.cn'],
      ['Emerging Occupations Platform', 'http://xzy.mohrss.gov.cn'],
      ['Labor Brand Digital Service', 'https://chinajob.mohrss.gov.cn/lwpp/'],
      ['Online Training Dispatch System', 'http://chinajob.mohrss.gov.cn/ycpx'],
    ],
  },
  { label: 'Policies & Regulations', href: '/zcfg/zxzc/' },
  {
    label: 'Data Center',
    href: '/sjpd/',
    children: [
      ['Quarterly Briefings', '/sjpd/jdfbh/'],
      ['Shortage Occupations Index', '/sjpd/dqzypx/'],
      ['Salary & Wage Data', '/sjpd/gzsj/'],
    ],
  },
  {
    label: 'Public Services',
    href: '/bmfw/',
    children: [
      ['Infographic Guides', '/bmfw/ytzx/'],
      ['Interactive Q&A', '/bmfw/hdjl/'],
      ['Quick Inquiry', '/bmfw/wsbl/'],
    ],
  },
  { label: 'About Us', href: '/gywm/' },
];

// ==========================================================
// 2. English Headline Groups (Vertical Tabbed News Desk)
// ==========================================================
const headlineGroups: {
  name: string;
  cnName: string;
  href: string;
  lead: Story;
  summary: string;
  image: string;
  stories: Story[];
}[] = [
  {
    name: 'Policy Headlines',
    cnName: '时政要闻',
    href: '/zxpd/szyw/',
    lead: {
      title:
        'Continuous Self-Purification and Governance Excellence: Leading Comprehensive Reform and Public Service Strategy in the New Era',
      date: '10-29',
      href: '/c/2026-10-29/631952.shtml',
      source: 'MOHRSS Official Desk',
    },
    summary:
      'Advancing high-standard workforce governance, talent cultivation, and comprehensive employment initiatives. How the national administration continuously strengthens service efficiency, economic stability, and career vitality across all public institutions...',
    image: '/upload/resources/image/2026/10/29/516371_320x205c.jpg',
    stories: [
      {
        title: 'Xinhua Editorial: Promoting Comprehensive Institutional Governance with Steadfast Resolve',
        date: '10-28',
        href: '/c/2026-10-28/630471.shtml',
      },
      {
        title: 'State Council Issues Decree: "Public Institution Registration & Management Regulations" Promulgated',
        date: '10-28',
        href: '/c/2026-10-28/630470.shtml',
      },
      {
        title: 'Exchange of Congratulatory Messages on 55th Diplomatic and Bilateral Partnership Anniversary',
        date: '10-27',
        href: '/c/2026-10-27/630406.shtml',
      },
      {
        title: 'Official Keynote Message Delivered to the 2026 Global Governance Forum',
        date: '10-27',
        href: '/c/2026-10-27/630405.shtml',
      },
      {
        title: 'State Council Executive Meeting Convenes to Coordinate Population Dynamics and Social Development',
        date: '10-27',
        href: '/c/2026-10-27/630404.shtml',
      },
    ],
  },
  {
    name: 'Major News',
    cnName: '重要新闻',
    href: '/zxpd/zyxw/',
    lead: {
      title:
        'To College Graduates & Youth: Comprehensive Warm Measures Assist Smooth Career Placement',
      date: '10-22',
      href: '/c/2026-10-22/625754.shtml',
      source: 'National Employment Bureau',
    },
    summary:
      'A multi-agency initiative expands campus job fairs, enterprise internships, mentorship subsidies, and digital hiring portals to accelerate career transitions for millions of university graduates nationwide.',
    image: '/upload/resources/image/2026/10/22/516106_320x205c.png',
    stories: [
      {
        title: '10 Million Trainees Annually: Key Milestones and Expanded Benefits in Vocational Skills Training',
        date: '10-29',
        href: '/c/2026-10-29/631953.shtml',
      },
      {
        title: 'Prioritizing People\'s Livelihood: Observations on the 15th Five-Year Special Planning Initiatives',
        date: '10-29',
        href: '/c/2026-10-29/630474.shtml',
      },
      {
        title: '"Artificial Intelligence +" Empowering New Quality Productive Forces: Expert Masterclass Held',
        date: '10-29',
        href: '/c/2026-10-29/631954.shtml',
      },
      {
        title: 'Workplace Injury Protection Pilot Expands: Exceeds 37 Million Enrolled Platform Workers',
        date: '10-28',
        href: '/c/2026-10-28/630473.shtml',
      },
      {
        title: '1 Goal, 3 Priorities, 2 Safeguards: Core Employment Policy Framework at a Glance',
        date: '10-28',
        href: '/c/2026-10-28/630472.shtml',
      },
    ],
  },
  {
    name: 'Core Initiatives',
    cnName: '中心工作',
    href: '/zxpd/zxdt/',
    lead: {
      title:
        '2025 "Loan for Entrepreneurship" Support Drive Concludes Successfully in Shangrao, Jiangxi',
      date: '10-20',
      href: '/c/2025-10-20/455994.shtml',
      source: 'Entrepreneurship Service Bureau',
    },
    summary:
      'Low-interest seed loans, incubator grants, and founder mentorship programs were deployed to support hundreds of tech startups and agricultural innovators in central China.',
    image: '/upload/resources/image/2025/10/20/513515_320x205c.png',
    stories: [
      {
        title: 'Notice on Capacity Building and Talent Training for Youth in Healthtech and Senior Care',
        date: '05-22',
        href: '/c/2026-05-22/546304.shtml',
      },
      {
        title: 'Technical Standards Released for 4th Public Employment Services National Skills Competition',
        date: '05-19',
        href: '/c/2026-05-19/544526.shtml',
      },
      {
        title: 'Notice on Joint Construction of the National Digital Career Exhibition Hall',
        date: '11-18',
        href: 'https://mp.weixin.qq.com/s/3LvsJrKOJthtK_2qnqFRNQ',
      },
      {
        title: 'Symposium on Live-Streamed Career Placement and Smart Matching Convened in Guangxi',
        date: '10-29',
        href: 'https://mp.weixin.qq.com/s/H9zLi27GUDuDdNYelX83Qw',
      },
      {
        title: 'Regional Entrepreneurship Acceleration Drives Expand Across 14 Central Provinces',
        date: '10-20',
        href: '/c/2025-10-20/455994.shtml',
      },
    ],
  },
  {
    name: 'Special Coverage',
    cnName: '专题资讯',
    href: '/zxpd/ztzx/',
    lead: {
      title:
        'In-Depth Policy Series: Interpreting the 15th Five-Year Human Resources & Social Security Blueprint',
      date: '08-06',
      href: '/c/2026-08-06/583500.shtml',
      source: 'Policy Research Office',
    },
    summary:
      'Authoritative breakdowns of pension system consolidation, unemployment insurance reserves, continuous digital education, and high-quality full employment roadmaps for 2026-2030.',
    image: '/upload/resources/image/2026/08/07/515804_500x200c.jpg',
    stories: [
      {
        title: 'Deepening High-Quality Full Employment Strategies for National Economic Resilience',
        date: '06-06',
        href: '/c/2024-06-06/407782.shtml',
      },
      {
        title: 'Artificial Intelligence + Public Employment Services: Exploring Algorithmic Career Matching',
        date: '03-12',
        href: '/c/2026-03-12/509949.shtml',
      },
      {
        title: 'HR Daily Knowledge Capsule: Essential Rights, Overtime Rules & Severance Calculation',
        date: '06-04',
        href: '/c/2021-06-04/308283.shtml',
      },
      {
        title: 'Monthly Review: Key National Labor & Social Security Highlights of 2026',
        date: '02-08',
        href: '/c/2024-02-08/397236.shtml',
      },
      {
        title: 'Emerging Occupations Showcase Season: Accrediting 18 New Digital & Green Job Tracks',
        date: '12-15',
        href: '/c/2025-12-15/470675.shtml',
      },
    ],
  },
  {
    name: 'Global Dynamics',
    cnName: '国际动态',
    href: '/zxpd/gjdt/',
    lead: {
      title:
        'State Council Information Office Holds Press Conference on Preparations for 48th WorldSkills Competition',
      date: '06-15',
      href: 'https://www.mohrss.gov.cn/SYrlzyhshbzb/dongtaixinwen/buneiyaowen/rsxw/202606/t20260612_578198.html',
      source: 'WorldSkills China Bureau',
    },
    summary:
      'Showcasing global vocational standards, international talent exchange, technical competition infrastructure, and youth vocational excellence on the world stage.',
    image: '/upload/resources/image/2026/06/15/515609_320x205c.jpg',
    stories: [
      {
        title: 'MOHRSS Invites National Medal Recipients to Deliver Vocational Inspiration Lectures',
        date: '07-16',
        href: 'https://www.mohrss.gov.cn/SYrlzyhshbzb/dongtaixinwen/buneiyaowen/hyhd/202607/t20260715_580301.html',
      },
      {
        title: 'Youth Career Success: Collaborative Initiatives Assisting Cross-Border Talent Placement',
        date: '10-22',
        href: '/c/2026-10-22/625754.shtml',
      },
      {
        title: 'Regional Entrepreneurship Support & Global Tech Incubation Forum Concludes',
        date: '10-20',
        href: '/c/2025-10-20/455994.shtml',
      },
      {
        title: 'International Best Practices in Workplace Safety and Labor Dispute Resolution',
        date: '10-28',
        href: '/c/2026-10-28/630471.shtml',
      },
      {
        title: 'Global Governance Forum: Enhancing Technical Apprenticeship & Worker Welfare',
        date: '10-27',
        href: '/c/2026-10-27/630405.shtml',
      },
    ],
  },
  {
    name: 'Featured Archive',
    cnName: '往期轮播',
    href: '/zxpd/wqlb/',
    lead: {
      title:
        'National Labor Model and Skills Medalist Tour Inspires Technical Institutes Nationwide',
      date: '07-16',
      href: 'https://www.mohrss.gov.cn/SYrlzyhshbzb/dongtaixinwen/buneiyaowen/hyhd/202607/t20260715_580301.html',
      source: 'Vocational Guidance Center',
    },
    summary:
      'Celebrating precision craftsmanship, technical engineering dedication, and modern apprenticeship pathways that drive industrial manufacturing innovation.',
    image: '/upload/resources/image/2026/10/30/516379_1200x260c.png',
    stories: [
      {
        title: 'State Council Press Conference: WorldSkills Shanghai Competition Progress',
        date: '06-15',
        href: 'https://www.mohrss.gov.cn/SYrlzyhshbzb/dongtaixinwen/buneiyaowen/rsxw/202606/t20260612_578198.html',
      },
      {
        title: 'Reaching 10 Million Technical Trainees: Quality Upskilling and Digital Certifications',
        date: '10-29',
        href: '/c/2026-10-29/631953.shtml',
      },
      {
        title: 'Serving the Public Interest: The 15th Five-Year Labor Protection Blueprint',
        date: '10-29',
        href: '/c/2026-10-29/630474.shtml',
      },
      {
        title: 'Expanded Injury Insurance Coverage for 37M Flexible and Platform Workers',
        date: '10-28',
        href: '/c/2026-10-28/630473.shtml',
      },
      {
        title: 'Essential Guidelines for Youth Employment and Entrepreneurship Subsidies',
        date: '10-28',
        href: '/c/2026-10-28/630472.shtml',
      },
    ],
  },
];

// ==========================================================
// 3. English Special Topics Grid (专题资讯)
// ==========================================================
const topics = [
  [
    'Implementing High-Quality Full Employment Strategy (深入贯彻高质量充分就业)',
    '/upload/resources/image/2024/06/04/508175_500x200c.png',
    '/c/2024-06-06/407782.shtml',
  ],
  [
    '15th Five-Year Plan: Human Resources & Social Security (规划系列解读)',
    '/upload/resources/image/2026/08/07/515804_500x200c.jpg',
    '/c/2026-08-06/583500.shtml',
  ],
  [
    'AI + Employment Services Innovation (人工智能+就业服务探索)',
    '/upload/resources/image/2026/03/12/515245_500x200c.jpg',
    '/c/2026-03-12/509949.shtml',
  ],
  [
    'HR Daily Capsule: Daily Practical Labor Law Tips (人社日课小知识)',
    '/upload/resources/image/2024/05/31/508059_500x200c.png',
    '/c/2021-06-04/308283.shtml',
  ],
  [
    'Monthly Review: Key 2026 Employment Highlights (月读人社大事)',
    '/upload/resources/image/2024/06/04/508154_500x200c.png',
    '/c/2024-02-08/397236.shtml',
  ],
  [
    'Emerging Occupations Showcase Season (新职业炫季)',
    '/upload/resources/image/2025/12/15/513870_500x200c.jpeg',
    '/c/2025-12-15/470675.shtml',
  ],
];

// ==========================================================
// 4. English Business Services Tabs & Feed (业务工作)
// ==========================================================
const workTabs = [
  'Employment Services (就业服务)',
  'Startup Support (创业服务)',
  'Training & Assessment (培训鉴定)',
  'Labor Relations (劳动关系)',
  'Social Security (社会保障)',
];

const workStories: Story[][] = [
  [
    {
      title: 'Anhui Xiuning: Campus Talent Pipeline Links Universities with Leading Enterprises',
      date: '10-29',
      href: '/c/2026-10-29/631918.shtml',
    },
    {
      title: 'Guangdong Guangzhou: Community Taskforce Helps Priority Groups Secure High-Quality Jobs',
      date: '10-29',
      href: '/c/2026-10-29/631921.shtml',
    },
    {
      title: 'Anhui Ma\'anshan: Direct-to-Enterprise Fast Track for Military Veterans Launched',
      date: '10-29',
      href: '/c/2026-10-29/630423.shtml',
    },
    {
      title: 'Henan Pingdingshan: Golden Autumn Career Fair Creates Jobs for Thousands',
      date: '10-29',
      href: '/c/2026-10-29/630422.shtml',
    },
    {
      title: 'Multi-Department Measures Promoting Stable Youth and Graduate Employment Nationwide',
      date: '10-28',
      href: '/ywpd/jyfw/',
    },
    {
      title: 'Public Employment Services Enter Campuses to Assist Career Selection & Guidance',
      date: '10-27',
      href: '/ywpd/jyfw/',
    },
  ],
  [
    {
      title: 'National Startup Incubator Network Expands Seed Subsidies for Tech Founders',
      date: '10-29',
      href: '/c/2026-10-29/631918.shtml',
    },
    {
      title: 'Youth Entrepreneurship Loan Program Reaches 500,000 Early-Stage Businesses',
      date: '10-28',
      href: '/hlwcyfw/',
    },
    {
      title: 'Startup Guidance Clinics: One-on-One Legal, Tax, and Financing Advisory',
      date: '10-27',
      href: '/hlwcyfw/',
    },
  ],
  [
    {
      title: 'Jiangsu Huai\'an: Eldercare & Infant Nursery Vocational Skills Training Programs',
      date: '10-29',
      href: '/c/2026-10-29/631981.shtml',
    },
    {
      title: 'Chongqing: 19 Measures Driving AI-Enabled Human Resource Services Development',
      date: '10-29',
      href: '/c/2026-10-29/631956.shtml',
    },
    {
      title: 'Sichuan Dazhou: Standardized Training Facilities Enhance Vocational Competency',
      date: '10-29',
      href: '/c/2026-10-29/631955.shtml',
    },
    {
      title: 'Jiangsu Huai\'an: Digital Agricultural Pioneers Forge Rural Revitalization Pathways',
      date: '10-28',
      href: '/c/2026-10-28/631943.shtml',
    },
    {
      title: 'Anhui Bozhou: Public Digital Skills & Short-Video Content Production Workshop',
      date: '10-28',
      href: '/c/2026-10-28/631937.shtml',
    },
    {
      title: 'Shandong Jining: Technical Evening Schools Illuminate Adult Upskilling Hours',
      date: '10-27',
      href: '/c/2026-10-27/630466.shtml',
    },
  ],
  [
    {
      title: 'Gansu Zhangye: 340,000 RMB in Withheld Wages Recovered and Distributed to Workers',
      date: '10-29',
      href: '/c/2026-10-29/631980.shtml',
    },
    {
      title: 'Shandong Qingdao: Multi-Channel Labor Rights Protection and Fast Dispute Mediation',
      date: '10-29',
      href: '/c/2026-10-29/631979.shtml',
    },
    {
      title: 'Shandong Qingdao: Practical Measures Ensuring Fair Pay & Standardized Employment Contracts',
      date: '10-29',
      href: '/c/2026-10-29/631978.shtml',
    },
    {
      title: 'Jiangxi Anyuan: Actively Safeguarding the Legal Rights and Health of Laborers',
      date: '10-28',
      href: '/c/2026-10-28/631905.shtml',
    },
    {
      title: 'Hebei Xianxian: Integrated Arbitration & Court Mediation Protects Wage Payments',
      date: '10-27',
      href: '/c/2026-10-27/630444.shtml',
    },
    {
      title: 'Sichuan Nanchong: Diversified Dispute Resolution Mechanisms Defuse Workplace Conflicts',
      date: '10-19',
      href: '/c/2026-10-19/621146.shtml',
    },
  ],
  [
    {
      title: 'Tibet Lhasa: "Social Security Services Enter 10,000 Homes" Publicity Campaign Launched',
      date: '10-29',
      href: '/c/2026-10-29/630446.shtml',
    },
    {
      title: 'Guangxi Liuzhou: Special Social Insurance Policy Briefing and Consultation Session',
      date: '10-29',
      href: '/c/2026-10-29/630448.shtml',
    },
    {
      title: 'Fujian: Resident Healthcare Fiscal Subsidy Standard Raised for 17th Consecutive Year',
      date: '10-28',
      href: '/c/2026-10-28/631902.shtml',
    },
    {
      title: 'Anhui Fuyang: Collective Economy Supplements Local Pension Funds for Seniors',
      date: '10-28',
      href: '/c/2026-10-28/631909.shtml',
    },
    {
      title: 'Hebei Cangzhou: Bank-Social Security Partnership Brings Benefits to Doorsteps',
      date: '10-27',
      href: '/c/2026-10-27/630445.shtml',
    },
    {
      title: 'Jiangxi: Annual Resident Medical Insurance Enrollment and Contribution Window Opens',
      date: '10-27',
      href: '/c/2026-10-27/630403.shtml',
    },
  ],
];

const heroSlides = [
  '/upload/resources/image/2026/10/30/516379_1200x260c.png',
  '/upload/resources/image/2026/10/10/515913_1200x260c.png',
  '/upload/resources/image/2026/10/10/515914_1200x260c.png',
  '/upload/resources/image/2026/10/09/515911_1200x260c.png',
];

const allStories: Story[] = [
  ...headlineGroups.flatMap((group) => [
    { ...group.lead, summary: group.summary },
    ...group.stories,
  ]),
  ...workStories.flat(),
];

const footerLinks = [
  ['Ministry of Human Resources and Social Security', 'http://www.mohrss.gov.cn/'],
  ['China Public Employment Service Network', 'http://job.mohrss.gov.cn/'],
  ['WorldSkills Competition China Committee', 'http://worldskillschina.mohrss.gov.cn/'],
  ['China National Talent Network', 'http://www.newjobs.com.cn/'],
  ['China Human Resources Market Portal', 'https://chrm.mohrss.gov.cn/'],
  ['Skills & Talent Assessment Authority', 'http://www.osta.org.cn'],
];

const provinces = [
  'Beijing', 'Tianjin', 'Hebei', 'Shanxi', 'Inner Mongolia',
  'Liaoning', 'Jilin', 'Heilongjiang', 'Shanghai', 'Jiangsu',
  'Zhejiang', 'Anhui', 'Fujian', 'Jiangxi', 'Shandong',
  'Henan', 'Hubei', 'Hunan', 'Guangdong', 'Guangxi',
  'Hainan', 'Chongqing', 'Sichuan', 'Guizhou', 'Yunnan',
  'Tibet', 'Shaanxi', 'Gansu', 'Qinghai', 'Ningxia',
  'Xinjiang', 'Bingtuan',
];

// ==========================================================
// 5. Components
// ==========================================================

// Header imported from @/components/ChinaHeader

function Carousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActive((n) => (n + 1) % heroSlides.length),
      5200
    );
    return () => window.clearInterval(timer);
  }, []);

  const move = (step: number) =>
    setActive((n) => (n + step + heroSlides.length) % heroSlides.length);

  return (
    <section className="hero" aria-label="Featured Showcase">
      <div className="hero-inner">
        {heroSlides.map((src, index) => (
          <a
            className={`hero-slide ${active === index ? 'active' : ''}`}
            key={src}
            href="https://www.mohrss.gov.cn/SYrlzyhshbzb/dongtaixinwen/buneiyaowen/rsxw/202610/t20261023_596043.html"
            target="_blank"
            rel="noreferrer"
            aria-hidden={active !== index}
          >
            <img src={asset(src)} alt="Human Resources and Social Security Updates" />
          </a>
        ))}
        <button
          type="button"
          className="hero-control hero-prev"
          onClick={() => move(-1)}
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          className="hero-control hero-next"
          onClick={() => move(1)}
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>
        <div className="hero-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              className={active === index ? 'active' : ''}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function HeadlineSection() {
  const [selected, setSelected] = useState(0);
  const group = headlineGroups[selected];

  return (
    <section className="panel news-panel" aria-label="News Desk">
      {/* Responsive vertical/horizontal tab switcher */}
      <div className="vertical-tabs" role="tablist">
        {headlineGroups.map((tab, index) => (
          <button
            type="button"
            role="tab"
            aria-selected={selected === index}
            key={tab.name}
            className={selected === index ? 'active' : ''}
            onClick={() => setSelected(index)}
          >
            <span className="tab-en">{tab.name}</span>
            <span className="tab-cn">{tab.cnName}</span>
          </button>
        ))}
      </div>

      <div className="news-body fade-in" key={group.name}>
        <div className="news-feature">
          <div>
            <h1 className="feature-title">
              <a
                href={group.lead.href}
                target={isExternal(group.lead.href) ? '_blank' : undefined}
                rel={isExternal(group.lead.href) ? 'noreferrer' : undefined}
              >
                {group.lead.title}
              </a>
            </h1>
            <p className="feature-summary">{group.summary}</p>
            <div className="feature-meta">
              <span>Source: {group.lead.source || 'MOHRSS'}</span>
              <span>•</span>
              <time>{group.lead.date}</time>
            </div>
          </div>
          <a
            href={group.lead.href}
            target={isExternal(group.lead.href) ? '_blank' : undefined}
            rel={isExternal(group.lead.href) ? 'noreferrer' : undefined}
            aria-label={group.lead.title}
          >
            <img className="feature-image" src={asset(group.image)} alt="" />
          </a>
        </div>

        <ul className="headline-list">
          {group.stories.map((story) => (
            <li key={story.title}>
              <a
                href={story.href}
                target={isExternal(story.href) ? '_blank' : undefined}
                rel={isExternal(story.href) ? 'noreferrer' : undefined}
              >
                {story.title}
              </a>
              <time>{story.date}</time>
            </li>
          ))}
        </ul>
        <a className="more-link" href={group.href}>
          View More &gt;
        </a>
      </div>
    </section>
  );
}

function TopicSection() {
  return (
    <section className="panel topic-panel" aria-label="Special Topics">
      <div className="section-heading">
        <h2>Special Coverage (专题资讯)</h2>
        <a href="/zxpd/ztzx/">More &gt;</a>
      </div>
      <div className="topic-grid">
        {topics.map(([title, image, href]) => (
          <a className="topic-card" href={href} key={title}>
            <img src={asset(image)} alt="" />
            <span>{title}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

function BusinessSection() {
  const [selected, setSelected] = useState(0);

  return (
    <section className="panel business-panel" aria-label="Public Workforce Services">
      <div className="business-heading">
        <h2>Workforce Services (业务工作)</h2>
        <div className="tab-row" role="tablist">
          {workTabs.map((tab, index) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={selected === index}
              className={selected === index ? 'active' : ''}
              onClick={() => setSelected(index)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>
      <ul className="business-list fade-in" key={selected}>
        {workStories[selected]?.map((story) => (
          <li key={story.title}>
            <a
              href={story.href}
              target={isExternal(story.href) ? '_blank' : undefined}
              rel={isExternal(story.href) ? 'noreferrer' : undefined}
            >
              {story.title}
            </a>
            <time>{story.date}</time>
          </li>
        ))}
      </ul>
      <a
        className="more-link"
        href={
          ['/ywpd/jyfw/', '/hlwcyfw/', '/ywpd/pxjd/', '/ywpd/ldgx/', '/ywpd/shbz/'][
            selected
          ]
        }
      >
        View More &gt;
      </a>
    </section>
  );
}

function CourseSections() {
  const courses = [
    {
      title: 'Eldercare Specialist (Intermediate Course)',
      cn: '养老护理员（中级）课程',
      src: '/images/newpic/pic1.jpg',
      href: 'http://jc.mohrss.gov.cn',
    },
    {
      title: 'Commercial Sales Specialist (Level 5)',
      cn: '商品营业员五级',
      src: '/images/newpic/pic2.jpg',
      href: 'http://jc.mohrss.gov.cn',
    },
    {
      title: 'Domestic Services Specialist (Level 5)',
      cn: '家政服务员五级',
      src: '/images/newpic/pic3.jpg',
      href: 'http://jc.mohrss.gov.cn',
    },
    {
      title: 'Security & Safety Officer (Level 5)',
      cn: '保安员五级',
      src: '/images/newpic/pic4.jpg',
      href: 'http://jc.mohrss.gov.cn',
    },
  ];

  const newJobs = [
    {
      title: 'Big Data Engineering Technician (Level 5)',
      cn: '大数据工程技术人员五级',
      src: '/images/newpic/pic1.png',
      href: 'http://xzy.mohrss.gov.cn',
    },
    {
      title: 'Blockchain Engineering Technician (Junior)',
      cn: '区块链工程技术人员初级',
      src: '/images/newpic/pic3.png',
      href: 'http://xzy.mohrss.gov.cn',
    },
    {
      title: 'IoT Systems Installation & Diagnostics (Level 5)',
      cn: '物联网安装调试员（五级）',
      src: '/images/newpic/pic4.png',
      href: 'http://xzy.mohrss.gov.cn',
    },
    {
      title: 'Industrial Robotics Operator Skills Advancement',
      cn: '工业机器人系统操作员专业提升',
      src: '/images/newpic/pic2.png',
      href: 'http://xzy.mohrss.gov.cn',
    },
  ];

  const render = (
    title: string,
    cnTitle: string,
    items: typeof courses
  ) => (
    <section className="course-section" key={title}>
      <div className="course-heading">
        <h2>
          {title} <span className="cn-sub">{cnTitle}</span>
        </h2>
        <a href={items[0].href} target="_blank" rel="noreferrer">
          More &gt;
        </a>
      </div>
      <div className="course-grid">
        {items.map((item) => (
          <a
            className="course-card"
            href={item.href}
            target="_blank"
            rel="noreferrer"
            key={item.title}
          >
            <img src={asset(item.src)} alt="" />
            <div className="course-title-box">
              <span className="course-en">{item.title}</span>
              <span className="course-cn">{item.cn}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );

  return (
    <>
      {render('Employment & Startup Training Platform', '就创平台', courses)}
      {render('Emerging Occupations Certification Platform', '新职业平台', newJobs)}
    </>
  );
}

function SearchResults({
  query,
  onClose,
}: {
  query: string;
  onClose: () => void;
}) {
  const results = useMemo(
    () =>
      allStories
        .filter(
          (story, index, list) =>
            story.title.toLowerCase().includes(query.toLowerCase()) &&
            list.findIndex((entry) => entry.title === story.title) === index
        )
        .slice(0, 20),
    [query]
  );

  return (
    <aside className="search-results" aria-live="polite">
      <div className="results-top">
        <strong>Search Results (搜索结果)</strong>
        <button type="button" aria-label="Close search" onClick={onClose}>
          <X size={18} />
        </button>
      </div>
      <p>Results matching: “{query}”</p>
      {results.length ? (
        <ul className="results-list">
          {results.map((story) => (
            <li key={story.title}>
              <a
                href={story.href}
                target={isExternal(story.href) ? '_blank' : undefined}
                rel={isExternal(story.href) ? 'noreferrer' : undefined}
              >
                {story.title}
              </a>
              <time>{story.date}</time>
            </li>
          ))}
        </ul>
      ) : (
        <div className="empty-results">
          No matching headlines found. Please try another keyword.
        </div>
      )}
    </aside>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        {/* Friendly Links */}
        <nav className="footer-links" aria-label="Ministry & Affiliated Links">
          {footerLinks.map(([label, href]) => (
            <a href={href} target="_blank" rel="noreferrer" key={label}>
              {label}
            </a>
          ))}
          <details className="local-links">
            <summary>Regional Portals (地方链接 ⌄)</summary>
            <div className="province-grid">
              {provinces.map((name) => (
                <a key={name} href="/gywm/">
                  {name}
                </a>
              ))}
            </div>
          </details>
        </nav>

        {/* Legal & Meta */}
        <nav className="footer-meta">
          <a href="/c/2018-08-01/201.shtml">Legal Statement</a>
          <a href="/gywm/">Site Map</a>
          <a href="/c/2018-08-01/202.shtml">Contact Us</a>
        </nav>

        {/* Bottom Org Info */}
        <div className="footer-bottom">
          <a
            href="http://bszs.conac.cn/sitename?method=show&id=24CB768E226157CEE053022819ACCF4A"
            target="_blank"
            rel="noreferrer"
          >
            <img
              src={asset('/images/footer/footer_logo.png?v=260209')}
              alt="Official Government Website Seal"
            />
          </a>
          <p>
            Host Unit: China Employment Training Technical Instruction Center (中国就业培训技术指导中心)
            <br />
            ICP Record No. 09079694-10 | Beijing Public Security Record No. 110401200230 | Site ID: bm15000006
          </p>
        </div>
      </div>
    </footer>
  );
}

const sectionPages: Record<
  string,
  { title: string; siblings: [string, string][] }
> = {
  '/zxpd/szyw/': {
    title: 'Policy Headlines',
    siblings: [
      ['Policy Headlines', '/zxpd/szyw/'],
      ['Major News', '/zxpd/zyxw/'],
      ['Core Initiatives', '/zxpd/zxdt/'],
      ['Special Coverage', '/zxpd/ztzx/'],
      ['Global Dynamics', '/zxpd/gjdt/'],
      ['Featured Archive', '/zxpd/wqlb/'],
    ],
  },
  '/zxpd/zyxw/': {
    title: 'Major News',
    siblings: [
      ['Policy Headlines', '/zxpd/szyw/'],
      ['Major News', '/zxpd/zyxw/'],
      ['Core Initiatives', '/zxpd/zxdt/'],
      ['Special Coverage', '/zxpd/ztzx/'],
      ['Global Dynamics', '/zxpd/gjdt/'],
      ['Featured Archive', '/zxpd/wqlb/'],
    ],
  },
  '/zxpd/zxdt/': {
    title: 'Core Initiatives',
    siblings: [
      ['Policy Headlines', '/zxpd/szyw/'],
      ['Major News', '/zxpd/zyxw/'],
      ['Core Initiatives', '/zxpd/zxdt/'],
      ['Special Coverage', '/zxpd/ztzx/'],
      ['Global Dynamics', '/zxpd/gjdt/'],
      ['Featured Archive', '/zxpd/wqlb/'],
    ],
  },
  '/zxpd/ztzx/': {
    title: 'Special Coverage',
    siblings: [
      ['Policy Headlines', '/zxpd/szyw/'],
      ['Major News', '/zxpd/zyxw/'],
      ['Core Initiatives', '/zxpd/zxdt/'],
      ['Special Coverage', '/zxpd/ztzx/'],
      ['Global Dynamics', '/zxpd/gjdt/'],
      ['Featured Archive', '/zxpd/wqlb/'],
    ],
  },
  '/zxpd/gjdt/': {
    title: 'Global Dynamics',
    siblings: [
      ['Policy Headlines', '/zxpd/szyw/'],
      ['Major News', '/zxpd/zyxw/'],
      ['Core Initiatives', '/zxpd/zxdt/'],
      ['Special Coverage', '/zxpd/ztzx/'],
      ['Global Dynamics', '/zxpd/gjdt/'],
      ['Featured Archive', '/zxpd/wqlb/'],
    ],
  },
  '/zxpd/wqlb/': {
    title: 'Featured Archive',
    siblings: [
      ['Policy Headlines', '/zxpd/szyw/'],
      ['Major News', '/zxpd/zyxw/'],
      ['Core Initiatives', '/zxpd/zxdt/'],
      ['Special Coverage', '/zxpd/ztzx/'],
      ['Global Dynamics', '/zxpd/gjdt/'],
      ['Featured Archive', '/zxpd/wqlb/'],
    ],
  },
  '/zbzl/': {
    title: 'Special Columns',
    siblings: [
      ['Special Columns', '/zbzl/'],
      ['Employment Services', '/ywpd/jyfw/'],
      ['Startup Services', '/hlwcyfw/'],
    ],
  },
  '/ywpd/jyfw/': {
    title: 'Employment Services',
    siblings: [
      ['Employment Services', '/ywpd/jyfw/'],
      ['Startup Services', '/hlwcyfw/'],
      ['Skills & Certifications', '/ywpd/pxjd/'],
      ['Labor Relations', '/ywpd/ldgx/'],
      ['Social Security', '/ywpd/shbz/'],
    ],
  },
  '/hlwcyfw/': {
    title: 'Startup Services',
    siblings: [
      ['Employment Services', '/ywpd/jyfw/'],
      ['Startup Services', '/hlwcyfw/'],
      ['Skills & Certifications', '/ywpd/pxjd/'],
      ['Labor Relations', '/ywpd/ldgx/'],
      ['Social Security', '/ywpd/shbz/'],
    ],
  },
  '/ywpd/pxjd/': {
    title: 'Skills & Certifications',
    siblings: [
      ['Employment Services', '/ywpd/jyfw/'],
      ['Startup Services', '/hlwcyfw/'],
      ['Skills & Certifications', '/ywpd/pxjd/'],
      ['Labor Relations', '/ywpd/ldgx/'],
      ['Social Security', '/ywpd/shbz/'],
    ],
  },
  '/ywpd/ldgx/': {
    title: 'Labor Relations',
    siblings: [
      ['Employment Services', '/ywpd/jyfw/'],
      ['Startup Services', '/hlwcyfw/'],
      ['Skills & Certifications', '/ywpd/pxjd/'],
      ['Labor Relations', '/ywpd/ldgx/'],
      ['Social Security', '/ywpd/shbz/'],
    ],
  },
  '/ywpd/shbz/': {
    title: 'Social Security',
    siblings: [
      ['Employment Services', '/ywpd/jyfw/'],
      ['Startup Services', '/hlwcyfw/'],
      ['Skills & Certifications', '/ywpd/pxjd/'],
      ['Labor Relations', '/ywpd/ldgx/'],
      ['Social Security', '/ywpd/shbz/'],
    ],
  },
  '/zcfg/zxzc/': {
    title: 'Latest Policies',
    siblings: [['Latest Policies', '/zcfg/zxzc/']],
  },
  '/sjpd/jdfbh/': {
    title: 'Quarterly Briefings',
    siblings: [
      ['Quarterly Briefings', '/sjpd/jdfbh/'],
      ['Shortage Occupations Index', '/sjpd/dqzypx/'],
      ['Salary & Wage Data', '/sjpd/gzsj/'],
    ],
  },
  '/sjpd/dqzypx/': {
    title: 'Shortage Occupations Index',
    siblings: [
      ['Quarterly Briefings', '/sjpd/jdfbh/'],
      ['Shortage Occupations Index', '/sjpd/dqzypx/'],
      ['Salary & Wage Data', '/sjpd/gzsj/'],
    ],
  },
  '/sjpd/gzsj/': {
    title: 'Salary & Wage Data',
    siblings: [
      ['Quarterly Briefings', '/sjpd/jdfbh/'],
      ['Shortage Occupations Index', '/sjpd/dqzypx/'],
      ['Salary & Wage Data', '/sjpd/gzsj/'],
    ],
  },
  '/bmfw/ytzx/': {
    title: 'Infographic Guides',
    siblings: [
      ['Infographic Guides', '/bmfw/ytzx/'],
      ['Interactive Q&A', '/bmfw/hdjl/'],
      ['Quick Inquiry', '/bmfw/wsbl/'],
    ],
  },
  '/bmfw/hdjl/': {
    title: 'Interactive Q&A',
    siblings: [
      ['Infographic Guides', '/bmfw/ytzx/'],
      ['Interactive Q&A', '/bmfw/hdjl/'],
      ['Quick Inquiry', '/bmfw/wsbl/'],
    ],
  },
  '/bmfw/wsbl/': {
    title: 'Quick Inquiry',
    siblings: [
      ['Infographic Guides', '/bmfw/ytzx/'],
      ['Interactive Q&A', '/bmfw/hdjl/'],
      ['Quick Inquiry', '/bmfw/wsbl/'],
    ],
  },
  '/gywm/': { title: 'About Us', siblings: [['About Us', '/gywm/']] },
};

function getParsedList(html: string): Story[] {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return Array.from(doc.querySelectorAll('.list_con_left > ul > li'))
    .flatMap((li) => {
      const link = li.querySelector('h4 a');
      const p = li.querySelector('p');
      if (!link) return [];
      const image = li.querySelector('img')?.getAttribute('src') || '';
      return [
        {
          title: link.getAttribute('title') || link.textContent?.trim() || '',
          date: '',
          href: link.getAttribute('href') || '/',
          summary: p?.textContent?.trim() || '',
          image,
        },
      ];
    })
    .filter((item) => Boolean(item.title));
}

function PopularPanel() {
  const [tab, setTab] = useState(0);
  const hot = allStories
    .filter(
      (story, index, list) =>
        list.findIndex((entry) => entry.title === story.title) === index
    )
    .slice(tab ? 4 : 0, tab ? 12 : 8);

  return (
    <aside className="portal-popular">
      <h3>Popular News (热门资讯)</h3>
      <div className="popular-tabs">
        {['Top Stories', 'Latest Policy', 'Weekly Trending'].map((label, i) => (
          <button
            type="button"
            className={tab === i ? 'active' : ''}
            key={label}
            onClick={() => setTab(i)}
          >
            {label}
          </button>
        ))}
      </div>
      <ul>
        {hot.map((story) => (
          <li key={story.title}>
            <a
              href={story.href}
              target={isExternal(story.href) ? '_blank' : undefined}
              rel={isExternal(story.href) ? 'noreferrer' : undefined}
            >
              {story.title}
            </a>
            <time>{story.date}</time>
          </li>
        ))}
      </ul>
      <h3 className="tag-heading">Tags (标签)</h3>
      <div className="tag-cloud">
        {[
          'College Graduate Employment',
          'Workforce Services',
          'Vocational Training',
          'Social Security',
        ].map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    </aside>
  );
}

function CategoryPage({ pathname }: { pathname: string }) {
  const config = sectionPages[pathname] || sectionPages['/zxpd/szyw/'];
  const [page, setPage] = useState(1);
  const groupIndex = headlineGroups.findIndex((group) => group.href === pathname);
  const selectedGroup = groupIndex >= 0 ? headlineGroups[groupIndex] : null;
  const newsList = pathname === '/zxpd/szyw/' ? getParsedList(categorySource) : [];
  let stories = newsList.length
    ? newsList
    : selectedGroup
    ? [selectedGroup.lead, ...selectedGroup.stories]
    : [];

  if (!stories.length && pathname.startsWith('/ywpd/')) {
    const idx =
      pathname === '/ywpd/jyfw/'
        ? 0
        : pathname === '/ywpd/pxjd/'
        ? 2
        : pathname === '/ywpd/ldgx/'
        ? 3
        : pathname === '/ywpd/shbz/'
        ? 4
        : -1;
    stories = idx >= 0 ? workStories[idx] : allStories.slice(8, 18);
  }
  if (!stories.length)
    stories = allStories.slice(
      pathname.startsWith('/sjpd') ? 0 : 8,
      pathname.startsWith('/sjpd') ? 10 : 18
    );

  const isPrimary = pathname.startsWith('/zxpd/');

  return (
    <main className="listing-shell">
      <div className="listing-cover" aria-hidden="true"></div>
      <div className="listing-layout">
        <section className="listing-main">
          <div className="crumbs">
            <a href="/">Home</a>
            <span>›</span>
            <span>
              {isPrimary
                ? 'News Channel'
                : pathname.startsWith('/ywpd') || pathname === '/zbzl/'
                ? 'Services & Programs'
                : config.title}
            </span>
            <span>›</span>
            <b>{config.title}</b>
          </div>
          <h1 className="listing-title">{config.title}</h1>
          <nav className="section-tabs" aria-label="Section Tabs">
            {config.siblings.map(([label, href]) => (
              <a
                className={href === pathname ? 'selected' : ''}
                href={href}
                key={href}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="listing-rows">
            {stories.map((story, index) => {
              const summary = ('summary' in story ? story.summary : '') as string;
              const image = ('image' in story ? story.image : '') || '';
              return (
                <article
                  className={`listing-story ${image ? 'with-image' : ''}`}
                  key={`${story.href}-${index}`}
                >
                  {image && (
                    <a className="listing-thumb" href={story.href}>
                      <img src={asset(image)} alt="" />
                    </a>
                  )}
                  <div className="listing-copy">
                    <h2>
                      <a
                        href={story.href}
                        target={isExternal(story.href) ? '_blank' : undefined}
                        rel={isExternal(story.href) ? 'noreferrer' : undefined}
                      >
                        {story.title}
                      </a>
                    </h2>
                    {summary && <p>{summary}</p>}
                    {story.date && (
                      <div className="listing-meta">
                        <span>China's Employment</span>
                        <time>{story.date}</time>
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
          <nav className="listing-pagination" aria-label="Pagination">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((n) => Math.max(1, n - 1))}
            >
              Prev
            </button>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <button
                type="button"
                key={n}
                className={page === n ? 'current' : ''}
                onClick={() => {
                  setPage(n);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setPage((n) => Math.min(9, n + 1));
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Next
            </button>
          </nav>
        </section>
        <PopularPanel />
      </div>
    </main>
  );
}

function readArticle(source: string) {
  const doc = new DOMParser().parseFromString(source, 'text/html');
  const title = doc.querySelector('.detail_con h4')?.textContent?.trim() || '';
  const author = doc.querySelector('.detail_info .link')?.textContent?.trim() || '';
  const date = doc.querySelector('.detail_info .date')?.textContent?.trim() || '';
  const article = doc.querySelector('.detail_article')?.innerHTML || '';
  const change = doc.querySelector('.detail_chenge');
  const links = Array.from(change?.querySelectorAll('a') || []).map((a) => ({
    title:
      a.getAttribute('title') || a.querySelector('div')?.textContent?.trim() || '',
    href: a.getAttribute('href') || '',
    label: a.querySelector('span')?.textContent?.trim() || '',
  }));
  return { title, author, date, article, links };
}

function ArticlePage({ pathname }: { pathname: string }) {
  const id = pathname.match(/\/(\d+)\.shtml$/)?.[1] || '';
  const full =
    id === '631952'
      ? readArticle(primaryArticleSource)
      : id === '631918'
      ? readArticle(employmentArticleSource)
      : null;
  const story = allStories.find((entry) => entry.href.endsWith(`/${id}.shtml`));
  const title = full?.title || story?.title || 'China\'s Employment';
  const routeDate = pathname.match(/\/c\/(\d{4})-(\d{2})-(\d{2})\//);
  const date =
    full?.date ||
    (routeDate ? `${routeDate[1]}.${routeDate[2]}.${routeDate[3]}` : '');
  const [fontSize, setFontSize] = useState(18);
  const articleHtml = full?.article
    .replaceAll('src="/upload/', `src="${origin}/upload/`)
    .replaceAll('href="/upload/', `href="${origin}/upload/`);
  const fallbackBody = story?.summary || '';
  const relationLinks =
    full?.links.filter((item) => item.href && item.href !== 'javascript:;') || [];

  return (
    <main className="article-shell">
      <div className="article-cover" aria-hidden="true"></div>
      <div className="article-layout">
        <article className="article-main">
          <div className="crumbs">
            <a href="/">Home</a>
            <span>›</span>
            <a href="/zxpd/szyw/">News Channel</a>
            <span>›</span>
            <a href="/zxpd/szyw/">Policy Headlines</a>
          </div>
          <h1 className="article-title">{title}</h1>
          <div className="article-byline">
            <span>{full?.author || 'China\'s Employment'}</span>
            <time>{date}</time>
            <div className="article-font-tools">
              <span>Font</span>
              {[16, 18, 20].map((size) => (
                <button
                  key={size}
                  type="button"
                  className={fontSize === size ? 'active' : ''}
                  onClick={() => setFontSize(size)}
                >
                  {size === 16 ? 'Small' : size === 18 ? 'Medium' : 'Large'}
                </button>
              ))}
            </div>
            <span className="article-source-tag">Source: China\'s Employment</span>
          </div>
          <div className="article-rule"></div>
          <div
            className="article-body"
            style={{ fontSize }}
            dangerouslySetInnerHTML={
              articleHtml ? { __html: articleHtml } : undefined
            }
          >
            {!articleHtml && fallbackBody ? <p>{fallbackBody}</p> : null}
          </div>
          {full?.title && (
            <div className="article-tags">
              {(id === '631952'
                ? ['Governance', 'Workforce', 'Reform', 'Strategy']
                : ['Colleges', 'Youth', 'Platform', 'Talent']
              ).map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}
          <div className="article-switch">
            {relationLinks.length ? (
              relationLinks.map((link) => (
                <a href={link.href} key={link.href}>
                  <small>{link.label}</small>
                  <span>{link.title}</span>
                </a>
              ))
            ) : (
              <a href={pathname.startsWith('/c/') ? '/zxpd/szyw/' : '/'}>
                <small>Back to section</small>
                <span>{story ? 'Policy Headlines' : 'China Job Portal Home'}</span>
              </a>
            )}
          </div>
          <section className="article-recommend">
            <h2>Recommended Reading</h2>
            {allStories.slice(0, 4).map((entry) => (
              <a key={entry.title} href={entry.href}>
                {entry.title}
              </a>
            ))}
          </section>
        </article>
        <PopularPanel />
      </div>
    </main>
  );
}

// ==========================================================
// 6. Main China Job Portal App Component
// ==========================================================
export default function ChinaJobPortal() {
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = window.location.pathname;

  const quickItems = [
    {
      label: 'Labor Brands',
      cn: '家政劳务品牌',
      href: '/zbzl/jzlwpp/',
      icon: <UsersRound size={22} />,
    },
    {
      label: 'Quarterly Reports',
      cn: '季度发布会',
      href: '/sjpd/jdfbh/',
      icon: <BriefcaseBusiness size={22} />,
    },
    {
      label: 'Infographic Guides',
      cn: '一图知晓',
      href: '/bmfw/ytzx/',
      icon: <FileCheck2 size={22} />,
    },
    {
      label: 'Interactive Q&A',
      cn: '互动交流',
      href: '/bmfw/hdjl/',
      icon: <GraduationCap size={22} />,
    },
  ];

  const shortcuts = [
    {
      label: 'Skills Certificate Verification',
      cn: '职业技能证书查询',
      href: 'https://www.osta.org.cn',
      icon: <Award size={20} />,
    },
    {
      label: '12333 Employment Helpline',
      cn: '12333电话咨询服务',
      href: 'http://www.mohrss.gov.cn/SYrlzyhshbzb/zhuanti/jinbaogongcheng/jbgcdianhuazixunfuwu/',
      icon: <PhoneCall size={20} />,
    },
    {
      label: 'National Employment Certificate',
      cn: '全国《就业创业证》查询',
      href: `${origin}/bmfw/wsbl/`,
      icon: <FileCheck2 size={20} />,
    },
    {
      label: 'Provincial Service Portals',
      cn: '各省公共就业服务平台',
      href: `${origin}/ywpd/jyfw/`,
      icon: <Globe2 size={20} />,
    },
  ];

  if (pathname.startsWith('/c/')) {
    return (
      <div className="page-shell">
        <ChinaHeader onSearch={setSearchQuery} />
        <ArticlePage pathname={pathname} />
        <Footer />
        {searchQuery && (
          <SearchResults query={searchQuery} onClose={() => setSearchQuery('')} />
        )}
      </div>
    );
  }

  if (sectionPages[pathname]) {
    return (
      <div className="page-shell">
        <ChinaHeader onSearch={setSearchQuery} />
        <CategoryPage pathname={pathname} />
        <Footer />
        {searchQuery && (
          <SearchResults query={searchQuery} onClose={() => setSearchQuery('')} />
        )}
      </div>
    );
  }

  return (
    <div className="page-shell">
      <ChinaHeader onSearch={setSearchQuery} />
      <Carousel />
      <main className="container content">
        {/* Top 2-Column Grid */}
        <div className="top-grid">
          <HeadlineSection />
          <TopicSection />
        </div>

        {/* 4-Column Special Campaign Strip */}
        <div className="special-strip">
          {[
            [
              'Entrepreneurship Training',
              '创业培训',
              '/images/index/index_special6.jpg',
              '/ywpd/pxjd/rmzt/cypx/',
            ],
            [
              'Integrated Dual-Track Faculty Training',
              '技工院校工学一体化培养',
              '/images/newpage/gxyth.png',
              '/ywpd/pxjd/rmzt/jgyxgxythjspy/',
            ],
            [
              'Job Readiness & Interview Bootcamps',
              '求职能力实训工作',
              '/images/index/index_special002.jpg',
              '/zbzl/qznlsxgz/',
            ],
            [
              'Public Employment Skills Contest',
              '公共就业服务专项业务竞赛',
              '/images/index/index_special001.jpg',
              '/zbzl/ggjyfwzxywjs/',
            ],
          ].map(([title, cn, image, href]) => (
            <a href={href} key={title} aria-label={title} className="strip-card">
              <img src={asset(image)} alt={title} />
              <div className="strip-label-box">
                <span className="strip-en">{title}</span>
                <span className="strip-cn">{cn}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Business Grid + Quick Services */}
        <div className="business-grid">
          <BusinessSection />
          <div className="quick-services">
            {quickItems.map((item) => (
              <a className="service-tile" href={item.href} key={item.label}>
                <div className="service-icon">{item.icon}</div>
                <h3>{item.label}</h3>
                <span className="tile-cn-sub">{item.cn}</span>
                <span className="tile-more-link">Learn More ›</span>
              </a>
            ))}
          </div>
        </div>

        {/* Course Platforms */}
        <CourseSections />

        {/* Fast Shortcut Portals */}
        <section className="shortcut">
          <div className="course-heading">
            <h2>
              Fast Shortcuts <span className="cn-sub">快捷通道</span>
            </h2>
            <a href="/bmfw/ytzx/">Learn More &gt;</a>
          </div>
          <div className="shortcut-grid">
            {shortcuts.map((sc) => (
              <a
                className="shortcut-item"
                href={sc.href}
                target={isExternal(sc.href) ? '_blank' : undefined}
                rel={isExternal(sc.href) ? 'noreferrer' : undefined}
                key={sc.label}
              >
                <span className="shortcut-icon">{sc.icon}</span>
                <div className="shortcut-text">
                  <span className="sc-en">{sc.label}</span>
                  <span className="sc-cn">{sc.cn}</span>
                </div>
              </a>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      {searchQuery && (
        <SearchResults query={searchQuery} onClose={() => setSearchQuery('')} />
      )}
    </div>
  );
}
