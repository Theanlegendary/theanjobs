import React, { useEffect } from 'react';
import { useParams, Link } from 'wouter';
import {
  Clock,
  User,
  Share2,
  Bookmark,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  FileCheck2,
  Building
} from 'lucide-react';
import { getArticleByIdOrSlug, articlesDatabase, ArticleItem } from '@/data/portalData';
import { SEO, StructuredData, generateArticleSchema, generateBreadcrumbSchema } from '@/lib/seo';

export default function ArticleDetail() {
  const params = useParams<{ id?: string }>();
  const searchParams = new URLSearchParams(window.location.search);
  const articleId = params.id || searchParams.get('slug') || searchParams.get('id') || 'art-1';

  const article: ArticleItem = getArticleByIdOrSlug(articleId) || articlesDatabase[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [articleId]);

  return (
    <article className="article-detail-page-container">
      {/* SEO Meta Tags */}
      <SEO
        title={article.title}
        description={article.excerpt}
        canonical={`${typeof window !== 'undefined' ? window.location.origin : ''}/articles/${articleId}`}
        ogImage={article.image}
        ogType="article"
        publishedTime={new Date(Date.now() - 86400000).toISOString()}
        author={article.authorName}
        keywords={[article.topicTag, article.categoryLabel, 'tech news', 'industry insights']}
      />
      
      {/* Article Structured Data */}
      <StructuredData
        data={generateArticleSchema({
          headline: article.title,
          description: article.excerpt,
          image: `${typeof window !== 'undefined' ? window.location.origin : ''}${article.image}`,
          datePublished: new Date(Date.now() - 86400000).toISOString(),
          author: article.authorName,
          url: `${typeof window !== 'undefined' ? window.location.origin : ''}/articles/${articleId}`,
        })}
      />
      
      {/* Breadcrumb Schema */}
      <StructuredData
        data={generateBreadcrumbSchema([
          { name: 'Home', url: `${typeof window !== 'undefined' ? window.location.origin : ''}/` },
          { name: 'Articles', url: `${typeof window !== 'undefined' ? window.location.origin : ''}/tech-topics` },
          { name: article.title, url: `${typeof window !== 'undefined' ? window.location.origin : ''}/articles/${articleId}` },
        ])}
      />
      
      {/* 1. Breadcrumbs */}
      <div className="article-breadcrumb-bar">
        <div className="container article-breadcrumb-inner">
          <Link href="/" className="crumb-link">Home</Link>
          <span className="crumb-sep">/</span>
          <Link href="/tech-topics" className="crumb-link">News & Intelligence</Link>
          <span className="crumb-sep">/</span>
          <span className="crumb-current">{article.title}</span>
        </div>
      </div>

      {/* 2. Editorial Canvas */}
      <div className="editorial-canvas-wrapper">
        <div className="container editorial-narrow-container">
          {/* Category Kicker */}
          <div className="editorial-kicker-row">
            <span className="editorial-kicker-pill">{article.categoryLabel}</span>
            <span className="editorial-topic-text">{article.topicTag}</span>
          </div>

          {/* Star Headline */}
          <h1 className="editorial-star-headline">{article.title}</h1>

          {/* Excerpt Lead */}
          <p className="editorial-excerpt-lead">{article.excerpt}</p>

          {/* Author Byline Bar */}
          <div className="editorial-byline-bar">
            <div className="byline-left">
              <img src={article.authorAvatar} alt={article.authorName} className="byline-avatar" />
              <div className="byline-meta-text">
                <div className="byline-name-row">
                  <span className="byline-author-name">{article.authorName}</span>
                  {article.companyName && (
                    <span className="byline-company-pill">• {article.companyName}</span>
                  )}
                </div>
                <div className="byline-sub-role">
                  <span>{article.authorRole}</span>
                </div>
              </div>
            </div>

            <div className="byline-right-meta">
              <span className="byline-timestamp"><Clock size={13} /> {article.timeAgo} ({article.date})</span>
              <span className="byline-read-time">{article.readTime}</span>
              <span className="byline-readers-count">{article.readersCount}</span>
            </div>
          </div>

          {/* Hero Image & Caption */}
          <figure className="editorial-hero-figure">
            <img src={article.image} alt={article.title} className="editorial-hero-image" />
            <figcaption className="editorial-hero-caption">
              {article.imageCaption}
            </figcaption>
          </figure>

          {/* Narrative Story Body */}
          <div className="editorial-story-body">
            <p className="editorial-lead-para">{article.leadParagraph}</p>

            {article.bodyParagraphs.map((para, i) => (
              <p key={i} className="editorial-para">{para}</p>
            ))}

            {/* Operational Specs KPI Card */}
            {article.statCard && (
              <div className="editorial-stat-card">
                <h4 className="stat-card-title">{article.statCard.title}</h4>
                <div className="stat-card-metrics-grid">
                  {article.statCard.stats.map((s, i) => (
                    <div key={i} className="stat-metric-cell">
                      <strong className="stat-metric-val">{s.value}</strong>
                      <span className="stat-metric-lbl">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Blockquote Callout */}
            {article.quote && (
              <blockquote className="editorial-quote-box">
                <p className="editorial-quote-p">"{article.quote.text}"</p>
                <cite className="editorial-quote-cite">{article.quote.cite}</cite>
              </blockquote>
            )}

            {/* Tags Strip */}
            <div className="editorial-tags-strip flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-slate-600">
              <span className="tags-label font-bold text-slate-900 mr-1">Related Topics:</span>
              {article.tags.map((tag, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  <span className="hover:text-blue-600 hover:underline cursor-pointer transition-colors">#{tag}</span>
                  {i < article.tags.length - 1 && (
                    <span className="text-slate-300 font-normal select-none">/</span>
                  )}
                </span>
              ))}
            </div>

            {/* Verified Sources & Fact Checking Footnote */}
            <div className="editorial-sources-box">
              <div className="sources-header">
                <FileCheck2 size={16} className="sources-icon" />
                <strong>Sources & Fact Verification</strong>
              </div>
              <p className="sources-text">{article.sourcesText}</p>
            </div>

            {/* Author Profile Bio Box */}
            <div className="editorial-author-card">
              <img src={article.authorAvatar} alt={article.authorName} className="author-card-avatar" />
              <div className="author-card-info">
                <h4 className="author-card-name">About {article.authorName}</h4>
                <p className="author-card-role">{article.authorRole}</p>
                <p className="author-card-bio">
                  Investigative tech columnist and editorial contributor specializing in cross-border enterprise engineering, compensation data, and foundation models.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Navigation & Trending Articles */}
          <div className="editorial-bottom-related-section">
            <div className="related-header">
              <h3>More Intelligence & Research</h3>
              <Link href="/tech-topics" className="link-all-articles">
                Browse All Research Articles →
              </Link>
            </div>

            <div className="related-articles-grid">
              {articlesDatabase
                .filter((a) => a.id !== article.id)
                .slice(0, 3)
                .map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/articles/${rel.id}`}
                    className="related-article-card"
                  >
                    <img src={rel.image} alt={rel.title} className="related-thumb" />
                    <div className="related-content">
                      <span className="related-kicker">{rel.categoryLabel}</span>
                      <h4 className="related-title">{rel.title}</h4>
                      <span className="related-meta">{rel.authorName} • {rel.readTime}</span>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
