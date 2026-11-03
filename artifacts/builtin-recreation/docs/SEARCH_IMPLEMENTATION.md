# Search Functionality Implementation Guide

## Overview

This guide covers implementing production-grade search for jobs, companies, and articles with filters, autocomplete, and real-time results.

## Current State

**Frontend:** ✅ Basic client-side search exists
**Backend:** ❌ No search service implemented

## Search Requirements

### Jobs Search
- Full-text search (title, description, skills)
- Filters: location, salary, type, remote, company
- Sort: relevance, date, salary
- Autocomplete suggestions
- Saved searches
- Real-time results

### Companies Search
- Full-text search (name, description, industry)
- Filters: industry, location, size, work policy
- Sort: relevance, popularity
- Autocomplete

### Articles Search
- Full-text search (title, content, author)
- Filters: category, topic, date
- Sort: relevance, date, popularity

## Technology Options

### Option 1: Elasticsearch (Most Powerful)

**Pros:**
- Industry standard
- Extremely powerful
- Advanced relevance tuning
- Aggregations and analytics
- Handles massive scale

**Cons:**
- Complex setup
- Resource intensive (2GB+ RAM)
- Expensive ($100-500/month managed)
- Overkill for small apps

**When to use:** 100K+ documents, complex queries, analytics needs

### Option 2: Typesense (Recommended for Most Cases)

**Pros:**
- Fast and lightweight
- Easy to set up
- Typo tolerance built-in
- Faceted search
- Affordable ($30-100/month)
- Great developer experience

**Cons:**
- Less mature than Elasticsearch
- Fewer advanced features

**When to use:** Most applications, especially startups

### Option 3: Meilisearch (Best for Simplicity)

**Pros:**
- Easiest to set up
- Beautiful out-of-the-box search
- Typo tolerance
- Filtering and sorting
- Free self-hosted

**Cons:**
- Less flexible than Elasticsearch
- Smaller ecosystem

**When to use:** MVP, simple search needs

### Option 4: PostgreSQL Full-Text Search (Budget Option)

**Pros:**
- No additional service needed
- Free
- Good for basic search
- Built into your database

**Cons:**
- Limited relevance tuning
- No typo tolerance
- Slower than specialized search engines
- No autocomplete out of box

**When to use:** MVP, tight budget, simple needs

## Recommended: Typesense Implementation

### 1. Setup Typesense

**Option A: Cloud (Easiest)**
```bash
# Sign up at https://cloud.typesense.org/
# Get API key and host URL
```

**Option B: Self-Hosted**
```bash
# Using Docker
docker run -d \
  -p 8108:8108 \
  -v /tmp/typesense-data:/data \
  typesense/typesense:0.25.1 \
  --data-dir /data \
  --api-key=YOUR_API_KEY
```

### 2. Install Typesense Client

```bash
npm install typesense
```

### 3. Backend Search Service

