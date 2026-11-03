/**
 * Dynamic Sitemap Generator
 * 
 * Run this script to generate sitemap.xml based on actual database content.
 * For production, integrate this into your build pipeline or run it daily via cron.
 * 
 * Usage:
 *   npx tsx scripts/generate-sitemap.ts
 *   or add to package.json: "generate-sitemap": "tsx scripts/generate-sitemap.ts"
 */

import { writeFileSync } from 'fs';
import { join } from 'path';

interface SitemapURL {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const SITE_URL = process.env.SITE_URL || 'https://sandbox.com';
const OUTPUT_PATH = join(process.cwd(), 'public', 'sitemap.xml');

// In production, fetch these from your database
const staticPages: SitemapURL[] = [
  { loc: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
  { loc: '/jobs', lastmod: new Date().toISOString().split('T')[0], changefreq: 'hourly', priority: 0.9 },
  { loc: '/companies', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.9 },
  { loc: '/tech-topics', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.8 },
  { loc: '/articles', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.8 },
  { loc: '/cv-builder', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/post-job', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.7 },
  { loc: '/candidate-dashboard', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.6 },
  { loc: '/employer-ats', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.6 },
  { loc: '/courses', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.6 },
];

async function fetchDynamicUrls(): Promise<SitemapURL[]> {
  const urls: SitemapURL[] = [];

  try {
    // TODO: In production, replace with actual API/database calls
    // Example:
    // const jobs = await fetch(`${API_URL}/api/jobs`).then(r => r.json());
    // jobs.forEach(job => {
    //   urls.push({
    //     loc: `/jobs/${job.id}`,
    //     lastmod: job.updatedAt,
    //     changefreq: 'weekly',
    //     priority: 0.8
    //   });
    // });

    // For now, return empty array (static sitemap is already generated)
    console.log('Note: Using static sitemap. Integrate with your database in production.');
  } catch (error) {
    console.error('Error fetching dynamic URLs:', error);
  }

  return urls;
}

function generateSitemapXML(urls: SitemapURL[]): string {
  const urlEntries = urls
    .map(
      (url) => `  <url>
    <loc>${SITE_URL}${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

async function main() {
  console.log('🗺️  Generating sitemap.xml...');

  const dynamicUrls = await fetchDynamicUrls();
  const allUrls = [...staticPages, ...dynamicUrls];

  const sitemapXML = generateSitemapXML(allUrls);
  writeFileSync(OUTPUT_PATH, sitemapXML, 'utf-8');

  console.log(`✅ Sitemap generated successfully!`);
  console.log(`   Location: ${OUTPUT_PATH}`);
  console.log(`   Total URLs: ${allUrls.length}`);
}

main().catch((error) => {
  console.error('❌ Error generating sitemap:', error);
  process.exit(1);
});
