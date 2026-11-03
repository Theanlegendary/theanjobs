import { useState, useMemo, useRef } from 'react';
import { Link } from 'wouter';
import {
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Search,
  Sparkles,
  Clock,
  Calendar,
  Share2,
  Headphones,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { SEO } from '@/lib/seo';

export interface ArticleStory {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface AudioStory {
  id: string;
  show: string;
  title: string;
  duration: string;
  articleId: string;
}

// 1. Featured Top Stories (Section 1 - 2 large landscape cards)
const leadFeaturedStories: ArticleStory[] = [
  {
    id: 'art-1',
    title: 'How Frontier AI Models Are Transforming Modern Software Engineering Teams',
    excerpt:
      'From autonomous code reviews to dynamic bug synthesizers, engineering leaders are rethinking developer velocity and developer experience in 2026. But it can be hard to tell how quickly to integrate autonomous agent pipelines into mission-critical systems.',
    category: 'Artificial Intelligence',
    date: 'Oct 28, 2026',
    readTime: '6 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Staff Tech Journalist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
  },
  {
    id: 'art-2',
    title: 'The Rise of Async-First Architecture: What 100 Remote Startups Learned',
    excerpt:
      'Why meeting overload is disappearing in favor of structured documentation, asynchronous sprint rituals, and autonomous decision frameworks. Nearly seventy engineering directors share how reducing sync calls boosted production velocity by 40%.',
    category: 'Startup Culture',
    date: 'Oct 26, 2026',
    readTime: '5 min read',
    author: {
      name: 'Marcus Vance',
      role: 'Engineering Management Contributor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
  },
];

// 2. Recommended Audio Carousel Stories (Section 2 - Square Cards)
const recommendedAudioList: AudioStory[] = [
  {
    id: 'audio-1',
    show: 'The Global Tech Story',
    title: 'Anthropic warns its frontier AI models could be dangerous. So why do people want to invest?',
    duration: '26 mins',
    articleId: 'art-1',
  },
  {
    id: 'audio-2',
    show: 'Infrastructure Radar',
    title: 'Datadog deploys low-latency streaming engine: Processing 120M events per second with eBPF',
    duration: '28 mins',
    articleId: 'art-5',
  },
  {
    id: 'audio-3',
    show: 'Staff Plus Podcast',
    title: 'The myth of the 10x engineer: What 20 Tech Leads learned about navigating Staff promotions',
    duration: '25 mins',
    articleId: 'art-6',
  },
  {
    id: 'audio-4',
    show: 'Remote Startup Briefing',
    title: 'Async-First Playbook: Why 100 venture-backed startups replaced standups with living docs',
    duration: '24 mins',
    articleId: 'art-2',
  },
  {
    id: 'audio-5',
    show: 'Compound AI Daily',
    title: 'Why monolithic foundation models are losing to multi-agent compound reasoning systems',
    duration: '17 mins',
    articleId: 'art-1',
  },
  {
    id: 'audio-6',
    show: 'Executive Compensation',
    title: 'The 2026 Tech Salary Report: Why Rust, CUDA, and distributed systems engineers command record pay',
    duration: '32 mins',
    articleId: 'art-4',
  },
  {
    id: 'audio-7',
    show: 'Cloud Security Dispatch',
    title: 'Zero-Trust microservices in practice: Automating ephemeral identities without latency spikes',
    duration: '19 mins',
    articleId: 'art-5',
  },
];

// 3. Spotlight Investigations (Section 3 - 3 Column Feature Cards)
const spotlightInvestigations: ArticleStory[] = [
  {
    id: 'art-3',
    title: 'Micro-Frontends in 2026: When to Adopt and When to Run Away',
    excerpt:
      'An architectural deep dive exploring trade-offs between unified monorepos, module federation, and independent deployable frontends.',
    category: 'Engineering & Systems',
    date: 'Oct 24, 2026',
    readTime: '8 min read',
    author: {
      name: 'Sarah Chen',
      role: 'Principal Systems Architect',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    },
  },
  {
    id: 'art-4',
    title: 'Salary Transparency Laws Are Reshaping Tech Hiring: The Data Behind It',
    excerpt:
      'How mandatory wage ranges in job postings have impacted offer negotiations, retention rates, and gender pay parity across US tech hubs.',
    category: 'Career & Compensation',
    date: 'Oct 22, 2026',
    readTime: '4 min read',
    author: {
      name: 'David Miller',
      role: 'Senior Workplace Analyst',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
  },
  {
    id: 'art-5',
    title: 'Zero-Trust Security for Cloud-Native Microservices: Practical Patterns',
    excerpt:
      'Implementing automated mTLS, ephemeral identity tokens, and policy enforcement across container orchestration clusters without hurting latency.',
    category: 'Cloud & Infrastructure',
    date: 'Oct 20, 2026',
    readTime: '7 min read',
    author: {
      name: 'Tariq Al-Mansoor',
      role: 'Cloud Security Lead',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80',
    },
  },
];

// 4. Full Article Archive for Searching & Categorized Exploration
const allArchiveArticles: ArticleStory[] = [
  ...leadFeaturedStories,
  ...spotlightInvestigations,
  {
    id: 'art-6',
    title: 'Navigating Your First Staff Engineer Promotion: Lessons From 20 Tech Leads',
    excerpt:
      'The transition from senior to staff engineer requires shifting from writing the best code to amplifying everyone else around you.',
    category: 'Career Growth',
    date: 'Oct 18, 2026',
    readTime: '6 min read',
    author: {
      name: 'Elena Rostova',
      role: 'Staff Tech Journalist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    },
  },
  {
    id: 'art-7',
    title: 'GitLab Unveils Autonomous AI Duo: Transforming Developer Workflows from Planning to Production',
    excerpt:
      'Autonomous agentic pipelines in modern DevSecOps allow developers to automate security audits, auto-generate unit tests, and resolve edge cases.',
    category: 'Engineering & Systems',
    date: 'Oct 16, 2026',
    readTime: '5 min read',
    author: {
      name: 'Alexandre Mercier',
      role: 'DevOps Researcher',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    },
  },
  {
    id: 'art-8',
    title: 'The Shift to Compound AI Systems: Why Future Software Engineering Belongs to Orchestrators',
    excerpt:
      'Monolithic foundation models have reached diminishing returns on raw parameter scaling. In this detailed study, discover how compound systems deliver 3x higher accuracy.',
    category: 'Artificial Intelligence',
    date: 'Oct 14, 2026',
    readTime: '8 min read',
    author: {
      name: 'Dr. Elena Rostova',
      role: 'Principal AI Scientist',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
    },
  },
  {
    id: 'art-9',
    title: 'Cross-Border Tech Hiring Guidelines & Global Remote Tax Treaties for 2026',
    excerpt:
      'Key considerations for founders and heads of talent building distributed teams across North America, Europe, and Southeast Asia.',
    category: 'Startup Culture',
    date: 'Oct 12, 2026',
    readTime: '7 min read',
    author: {
      name: 'Michael Sterling',
      role: 'Global Employment Counsel',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
    },
  },
];

const topicTabs = [
  'All Stories',
  'Artificial Intelligence',
  'Engineering & Systems',
  'Startup Culture',
  'Career & Compensation',
  'Cloud & Infrastructure',
];

export default function Articles() {
  const [selectedTopic, setSelectedTopic] = useState('All Stories');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedItems, setSavedItems] = useState<Record<string, boolean>>({});
  const audioScrollRef = useRef<HTMLDivElement>(null);

  const toggleSave = (id: string) => {
    setSavedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const scrollAudio = (direction: 'left' | 'right') => {
    if (audioScrollRef.current) {
      const offset = direction === 'left' ? -280 : 280;
      audioScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const filteredArchive = useMemo(() => {
    return allArchiveArticles.filter((art) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery =
        !q ||
        art.title.toLowerCase().includes(q) ||
        art.excerpt.toLowerCase().includes(q) ||
        art.category.toLowerCase().includes(q);

      const matchesTopic =
        selectedTopic === 'All Stories' ||
        art.category.toLowerCase() === selectedTopic.toLowerCase();

      return matchesQuery && matchesTopic;
    });
  }, [searchQuery, selectedTopic]);

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-20">
      <SEO
        title="Articles & Tech Journalism | Sandbox"
        description="Authoritative reporting on artificial intelligence, software architecture, tech compensation, and global engineering talent."
        canonical={typeof window !== 'undefined' ? `${window.location.origin}/articles` : ''}
        keywords={['tech news', 'engineering articles', 'AI journalism', 'BBC style news', 'software architecture']}
      />

      {/* Main BBC-Style Content Container */}
      <main className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">

        {/* Top Editorial Category Masthead / Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-3 mb-6">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none py-1">
            <span className="text-xs font-black uppercase tracking-widest text-neutral-900 border-b-2 border-black pb-1">
              NEWS JOURNAL
            </span>
            {topicTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setSelectedTopic(tab)}
                className={`text-xs font-bold whitespace-nowrap transition-colors uppercase tracking-wide ${
                  selectedTopic === tab
                    ? 'text-neutral-950 border-b-2 border-black pb-1'
                    : 'text-neutral-500 hover:text-neutral-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              placeholder="Search news & topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-100 border border-neutral-300 rounded-none pl-9 pr-3 py-1.5 text-xs text-neutral-900 placeholder-neutral-500 focus:outline-none focus:border-black focus:bg-white transition-colors"
            />
          </div>
        </div>

        {/* ============================================================== */}
        {/* SECTION 1: ONLY FROM SANDBOX (TOP 2-COLUMN LARGE FEATURE CARDS) */}
        {/* ============================================================== */}
        <section className="mb-12">
          {/* Section Heading with Solid Black Line */}
          <div className="border-t-2 border-black pt-2 pb-4 mb-4">
            <h2 className="text-xs sm:text-sm font-black tracking-wider uppercase text-neutral-900">
              ONLY FROM SANDBOX JOURNAL
            </h2>
          </div>

          {/* 2 Side-by-Side Large Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {leadFeaturedStories.map((story) => (
              <article key={story.id} className="flex flex-col group">
                {/* Large 16:9 Image Box in Pure Black Placeholder */}
                <Link
                  href={`/articles/${story.id}`}
                  className="w-full aspect-[16/9] bg-black block relative overflow-hidden transition-opacity group-hover:opacity-95"
                  aria-label={story.title}
                >
                  {/* Black placeholder box as requested by user */}
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <span className="sr-only">{story.title}</span>
                  </div>
                </Link>

                {/* Headline in Classic BBC Editorial Serif Font */}
                <h3 className="bbc-news-headline text-2xl lg:text-[28px] font-bold text-neutral-950 mt-3.5 leading-snug tracking-tight">
                  <Link
                    href={`/articles/${story.id}`}
                    className="hover:underline text-neutral-950 group-hover:text-blue-700 transition-colors"
                  >
                    {story.title}
                  </Link>
                </h3>

                {/* Descriptive Excerpt */}
                <p className="text-[14px] sm:text-[15px] text-neutral-600 leading-relaxed font-sans mt-2.5">
                  {story.excerpt}
                </p>
              </article>
            ))}
          </div>
        </section>


        {/* ============================================================== */}
        {/* SECTION 2: RECOMMENDED AUDIO > (SQUARE PODCAST/AUDIO CAROUSEL)  */}
        {/* ============================================================== */}
        <section className="mb-12">
          {/* Header Row with Chevron & Left/Right Carousel Nav Arrows */}
          <div className="border-t border-neutral-300 pt-3 pb-3 mb-4 flex items-center justify-between">
            <Link
              href="/articles"
              className="text-xs sm:text-sm font-black tracking-wider uppercase text-neutral-900 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>RECOMMENDED AUDIO</span>
              <ChevronRight
                size={16}
                strokeWidth={3}
                className="text-neutral-900 group-hover:translate-x-0.5 transition-transform"
              />
            </Link>

            {/* Carousel Navigation Buttons */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => scrollAudio('left')}
                className="w-7 h-7 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                aria-label="Previous audio"
              >
                <ChevronLeft size={16} strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => scrollAudio('right')}
                className="w-7 h-7 rounded-full border border-neutral-300 hover:border-black flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                aria-label="Next audio"
              >
                <ChevronRight size={16} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          {/* Carousel Horizontal Scroll Container */}
          <div
            ref={audioScrollRef}
            className="flex gap-4 overflow-x-auto pb-4 scrollbar-none scroll-smooth"
          >
            {recommendedAudioList.map((audio) => {
              const isSaved = !!savedItems[audio.id];

              return (
                <div
                  key={audio.id}
                  className="w-[180px] sm:w-[210px] md:w-[225px] flex-shrink-0 flex flex-col group"
                >
                  {/* Square Image Box in Pure Black Placeholder */}
                  <Link
                    href={`/articles/${audio.articleId}`}
                    className="w-full aspect-square bg-black relative block overflow-hidden"
                    aria-label={audio.title}
                  >
                    {/* Pure black box placeholder */}
                    <div className="absolute inset-0 bg-black flex items-center justify-center" />
                  </Link>

                  {/* Equalizer Wave Icon + Show Title */}
                  <div className="flex items-center gap-1.5 mt-2.5">
                    {/* Equalizer lines graphic matching BBC ıll */}
                    <span className="flex items-end gap-[2px] h-3 text-neutral-800" aria-hidden="true">
                      <span className="w-[2px] h-2 bg-neutral-900" />
                      <span className="w-[2px] h-3 bg-neutral-900" />
                      <span className="w-[2px] h-1.5 bg-neutral-900" />
                    </span>
                    <span className="text-[12px] text-neutral-600 font-semibold tracking-tight truncate">
                      {audio.show}
                    </span>
                  </div>

                  {/* Episode Title (2-3 lines clamp) */}
                  <h4 className="text-[14px] font-bold text-neutral-950 leading-snug line-clamp-3 hover:underline cursor-pointer mt-1 mb-3">
                    <Link href={`/articles/${audio.articleId}`}>
                      {audio.title}
                    </Link>
                  </h4>

                  {/* Meta Row: Save Button & Duration */}
                  <div className="mt-auto pt-2 flex items-center justify-between text-xs text-neutral-600 border-t border-neutral-100">
                    <button
                      type="button"
                      onClick={() => toggleSave(audio.id)}
                      className={`flex items-center gap-1 font-semibold transition-colors ${
                        isSaved ? 'text-blue-700 font-bold' : 'text-neutral-700 hover:text-black'
                      }`}
                    >
                      <Bookmark
                        size={14}
                        fill={isSaved ? '#1d4ed8' : 'none'}
                        strokeWidth={2}
                      />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                    <span className="text-neutral-500 font-medium">{audio.duration}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>


        {/* ============================================================== */}
        {/* SECTION 3: 2026 TECH SPOTLIGHT > (3-COLUMN FEATURE CARDS)      */}
        {/* ============================================================== */}
        <section className="mb-14">
          {/* Header Row with Chevron */}
          <div className="border-t border-neutral-300 pt-3 pb-3 mb-4">
            <Link
              href="/articles"
              className="text-xs sm:text-sm font-black tracking-wider uppercase text-neutral-900 hover:text-blue-700 flex items-center gap-1 group"
            >
              <span>2026 SPECIAL INVESTIGATIONS</span>
              <ChevronRight
                size={16}
                strokeWidth={3}
                className="text-neutral-900 group-hover:translate-x-0.5 transition-transform"
              />
            </Link>
          </div>

          {/* 3-Column Feature Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {spotlightInvestigations.map((story) => {
              const isSaved = !!savedItems[story.id];

              return (
                <article key={story.id} className="flex flex-col group">
                  {/* 16:9 Landscape Pure Black Image Box */}
                  <Link
                    href={`/articles/${story.id}`}
                    className="w-full aspect-[16/9] bg-black block relative overflow-hidden transition-opacity group-hover:opacity-95"
                    aria-label={story.title}
                  >
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <span className="sr-only">{story.title}</span>
                    </div>
                  </Link>

                  {/* Category Tag */}
                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mt-2.5">
                    {story.category}
                  </span>

                  {/* Headline in BBC Editorial Serif */}
                  <h3 className="bbc-news-headline text-lg sm:text-xl font-bold text-neutral-950 mt-1 leading-snug">
                    <Link
                      href={`/articles/${story.id}`}
                      className="hover:underline text-neutral-950 group-hover:text-blue-700 transition-colors"
                    >
                      {story.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="text-[13px] sm:text-[14px] text-neutral-600 leading-relaxed font-sans line-clamp-2 mt-1.5">
                    {story.excerpt}
                  </p>

                  {/* Meta Bar */}
                  <div className="mt-auto pt-3 flex items-center justify-between text-xs text-neutral-500">
                    <span>{story.readTime} • {story.date}</span>
                    <button
                      type="button"
                      onClick={() => toggleSave(story.id)}
                      className={`flex items-center gap-1 font-semibold transition-colors ${
                        isSaved ? 'text-blue-700' : 'text-neutral-700 hover:text-black'
                      }`}
                    >
                      <Bookmark size={13} fill={isSaved ? '#1d4ed8' : 'none'} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        </section>


        {/* ============================================================== */}
        {/* SECTION 4: ALL STORIES ARCHIVE (FILTERABLE FEED)                */}
        {/* ============================================================== */}
        <section className="border-t-2 border-black pt-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xs sm:text-sm font-black tracking-wider uppercase text-neutral-900">
                MORE STORIES & TOPICS ({filteredArchive.length})
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5">
                Comprehensive reporting from our global tech journalism network
              </p>
            </div>
          </div>

          {/* Grid of Archive Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredArchive.map((story) => {
              const isSaved = !!savedItems[story.id];

              return (
                <article key={story.id} className="flex flex-col group border-b border-neutral-100 pb-5">
                  {/* Landscape Pure Black Placeholder Box */}
                  <Link
                    href={`/articles/${story.id}`}
                    className="w-full aspect-[16/9] bg-black block relative overflow-hidden"
                    aria-label={story.title}
                  >
                    <div className="absolute inset-0 bg-black flex items-center justify-center">
                      <span className="sr-only">{story.title}</span>
                    </div>
                  </Link>

                  <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 mt-2.5">
                    {story.category}
                  </span>

                  <h3 className="bbc-news-headline text-[17px] font-bold text-neutral-950 mt-1 leading-snug">
                    <Link
                      href={`/articles/${story.id}`}
                      className="hover:underline text-neutral-950 group-hover:text-blue-700 transition-colors"
                    >
                      {story.title}
                    </Link>
                  </h3>

                  <p className="text-[13px] text-neutral-600 leading-relaxed line-clamp-2 mt-1.5">
                    {story.excerpt}
                  </p>

                  <div className="mt-auto pt-3 flex items-center justify-between text-xs text-neutral-500">
                    <span>{story.readTime}</span>
                    <button
                      type="button"
                      onClick={() => toggleSave(story.id)}
                      className={`flex items-center gap-1 font-semibold ${
                        isSaved ? 'text-blue-700' : 'text-neutral-700 hover:text-black'
                      }`}
                    >
                      <Bookmark size={13} fill={isSaved ? '#1d4ed8' : 'none'} />
                      <span>{isSaved ? 'Saved' : 'Save'}</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {filteredArchive.length === 0 && (
            <div className="text-center py-16 bg-neutral-50 rounded-none border border-neutral-200">
              <p className="text-neutral-600 text-sm mb-3">No articles match your search or filter.</p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedTopic('All Stories');
                }}
                className="px-4 py-2 bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800"
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}