```typescript
// src/services/search.service.ts

import Typesense from 'typesense';

const client = new Typesense.Client({
  nodes: [{
    host: process.env.TYPESENSE_HOST!,
    port: 443,
    protocol: 'https',
  }],
  apiKey: process.env.TYPESENSE_API_KEY!,
  connectionTimeoutSeconds: 2,
});

// Create collections (schemas)
export async function setupSearchCollections() {
  // Jobs collection
  await client.collections().create({
    name: 'jobs',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'company', type: 'string', facet: true },
      { name: 'description', type: 'string' },
      { name: 'location', type: 'string', facet: true },
      { name: 'type', type: 'string', facet: true },
      { name: 'remote', type: 'bool', facet: true },
      { name: 'salary_min', type: 'int32', optional: true },
      { name: 'salary_max', type: 'int32', optional: true },
      { name: 'skills', type: 'string[]', facet: true },
      { name: 'posted_at', type: 'int64' },
    ],
    default_sorting_field: 'posted_at',
  });

  // Companies collection
  await client.collections().create({
    name: 'companies',
    fields: [
      { name: 'id', type: 'string' },
      { name: 'name', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'industry', type: 'string', facet: true },
      { name: 'location', type: 'string', facet: true },
      { name: 'size', type: 'string', facet: true },
      { name: 'work_policy', type: 'string', facet: true },
      { name: 'jobs_count', type: 'int32' },
    ],
    default_sorting_field: 'jobs_count',
  });
}

// Index a job
export async function indexJob(job: any) {
  await client.collections('jobs').documents().create({
    id: job.id,
    title: job.title,
    company: job.company,
    description: job.description,
    location: job.location,
    type: job.type,
    remote: job.remote || false,
    salary_min: job.salaryMin || 0,
    salary_max: job.salaryMax || 0,
    skills: job.skills || [],
    posted_at: Math.floor(new Date(job.postedAt).getTime() / 1000),
  });
}

// Search jobs
export async function searchJobs(params: {
  query: string;
  filters?: Record<string, any>;
  page?: number;
  perPage?: number;
}) {
  const { query, filters = {}, page = 1, perPage = 20 } = params;

  // Build filter string
  const filterParts: string[] = [];
  if (filters.location) filterParts.push(`location:${filters.location}`);
  if (filters.type) filterParts.push(`type:${filters.type}`);
  if (filters.remote !== undefined) filterParts.push(`remote:${filters.remote}`);
  if (filters.salaryMin) filterParts.push(`salary_max:>=${filters.salaryMin}`);
  if (filters.company) filterParts.push(`company:=${filters.company}`);

  const searchParams = {
    q: query,
    query_by: 'title,company,description,skills',
    filter_by: filterParts.join(' && '),
    sort_by: '_text_match:desc,posted_at:desc',
    page,
    per_page: perPage,
    facet_by: 'location,type,company,skills',
    max_facet_values: 10,
  };

  const results = await client.collections('jobs')
    .documents()
    .search(searchParams);

  return {
    hits: results.hits?.map((hit: any) => hit.document) || [],
    found: results.found || 0,
    facets: results.facet_counts,
    page: results.page,
  };
}

// Autocomplete suggestions
export async function getJobSuggestions(query: string) {
  if (!query || query.length < 2) return [];

  const results = await client.collections('jobs')
    .documents()
    .search({
      q: query,
      query_by: 'title,company',
      per_page: 5,
    });

  return results.hits?.map((hit: any) => ({
    title: hit.document.title,
    company: hit.document.company,
    id: hit.document.id,
  })) || [];
}
```

### 4. Backend API Endpoints

```typescript
// API routes for search
app.get('/api/search/jobs', async (req, res) => {
  const { q, location, type, remote, salaryMin, page = 1 } = req.query;

  try {
    const results = await searchJobs({
      query: q as string,
      filters: { location, type, remote: remote === 'true', salaryMin },
      page: Number(page),
    });

    res.json(results);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

app.get('/api/search/suggestions', async (req, res) => {
  const { q } = req.query;

  try {
    const suggestions = await getJobSuggestions(q as string);
    res.json({ suggestions });
  } catch (error) {
    res.status(500).json({ error: 'Failed to get suggestions' });
  }
});
```

### 5. Frontend Integration

```typescript
// src/hooks/useSearch.ts
import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

export function useJobSearch(query: string, filters: any) {
  return useQuery({
    queryKey: ['search', 'jobs', query, filters],
    queryFn: () => api.get('/search/jobs', { 
      params: { q: query, ...filters } 
    }),
    enabled: query.length >= 2,
    staleTime: 1000 * 60, // 1 minute
  });
}

export function useSearchSuggestions(query: string) {
  return useQuery({
    queryKey: ['search', 'suggestions', query],
    queryFn: () => api.get('/search/suggestions', { 
      params: { q: query } 
    }),
    enabled: query.length >= 2,
    staleTime: 1000 * 30, // 30 seconds
  });
}
```

```tsx
// Usage in component
function JobSearchBar() {
  const [query, setQuery] = useState('');
  const { data: suggestions } = useSearchSuggestions(query);

  return (
    <div className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search jobs..."
        className="w-full px-4 py-2 border rounded-lg"
      />
      
      {/* Autocomplete dropdown */}
      {suggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg mt-1">
          {suggestions.map((suggestion: any) => (
            <Link
              key={suggestion.id}
              href={`/jobs/${suggestion.id}`}
              className="block px-4 py-2 hover:bg-gray-50"
            >
              <div className="font-medium">{suggestion.title}</div>
              <div className="text-sm text-gray-600">{suggestion.company}</div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Advanced Features

### 1. Saved Searches

```typescript
// Save search
app.post('/api/search/saved', authenticate, async (req, res) => {
  const { query, filters, name } = req.body;
  const userId = req.user.id;

  const savedSearch = await db.savedSearches.create({
    data: {
      userId,
      name,
      query,
      filters,
      alertEnabled: true,
      alertFrequency: 'daily',
    },
  });

  res.json(savedSearch);
});

// Get saved searches
app.get('/api/search/saved', authenticate, async (req, res) => {
  const searches = await db.savedSearches.findMany({
    where: { userId: req.user.id },
  });

  res.json(searches);
});
```

### 2. Search History

```typescript
// Track searches
app.post('/api/search/history', authenticate, async (req, res) => {
  const { query, resultsCount } = req.body;

  await db.searchHistory.create({
    data: {
      userId: req.user.id,
      query,
      resultsCount,
      timestamp: new Date(),
    },
  });

  res.json({ success: true });
});
```

### 3. Trending Searches

```typescript
// Get trending searches (past 24 hours)
app.get('/api/search/trending', async (req, res) => {
  const trending = await db.searchHistory.groupBy({
    by: ['query'],
    where: {
      timestamp: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
    _count: { query: true },
    orderBy: { _count: { query: 'desc' } },
    take: 10,
  });

  res.json(trending);
});
```

### 4. Zero-Results Handling

```typescript
// Track zero-result searches
if (results.found === 0) {
  await db.zeroResultSearches.create({
    data: {
      query: params.query,
      filters: params.filters,
      timestamp: new Date(),
    },
  });

  // Suggest alternatives
  const alternatives = await getSimilarSearches(params.query);
  return {
    hits: [],
    found: 0,
    suggestions: alternatives,
  };
}
```

## Data Synchronization

Keep search index in sync with database:

```typescript
// When job is created/updated
app.post('/api/jobs', async (req, res) => {
  const job = await db.jobs.create({ data: req.body });

  // Index in search
  await indexJob(job);

  res.json(job);
});

// When job is deleted
app.delete('/api/jobs/:id', async (req, res) => {
  await db.jobs.delete({ where: { id: req.params.id } });

  // Remove from search index
  await client.collections('jobs').documents(req.params.id).delete();

  res.json({ success: true });
});

// Bulk re-index (run periodically)
async function reindexAllJobs() {
  const jobs = await db.jobs.findMany();
  
  for (const job of jobs) {
    await indexJob(job);
  }
}
```

## Cost Estimation

### Typesense Cloud Pricing
- **Starter:** $30/month (100K documents, 5GB RAM)
- **Growth:** $60/month (500K documents, 10GB RAM)
- **Business:** $150/month (2M documents, 20GB RAM)

### Self-Hosted
- **DO Droplet:** $12-24/month (2-4GB RAM)
- **AWS EC2:** ~$20/month (t3.small)

## Performance Optimization

1. **Caching:** Cache frequent searches (Redis)
2. **Pagination:** Limit results per page
3. **Lazy loading:** Load facets on demand
4. **Debouncing:** Delay autocomplete requests (300ms)
5. **CDN:** Cache popular searches

## Monitoring

Track these metrics:
- Average search time (<100ms ideal)
- Zero-result rate (<5%)
- Click-through rate (>40%)
- Popular searches
- Failed queries

## Next Steps

1. Choose search technology (Typesense recommended)
2. Set up search service
3. Create collections/schemas
4. Index existing data
5. Implement API endpoints
6. Connect frontend
7. Add autocomplete
8. Implement saved searches
9. Monitor and optimize

---

**Estimated implementation time:** 1-2 weeks for full search system
